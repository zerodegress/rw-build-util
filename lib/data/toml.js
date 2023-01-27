"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromString = exports.implRwToml = exports.implSectionGroup = exports.implSection = exports.isVector = exports.isScalar = exports.isValue = exports.mapFilter = exports.forEach = void 0;
const optional_1 = require("../util/optional");
const toml_1 = __importDefault(require("toml"));
const result_1 = require("../util/result");
function forEach(toml, callback) {
    for (const secMain in toml) {
        const secMainObj = toml[secMain];
        if (implSection(secMainObj)) {
            for (const key in secMainObj) {
                callback({ secMain, secSub: (0, optional_1.none)(), key, value: secMainObj[key] });
            }
        }
        else {
            for (const secSub in secMainObj) {
                const secSubObj = secMainObj[secSub];
                for (const key in secSubObj) {
                    callback({ secMain, secSub: (0, optional_1.some)(secSub), key, value: secSubObj[key] });
                }
            }
        }
    }
}
exports.forEach = forEach;
function mapFilter(toml, callback) {
    let result = {};
    for (const secMain in toml) {
        const secMainObj = toml[secMain];
        if (implSection(secMainObj)) {
            const section = {};
            for (const key in secMainObj) {
                callback({ secMain, secSub: (0, optional_1.none)(), key, value: secMainObj[key] }).some(({ key, value }) => {
                    section[key] = value;
                });
            }
            result[secMain] = section;
        }
        else {
            const sectionGroup = {};
            for (const secSub in secMainObj) {
                const section = {};
                const secSubObj = secMainObj[secSub];
                for (const key in secSubObj) {
                    callback({ secMain, secSub: (0, optional_1.some)(secSub), key, value: secSubObj[key] }).some(({ key, value }) => {
                        section[key] = value;
                    });
                }
                if (Object.keys(section).length > 0) {
                    sectionGroup[secSub] = section;
                }
            }
            if (Object.keys(sectionGroup).length > 0) {
                result[secMain] = sectionGroup;
            }
        }
    }
    return result;
}
exports.mapFilter = mapFilter;
function isValue(x) {
    return isScalar(x) || isVector(x);
}
exports.isValue = isValue;
function isScalar(x) {
    return typeof x == 'number' || typeof x == 'boolean' || typeof x == 'string';
}
exports.isScalar = isScalar;
function isVector(x) {
    if (Array.isArray(x)) {
        let type = (0, optional_1.none)();
        for (const ele of x) {
            if (type.isNone()) {
                switch (typeof ele) {
                    case 'number':
                        type = (0, optional_1.some)('number');
                        break;
                    case 'string':
                        type = (0, optional_1.some)('string');
                        break;
                    case 'boolean':
                        type = (0, optional_1.some)('boolean');
                        break;
                    default:
                        return false;
                }
            }
            if (type.isSome()) {
                const type1 = type.unwrap();
                if (type1 != typeof ele) {
                    return false;
                }
            }
        }
        return true;
    }
    else {
        return false;
    }
}
exports.isVector = isVector;
function implSection(x) {
    if (typeof x == 'object' && !Array.isArray(x)) {
        const obj = x;
        for (const v of Object.values(obj)) {
            if (isScalar(v) || isVector(v)) {
            }
            else {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}
exports.implSection = implSection;
function implSectionGroup(x) {
    if (typeof x == 'object' && !Array.isArray(x)) {
        const obj = x;
        for (const v of Object.values(obj)) {
            if (implSection(v)) {
            }
            else {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}
exports.implSectionGroup = implSectionGroup;
function implRwToml(x) {
    if (typeof x == 'object' && !Array.isArray(x)) {
        const obj = x;
        for (const v of Object.values(obj)) {
            if (implSection(v) || implSectionGroup(v)) {
            }
            else {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}
exports.implRwToml = implRwToml;
function fromString(str) {
    const tom = toml_1.default.parse(str);
    return implRwToml(tom) ? (0, result_1.ok)(tom) : (0, result_1.err)(new Error('not a RwToml'));
}
exports.fromString = fromString;
