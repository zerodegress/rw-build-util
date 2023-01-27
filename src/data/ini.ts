export type Value = string;
export function isValue(x: any): x is Value {
    return typeof x == 'string';
}
export interface Section {
    [key: string]: Value
}
export function implSection(x: any): x is Section {
    if(typeof x == 'object') {
        const sec = x as object;
        for(const v of Object.values(sec)) {
            if(!isValue(v)) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}
export interface RwIni {
    [key: string]: Section
}
export function implRwIni(x: any): x is RwIni {
    if(typeof x == 'object') {
        const ini = x as object;
        for(const sec of Object.values(ini)) {
            if(!implSection(sec)) {
                return false;
            }
        }
        return true;
    } else {
        return false;
    }
}

export function toString(ini: RwIni): string {
    let str = '';
    for(const sec in ini) {
        str += `[${sec}]\n`;
        for(const key in ini[sec]) {
            str += `${key}:${ini[sec][key].includes('\n') ? `"""${ini[sec][key]}"""` : ini[sec][key]}\n`;
        }
    }
    return str;
}