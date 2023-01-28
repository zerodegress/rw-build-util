export interface Unwrap<T> {
    unwrap(): T;
}

export interface Into<T> {
    into(): T;
}

export interface From<This, T> {
    from(value: T): This;
}
