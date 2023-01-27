"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RwTomlPreTransform = exports.RwTomlBuilder = void 0;
const rwtoml = __importStar(require("../data/toml"));
const result_1 = require("../util/result");
const optional_1 = require("../util/optional");
function RwTomlBuilder(obj, starter) {
    const { context, source } = obj;
    if (starter == source) {
        return (0, result_1.err)(new Error(`circle required: ${source.path}`));
    }
    else {
        const ini = {};
        rwtoml.forEach(source.content, ({ secMain, secSub, key, value }) => {
            secSub.some((secSub) => {
                if (!ini[`${secMain}_${secSub}`]) {
                    ini[`${secMain}_${secSub}`] = {};
                }
                ini[`${secMain}_${secSub}`][key] = value.toString();
            });
            secSub.none(() => {
                if (!ini[secMain]) {
                    ini[secMain] = {};
                }
                ini[secMain][key] = value.toString();
            });
        });
        const target = {
            path: source.path,
            content: ini,
            from: (0, optional_1.some)(source),
            to: (0, optional_1.none)()
        };
        source.to = (0, optional_1.some)(target);
        return (0, result_1.ok)({ context, target });
    }
}
exports.RwTomlBuilder = RwTomlBuilder;
function RwTomlPreTransform() {
}
exports.RwTomlPreTransform = RwTomlPreTransform;
