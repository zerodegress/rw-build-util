import { Optional } from "./optional";

export interface Transform<T> {
    (x: T): T;
}

export interface MapFilter<T> {
    (x: T): Optional<T>;
}