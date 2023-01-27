import { Optional } from "../util/optional";
import { Path } from "../util/path";
import { Result } from "../util/result";

export interface PathObject<From, This, To, Next = unknown, Last = unknown> {
    path: Path;
    content: This;
    from: Optional<PathObject<Last, From, This>>;
    to: Optional<PathObject<This, To, Next>>;
}


export interface BuilderContext<S, T> {
    sources: Array<S>;
    targets: Array<T>;
}

export interface Builder<S, T> {
    (obj: {context: BuilderContext<S, T>, source: S}, starter?: S): Result<{context: BuilderContext<S, T>, target: T}, Error>;
}

export interface PathBuilder<S, T, From = unknown, To = unknown> extends Builder<PathObject<From, S, T>, PathObject<S, T, To>> {}