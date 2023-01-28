import { Into } from "../util";
import { none, Optional, some } from "../util/optional";
import { Path } from "../util/path";
import { err, ok, Result } from "../util/result";

export interface PathObject<From, This, To, Next = unknown, Last = unknown> {
    path: Path;
    content: This;
    from: Optional<PathObject<Last, From, This>>;
    to: Optional<PathObject<This, To, Next>>;
}


export interface BuilderContext<S, T> {
    sources: S[];
    targets: T[];
}

export interface Builder<S, T, C extends BuilderContext<S, T>> {
    (obj: {context: C, source: S}, starter?: S): Result<{context: C, target: T}, Error>;
}

export interface PathBuilder<S extends PathObject<From, S, T>, T extends PathObject<S, T, To>, C extends BuilderContext<S, T>, From = unknown, To = unknown> extends Builder<PathObject<From, S, T>, PathObject<S, T, To>, C> {}

export interface ConverterContext<T> extends BuilderContext<T, T> {}

export interface Converter<T, C extends ConverterContext<T>> extends Builder<T, T, C> {}

export function build<S, T, C extends BuilderContext<S, T>>(obj: {
    context: C,
    builder: Builder<S, T, C>
}): Result<T[], Error> {
    const {context, builder} = obj;
    for(const source of context.sources) {
        const result = builder({context, source});
        let error: Optional<Error> = none();
        result.err((err) => {
            error = some(err);
        });
        if(error.isSome()) {
            return err(error.unwrap()!);
        }
    }
    return ok(context.targets);
}

export function buildWithPreConverters<Pre, S, T, C extends ConverterContext<Pre>, BC extends BuilderContext<S, T>>(obj: {
    context: (C & Into<BC>),
    preConverters: Converter<Pre, C>[],
    builder: Builder<S, T, BC>
}): Result<T[], Error> {
    const {context, preConverters, builder} = obj;
    for(const converter of preConverters) {
        for(const source of context.sources) {
            const result = converter({context, source});
            let error: Optional<Error> = none();
            if(error.isSome()) {
                return err(error.unwrap()!);
            }
        }
        context.sources = context.targets;
        context.targets = [];
    }
    const nContext = context.into();
    return build({
        context: nContext,
        builder
    });
}