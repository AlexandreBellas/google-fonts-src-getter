import { IGoogleFontRequestItem } from "src/@types/google-fonts";

export function dropFontsArrayDuplicates(arr: IGoogleFontRequestItem[]) {
    return arr.filter(function (value, index, array) {
        return array.findIndex(v => v.family === value.family) === index;
    });
}