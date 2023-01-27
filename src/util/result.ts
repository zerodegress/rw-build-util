import { Unwrap } from ".";

export interface Result<T, E> extends Unwrap<T> {
    isOk(): boolean;
    isErr(): boolean;
    ok(callback: (value: T) => void): void;
    err(callback: (error: E) => void): void;
}

export function ok<T, E>(value: T): Result<T, E> {
    return {
        isOk() {
            return true;
        },
        isErr() {
            return false;
        },
        ok(callback: (value: T) => void) {
            callback(value);
        },
        err(_: (error: E) => void) {},
        unwrap() {
            return value;
        }
    }
}

export function err<T, E>(error: E): Result<T, E> {
    return {
        isOk() {
            return false;
        },
        isErr() {
            return true;
        },
        ok(_: (value: T) => void) {},
        err(callback: (error: E) => void) {
            callback(error);
        },
        unwrap() {
            throw error;
        }
    }
}