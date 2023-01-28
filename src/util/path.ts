
export interface Path extends Array<string> {
    [index: number]: string,
}

export function normalize(path: Path): Path {
    if(path.length > 0) {
        const pat: Path = path[0] == '.' ? ['.'] : [];
        for(const u of path) {
            switch(u) {
                case '.':
                    break;
                case '..':
                    if(pat[-1] && pat[-1] != '.') {
                        pat.pop();
                    } else {
                        pat.push('..');
                    }
                default:
                    pat.push(u);
            }
        }
        return pat;
    } else {
        return path;
    }
}

export function toStringPosix(path: Path): string {
    if(path.length > 0) {
        let str = path[0] == '.' ? '' : '/';
        for(const u of path) {
            str += `${u}/`;
        }
        str.replace(/\/$/, '');
        return str;
    } else {
        return '';
    }
}

export function toModString(path: Path): string {
    return toStringPosix(path).replace(/^\//, 'ROOT:');
}

export function fromModString(str: string): Path {
    const pat: Path = str.startsWith('ROOT:') ? ['/'] : ['.'];
    for(const names of str.replace(/^ROOT:/, '').split('/')) {
        pat.push(names);
    }
    return pat;
}