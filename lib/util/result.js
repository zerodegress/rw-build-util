"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.err = exports.ok = void 0;
function ok(value) {
    return {
        isOk() {
            return true;
        },
        isErr() {
            return false;
        },
        ok(callback) {
            callback(value);
        },
        err(_) { },
        unwrap() {
            return value;
        }
    };
}
exports.ok = ok;
function err(error) {
    return {
        isOk() {
            return false;
        },
        isErr() {
            return true;
        },
        ok(_) { },
        err(callback) {
            callback(error);
        },
        unwrap() {
            throw error;
        }
    };
}
exports.err = err;
