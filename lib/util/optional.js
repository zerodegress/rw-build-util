"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.none = exports.some = exports.optional = void 0;
function optional(value) {
    return {
        isSome() {
            return value != undefined;
        },
        isNone() {
            return value == undefined;
        },
        some(callback) {
            if (value) {
                callback(value);
            }
        },
        none(callback) {
            if (!value) {
                callback();
            }
        },
        unwrap() {
            return value;
        },
    };
}
exports.optional = optional;
function some(value) {
    return {
        isSome() {
            return true;
        },
        isNone() {
            return false;
        },
        some(callback) {
            callback(value);
        },
        none(_) { },
        unwrap() {
            return value;
        },
    };
}
exports.some = some;
function none() {
    return {
        isSome() {
            return false;
        },
        isNone() {
            return true;
        },
        some(_) { },
        none(callback) {
            callback();
        },
        unwrap() {
            return undefined;
        },
    };
}
exports.none = none;
