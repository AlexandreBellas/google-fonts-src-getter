type IGoogleFontStyle = "italic" | "bold" | "bolditalic"
type IGoogleFontDisplay = "swap"
type IGoogleFontSubset = "cyrillic" | "greek"

export type IGoogleFontRequestItem = {
    family: string
    weight?: number | number[]
    style?: IGoogleFontStyle | IGoogleFontStyle[]
}

export interface IGoogleFontRequest {
    fonts: IGoogleFontRequestItem | IGoogleFontRequestItem[]
    display?: IGoogleFontDisplay | IGoogleFontDisplay[]
    subset?: IGoogleFontSubset | IGoogleFontSubset[]
    text?: string
}

export type IGoogleFontResponse = {
    fontFamily: string
    fontWeight: number
    src: string
}[]