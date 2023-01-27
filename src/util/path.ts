
export interface Path extends Array<string> {
    [index: number]: string,
}

Array

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

Array

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