import { Optional } from "./optional";

export interface Converter<T> {
    (x: T): T;
}

export interface MapFilter<T> {
    (x: T): Optional<T>;
}