export interface Path extends Array<string> {
    [index: number]: string;
}
export declare function normalize(path: Path): Path;
export declare function toStringPosix(path: Path): string;
