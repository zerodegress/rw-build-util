import { BuilderContext, PathBuilder, PathObject, buildWithPreConverters, Builder, ConverterContext, Converter } from "."
import { RwIni } from "../data/ini"
import { RwToml, Section as TomlSection } from "../data/toml"
import * as rwtoml from "../data/toml";
import { Into } from "../util";
import { err, ok, Result } from "../util/result";
import { none, some } from "../util/optional";
import { Path } from "../util/path";


export type RwTomlBuilderSource = PathObject<null, RwToml, RwIni>;
export type RwTomlBuilderTarget = PathObject<RwToml, RwIni, null>;
export type RwTomlBuilderContext = BuilderContext<RwTomlBuilderSource, RwTomlBuilderTarget>;
export type RwTomlBuilder = Builder<RwTomlBuilderSource, RwTomlBuilderTarget, RwTomlBuilderContext>;

export function rwTomlBuilder(obj: {
    context: RwTomlBuilderContext,
    source: RwTomlBuilderSource,
}, starter?: RwTomlBuilderSource): Result<{
    context: RwTomlBuilderContext,
    target: RwTomlBuilderTarget
}, Error> {
    const {context, source} = obj;
    if(source.to.isSome()) {
        return ok({context, target: source.to.unwrap()!});
    }
    if(starter == source) {
        return err(new Error(`circle required: ${source.path}`));
    } else {
        const ini: RwIni = {};
        rwtoml.forEach(source.content, ({secMain, secSub, key, value}) => {
            secSub.some((secSub) => {
                if(!ini[`${secMain}_${secSub}`]) {
                    ini[`${secMain}_${secSub}`] = {};
                }
                ini[`${secMain}_${secSub}`][key] = value.toString();
            });
            secSub.none(() => {
                if(!ini[secMain]) {
                    ini[secMain] = {};
                }
                ini[secMain][key] = value.toString();
            });
        });
        const target: RwTomlBuilderTarget = {
            path: source.path.slice(),
            content: ini,
            from: some(source),
            to: none()
        };
        source.to = some(target);
        context.targets.push(target);
        return ok({context, target});
    }
}

export type RwTomlObject = PathObject<RwToml, RwToml, RwToml, RwToml, RwToml>;
export interface RwTomlConverterContext extends ConverterContext<RwTomlObject>, Into<RwTomlBuilderContext> {}

export function presetRwTomlConverter(obj: {
    context: RwTomlConverterContext,
    source: RwTomlObject
}, starter?: RwTomlObject): Result<{
    context: RwTomlConverterContext,
    target: RwTomlObject
}, Error> {
    const {context, source} = obj;
    if(source.to.isSome()) {
        return ok({context, target: source.to.unwrap()!});
    }
    if(starter == source) {
        return err(new Error(`circle required: ${source.path}`));
    } else {
        const toml: RwToml = {};
        rwtoml.forEach(source.content, ({secMain, secSub, key, value}) => {
            if(!toml[secMain]) {
                toml[secMain] = {};
            }
            secSub.some((secSub) => {
                if(!toml[secMain][secSub]) {
                    toml[secMain][secSub] = {};
                }
                const sec = toml[secMain][secSub] as TomlSection;
                if(rwtoml.isScalar(value)) {
                    sec[key] = value;
                } else {
                    sec[key] = value.join(',');
                }
            });
            secSub.none(() => {
                const sec = toml[secMain] as TomlSection;
                if(rwtoml.isScalar(value)) {
                    sec[key] = value;
                } else {
                    sec[key] = value.join(',');
                }
            });
        });
        const target: RwTomlObject = {
            path: source.path.slice(),
            content: toml,
            from: some(source),
            to: none()
        };
        source.to = some(target);
        context.targets.push(target);
        return ok({context, target});
    }
}

export function build(obj: {
    context: RwTomlConverterContext,
    customPreConverters?: Converter<RwTomlObject, RwTomlConverterContext>[]
}): Result<RwTomlBuilderTarget[], Error> {
    const {context, customPreConverters} = obj;
    if(customPreConverters) {
        customPreConverters.push(presetRwTomlConverter);
    }
    return buildWithPreConverters({
        context,
        preConverters: customPreConverters ? customPreConverters : [presetRwTomlConverter],
        builder: rwTomlBuilder
    });
}

export function buildWithoutPreset(obj: {
    context: RwTomlConverterContext,
    customPreConverters?: Converter<RwTomlObject, RwTomlConverterContext>[]
}): Result<RwTomlBuilderTarget[], Error> {
    const {context, customPreConverters} = obj;
    return buildWithPreConverters({
        context,
        preConverters: customPreConverters ? customPreConverters : [],
        builder: rwTomlBuilder
    });
}

export function context(sources: [RwToml, Path][]): RwTomlConverterContext {
    return {
        sources: sources.map(([toml, path]) => {
            return {
                path,
                content: toml,
                from: none(),
                to: none()
            };
        }),
        targets: [],
        into(this: RwTomlConverterContext) {
            return {
                sources: this.sources.map(({
                    path,
                    content,
                }) => {
                    return {
                        path,
                        content,
                        from: none(),
                        to: none(),
                    };
                }),
                targets: [],
            };
        },
    };
}