import { Unwrap } from ".";

export interface Optional<T> extends Unwrap<T | undefined> {
    some(callback: (value: T) => void): void;
    none(callback: () => void): void;
}

export function optional<T>(value: T | undefined): Optional<T> {
    return {
        some(callback: (value: T) => void) {
            if(value) {
                callback(value);
            }
        },
        none(callback: () => void) {
            if(!value) {
                callback();
            }
        },
        unwrap() {
            return value;
        },
    }
}

export function some<T>(value: T): Optional<T> {
    return {
        some(callback: (value: T) => void) {
            callback(value);
        },
        none(_: () => void) {},
        unwrap() {
            return value;
        },
    }
}

export function none<T>(): Optional<T> {
    return {
        some(_: (value: T) => void) {},
        none(callback: () => void) {
            callback();
        },
        unwrap() {
            return undefined;
        },
    }
}