import { BuilderContext, PathObject, Into, Builder, ConverterContext, Converter } from ".";
import { RwIni } from "../data/ini";
import { RwToml } from "../data/toml";
import { Result } from "../util/result";
export type RwTomlBuilderSource = PathObject<null, RwToml, RwIni>;
export type RwTomlBuilderTarget = PathObject<RwToml, RwIni, null>;
export type RwTomlBuilderContext = BuilderContext<RwTomlBuilderSource, RwTomlBuilderTarget>;
export type RwTomlBuilder = Builder<RwTomlBuilderSource, RwTomlBuilderTarget, RwTomlBuilderContext>;
export declare function rwTomlBuilder(obj: {
    context: RwTomlBuilderContext;
    source: RwTomlBuilderSource;
}, starter?: RwTomlBuilderSource): Result<{
    context: RwTomlBuilderContext;
    target: RwTomlBuilderTarget;
}, Error>;
export type RwTomlObject = PathObject<RwToml, RwToml, RwToml, RwToml, RwToml>;
export interface RwTomlConverterContext extends ConverterContext<RwTomlObject>, Into<RwTomlBuilderContext> {
}
export declare function presetRwTomlConverter(obj: {
    context: RwTomlConverterContext;
    source: RwTomlObject;
}, starter?: RwTomlObject): Result<{
    context: RwTomlConverterContext;
    target: RwTomlObject;
}, Error>;
export declare function build(obj: {
    context: RwTomlConverterContext;
    customPreConverters?: Converter<RwTomlObject, RwTomlConverterContext>[];
}): Result<RwTomlBuilderTarget[], Error>;
