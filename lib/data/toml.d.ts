import { Optional } from "../util/optional";
import { Result } from "../util/result";
export declare function forEach(toml: RwToml, callback: (obj: {
    secMain: string;
    secSub: Optional<string>;
    key: string;
    value: Value;
}) => void): void;
export declare function mapFilter(toml: RwToml, callback: (obj: {
    secMain: string;
    secSub: Optional<string>;
    key: string;
    value: Value;
}) => Optional<{
    key: string;
    value: Value;
}>): RwToml;
export type Value = Scalar | Vector;
export declare function isValue(x: any): x is Scalar;
export type Scalar = number | boolean | string;
export declare function isScalar(x: any): x is Scalar;
export type Vector = number[] | boolean[] | string[];
export declare function isVector(x: any): x is Vector;
export interface Section {
    [key: string]: Scalar | Vector;
}
export declare function implSection(x: any): x is Section;
export interface SectionGroup {
    [key: string]: Section;
}
export declare function implSectionGroup(x: any): x is SectionGroup;
export interface RwToml {
    [key: string]: Section | SectionGroup;
}
export declare function implRwToml(x: any): x is RwToml;
export declare function fromString(str: string): Result<RwToml, Error>;
