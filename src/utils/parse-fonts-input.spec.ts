import { IGoogleFontRequestFontItem } from "src/@types/google-fonts"
import { dropFontsArrayDuplicates, parseGoogleFontRequestFonts } from "./parse-fonts-input"

describe("dropFontsArrayDuplicates", () => {
    it("should drop fonts array duplicates when there are duplicates", () => {
        const family = "test"
        const fonts: IGoogleFontRequestFontItem[] = [{ family }, { family }, { family: "other" }]

        const output = dropFontsArrayDuplicates(fonts)

        expect(output).toStrictEqual([{ family }, { family: "other" }])
    })

    it("should return same array when there are no duplicates", () => {
        const family = "test"
        const fonts: IGoogleFontRequestFontItem[] = [{ family }, { family: "other" }]

        const output = dropFontsArrayDuplicates(fonts)

        expect(output).toStrictEqual([{ family }, { family: "other" }])
    })
})

describe("parseGoogleFontRequestFonts", () => {
    it("should parse correctly when it's array and has duplicates", () => {
        const family = "test"
        const fonts: IGoogleFontRequestFontItem[] = [{ family }, { family }, { family: "other" }]

        const output = parseGoogleFontRequestFonts(fonts)

        expect(output).toStrictEqual([{ family }, { family: "other" }])
    })

    it("should parse correctly when it's array and has no duplicates", () => {
        const family = "test"
        const fonts: IGoogleFontRequestFontItem[] = [{ family }, { family: "other" }]

        const output = parseGoogleFontRequestFonts(fonts)

        expect(output).toStrictEqual([{ family }, { family: "other" }])
    })

    it("should parse correctly when it's object", () => {
        const fonts: IGoogleFontRequestFontItem = { family: "test" }

        const output = parseGoogleFontRequestFonts(fonts)

        expect(output).toStrictEqual([{ family: "test" }])
    })
})