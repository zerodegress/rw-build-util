"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.buildWithPreConverters = exports.build = void 0;
const optional_1 = require("../util/optional");
const result_1 = require("../util/result");
function build(obj) {
    const { context, builder } = obj;
    for (const source of context.sources) {
        const result = builder({ context, source });
        let error = (0, optional_1.none)();
        result.err((err) => {
            error = (0, optional_1.some)(err);
        });
        if (error.isSome()) {
            return (0, result_1.err)(error.unwrap());
        }
    }
    return (0, result_1.ok)(context.targets);
}
exports.build = build;
function buildWithPreConverters(obj) {
    const { context, preConverters, builder } = obj;
    for (const converter of preConverters) {
        for (const source of context.sources) {
            const result = converter({ context, source });
            let error = (0, optional_1.none)();
            if (error.isSome()) {
                return (0, result_1.err)(error.unwrap());
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
exports.buildWithPreConverters = buildWithPreConverters;
