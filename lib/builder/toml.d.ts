import { BuilderContext, PathObject } from ".";
import { RwIni } from "../data/ini";
import { RwToml } from "../data/toml";
import { Result } from "../util/result";
export type RwTomlBuilderSource<From = null, Next = null, Last = null> = PathObject<From, RwToml, RwIni, Next, Last>;
export type RwTomlBuilderTarget<To = null, Next = null, Last = null> = PathObject<RwToml, RwIni, To, Next, Last>;
export type RwTomlBuilderContext<From = null, To = null, Next = null, Last = null> = BuilderContext<RwTomlBuilderSource<From, Next, Last>, RwTomlBuilderTarget<To, Next, Last>>;
export declare function RwTomlBuilder<From = null, To = null, Next = null, Last = null>(obj: {
    context: RwTomlBuilderContext<From, To, Next, Last>;
    source: RwTomlBuilderSource<From, Next, Last>;
}, starter?: RwTomlBuilderSource<From, Next, Last>): Result<{
    context: RwTomlBuilderContext<From, To, Next, Last>;
    target: RwTomlBuilderTarget<To, Next, Last>;
}, Error>;
export declare function RwTomlPreTransform(): void;
