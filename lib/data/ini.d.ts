export type Value = string;
export declare function isValue(x: any): x is Value;
export interface Section {
    [key: string]: Value;
}
export declare function implSection(x: any): x is Section;
export interface RwIni {
    [key: string]: Section;
}
export declare function implRwIni(x: any): x is RwIni;
export declare function toString(ini: RwIni, nextline?: string): string;
