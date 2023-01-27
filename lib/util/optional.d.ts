import { Unwrap } from ".";
export interface Optional<T> extends Unwrap<T | undefined> {
    some(callback: (value: T) => void): void;
    none(callback: () => void): void;
}
export declare function optional<T>(value: T | undefined): Optional<T>;
export declare function some<T>(value: T): Optional<T>;
export declare function none<T>(): Optional<T>;
