export type IGoogleFontStyle = "italic" | "bold"
export type IGoogleFontDisplay = "swap"
export type IGoogleFontSubset = "cyrillic" | "greek"

export type IGoogleFontRequestFontItem = {
    family: string
    weight?: number | number[]
    style?: IGoogleFontStyle | IGoogleFontStyle[]
}

export interface IGoogleFontRequest {
    fonts: IGoogleFontRequestFontItem | IGoogleFontRequestFontItem[]
    display?: IGoogleFontDisplay | IGoogleFontDisplay[]
    subset?: IGoogleFontSubset | IGoogleFontSubset[]
    text?: string
}

type IGoogleFontBaseResponse = {
    fontFamily: string
    fontWeight: number
    fontStyle: string
    fontDisplay?: string
    subset: string
    src: string
}

type IGoogleFontResponseFormat = ({ format: "truetype" } | { format: "woff2"; unicodeRange: string[] })
export type IGoogleFontResponseItem = (IGoogleFontBaseResponse & IGoogleFontResponseFormat)
export type IGoogleFontResponse = {
    fonts: IGoogleFontResponseItem[]
    url: string
}