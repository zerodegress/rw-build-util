"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toString = exports.implRwIni = exports.implSection = exports.isValue = void 0;
function isValue(x) {
    return typeof x == 'string';
}
exports.isValue = isValue;
function implSection(x) {
    if (typeof x == 'object') {
        const sec = x;
        for (const v of Object.values(sec)) {
            if (!isValue(v)) {
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
function implRwIni(x) {
    if (typeof x == 'object') {
        const ini = x;
        for (const sec of Object.values(ini)) {
            if (!implSection(sec)) {
                return false;
            }
        }
        return true;
    }
    else {
        return false;
    }
}
exports.implRwIni = implRwIni;
function toString(ini) {
    let str = '';
    for (const sec in ini) {
        str += `[${sec}]\n`;
        for (const key in ini[sec]) {
            str += `${key}:${ini[sec][key].includes('\n') ? `"""${ini[sec][key]}"""` : ini[sec][key]}`;
        }
    }
    return str;
}
exports.toString = toString;
