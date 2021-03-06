"use strict";
/**
 * Created by user on 2018/5/7/007.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fill_range_1 = __importDefault(require("fill-range"));
const table_1 = __importDefault(require("./table"));
exports.TABLE_RANGE = table_1.default;
const array_hyper_unique_1 = require("array-hyper-unique");
function matchRange(from, to, options = {}) {
    options = getOptions(options);
    let s = from;
    let e = to;
    let ret = [];
    let findFirstOne = !!options.findFirstOne;
    Object
        .keys(options.dataTables)
        // @ts-ignore
        .some(function (key) {
        let bool;
        options.dataTables[key].some(function (arr) {
            let i = arr.indexOf(s);
            let j = arr.indexOf(e, i);
            if (i !== -1 && j !== -1) {
                ret.push(...arr.slice(i, j + 1));
                bool = true;
                return findFirstOne;
            }
        });
        if (bool) {
            return true;
        }
    });
    if (!ret || !ret.length) {
        return null;
    }
    array_hyper_unique_1.array_unique_overwrite(ret);
    if (options.createRegExpString) {
        return toRegExpString(ret, options.createRegExpClass);
    }
    return ret;
}
exports.matchRange = matchRange;
function toRegExpString(arr, warpClass) {
    if (arr.length == 1) {
        return arr[0];
    }
    let s = arr.join('');
    return warpClass ? '[' + s + ']' : s;
}
exports.toRegExpString = toRegExpString;
function fillRange(from, to, options = {}) {
    options = getOptions(options);
    let s = from;
    let e = to;
    let ret = null;
    ret = matchRange(from, to, options);
    if (!ret && (options.arrayMode || String(s).length == 1 && String(e).length == 1)) {
        let _ok;
        if (typeof s == 'string' && typeof e == 'string') {
            let a = s.charCodeAt(0);
            let b = e.charCodeAt(0);
            _ok = a <= b;
        }
        else {
            _ok = true;
        }
        if (_ok) {
            ret = fill_range_1.default(s, e);
        }
        if (!ret || !ret.length) {
            ret = null;
        }
    }
    if (Array.isArray(ret)) {
        ret = ret.map(v => String(v));
    }
    return ret;
}
exports.fillRange = fillRange;
function getOptions(options) {
    let opts = Object.assign({}, options);
    opts.dataTables = opts.dataTables || table_1.default;
    return opts;
}
exports.getOptions = getOptions;
exports.default = matchRange;
//# sourceMappingURL=core.js.map