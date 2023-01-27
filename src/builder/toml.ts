import { BuilderContext, PathBuilder, PathObject } from "."
import { RwIni } from "../data/ini"
import { RwToml } from "../data/toml"
import * as rwtoml from "../data/toml";
import { err, ok, Result } from "../util/result";
import { none, some } from "../util/optional";


export type RwTomlBuilderSource<From = null, Next = null, Last = null> = PathObject<From, RwToml, RwIni, Next, Last>;
export type RwTomlBuilderTarget<To = null, Next = null, Last = null> = PathObject<RwToml, RwIni, To, Next, Last>;
export type RwTomlBuilderContext<From = null, To = null, Next = null, Last = null> = BuilderContext<RwTomlBuilderSource<From, Next, Last>, RwTomlBuilderTarget<To, Next, Last>>;

export function RwTomlBuilder<From = null, To = null, Next = null, Last = null>(obj: {
    context: RwTomlBuilderContext<From, To, Next, Last>,
    source: RwTomlBuilderSource<From, Next, Last>,
}, starter?: RwTomlBuilderSource<From, Next, Last>): Result<{
    context: RwTomlBuilderContext<From, To, Next, Last>,
    target: RwTomlBuilderTarget<To, Next, Last>
}, Error> {
    const {context, source} = obj;
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
            path: source.path,
            content: ini,
            from: some(source),
            to: none()
        };
        source.to = some(target);
        return ok({context, target});
    }
}

export function RwTomlPreTransform() {
    
}