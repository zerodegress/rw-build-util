"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fromModString = exports.toModString = exports.toStringPosix = exports.normalize = void 0;
function normalize(path) {
    if (path.length > 0) {
        const pat = path[0] == '.' ? ['.'] : [];
        for (const u of path) {
            switch (u) {
                case '.':
                    break;
                case '..':
                    if (pat[-1] && pat[-1] != '.') {
                        pat.pop();
                    }
                    else {
                        pat.push('..');
                    }
                default:
                    pat.push(u);
            }
        }
        return pat;
    }
    else {
        return path;
    }
}
exports.normalize = normalize;
function toStringPosix(path) {
    if (path.length > 0) {
        let str = path[0] == '.' ? '' : '/';
        for (const u of path) {
            str += `${u}/`;
        }
        str.replace(/\/$/, '');
        return str;
    }
    else {
        return '';
    }
}
exports.toStringPosix = toStringPosix;
function toModString(path) {
    return toStringPosix(path).replace(/^\//, 'ROOT:');
}
exports.toModString = toModString;
function fromModString(str, sep = '/') {
    const pat = str.startsWith('ROOT:') ? [sep] : ['.'];
    for (const names of str.replace(/^ROOT:/, '').split(sep)) {
        pat.push(names);
    }
    return pat;
}
exports.fromModString = fromModString;
