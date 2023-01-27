"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toStringPosix = exports.normalize = void 0;
Array;
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
Array;
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
