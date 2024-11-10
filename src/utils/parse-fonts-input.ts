import { IGoogleFontRequest, IGoogleFontRequestFontItem } from "src/@types/google-fonts";

export function dropFontsArrayDuplicates(arr: IGoogleFontRequestFontItem[]) {
    return arr.filter(function (value, index, array) {
        return array.findIndex(v => v.family === value.family) === index;
    });
}

export const parseGoogleFontRequestFonts = (
    request: IGoogleFontRequest["fonts"]
): IGoogleFontRequestFontItem[] => Array.isArray(request) ? dropFontsArrayDuplicates(request) : [request]