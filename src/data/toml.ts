import { none, Optional, some } from "../util/optional";
import toml from "toml";
import { err, ok, Result } from "../util/result";

export function forEach(toml: RwToml, callback: (obj: {secMain: string, secSub: Optional<string>, key: string, value: Value}) => void) {
    for(const secMain in toml) {
        const secMainObj = toml[secMain];
        if(implSection(secMainObj)) {
            for(const key in secMainObj) {
                callback({secMain, secSub: none(), key, value: secMainObj[key]});
            }
        } else {
            for(const secSub in secMainObj) {
                const secSubObj = secMainObj[secSub];
                for(const key in secSubObj) {
                    callback({secMain, secSub: some(secSub), key, value: secSubObj[key]});
                }
            }
        }
    }
}
export function mapFilter(toml: RwToml, callback: (obj: {secMain: string, secSub: Optional<string>, key: string, value: Value}) => Optional<{key: string, value: Value}>): RwToml {
    let result: RwToml = {};
    for(const secMain in toml) {
        const secMainObj = toml[secMain];
        if(implSection(secMainObj)) {
            const section: Section = {};
            for(const key in secMainObj) {
                callback({secMain, secSub: none(), key, value: secMainObj[key]}).some(({key, value}) => {
                    section[key] = value;
                });
            }
            result[secMain] = section;
        } else {
            const sectionGroup: SectionGroup = {};
            for(const secSub in secMainObj) {
                const section: Section = {};
                const secSubObj = secMainObj[secSub];
                for(const key in secSubObj) {
                    callback({secMain, secSub: some(secSub), key, value: secSubObj[key]}).some(({key, value}) => {
                        section[key] = value;
                    });
                }
                if(Object.keys(section).length > 0) {
                    sectionGroup[secSub] = section;
                }
            }
            if(Object.keys(sectionGroup).length > 0) {
                result[secMain] = sectionGroup;
            }
        }
    }
    return result;
}
export type Value = Scalar | Vector;
export function isValue(x: any): x is Scalar {
    return isScalar(x) || isVector(x);
}
export type Scalar = number | boolean | string;
export function isScalar(x: any): x is Scalar {
    return typeof x == 'number' || typeof x == 'boolean' || typeof x == 'string';
}
export type Vector = number[] | boolean[] | string[];
export function isVector(x: any): x is Vector {
    if(Array.isArray(x)) {
        let type: string | undefined = undefined;
        for(const ele of x) {
            if(!type) {
                if(typeof ele == 'number' || typeof ele == 'boolean' || typeof ele == 'string') {
                    type = typeof ele;
                } else {
                    return false;
                }
            } else {
                if(typeof type != type) {
                    return false;
                }
            }
        }
        return true;
    } else {
        return false;
    }
}
export interface Section {
    [key: string]: Scalar | Vector;
}
export function implSection(x: any): x is Section {
    if(typeof x == 'object') {
        const obj = x as object;
        for(const v of Object.values(obj)) {
            if(isScalar(v) || isVector(v)) {
            } else {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}
export interface SectionGroup {
    [key: string]: Section;
}
export function implSectionGroup(x: any): x is SectionGroup {
    if(typeof x == 'object') {
        const obj = x as object;
        for(const v of Object.values(obj)) {
            if(implSection(v)) {
            } else {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}
export interface RwToml {
    [key: string]: Section | SectionGroup;
}
export function implRwToml(x: any): x is RwToml {
    if(typeof x == 'object') {
        const obj = x as object;
        for(const v of Object.values(obj)) {
            if(implSection(v) || implSectionGroup(v)) {
            } else {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}

export function fromString(str: string): Result<RwToml, Error> {
    const tom = toml.parse(str);
    return implRwToml(tom) ? ok(tom) : err(new Error('not a RwToml'));
}