import { Unwrap } from ".";
export interface Result<T, E> extends Unwrap<T> {
    isOk(): boolean;
    isErr(): boolean;
    ok(callback: (value: T) => void): void;
    err(callback: (error: E) => void): void;
}
export declare function ok<T, E>(value: T): Result<T, E>;
export declare function err<T, E>(error: E): Result<T, E>;
