import { IGoogleFontDisplay, IGoogleFontRequestFontItem, IGoogleFontSubset } from "src/@types/google-fonts"
import { googleFontsBaseUrl } from "../constants/google-fonts-base-url"
import { combineStringArrays } from "../utils/combine-string-arrays"
import { parsePrimitiveInputToArr } from "../utils/parse-primitive-input"

interface IBuildGoogleFontsUrlProps {
    fonts: IGoogleFontRequestFontItem[]
    display?: IGoogleFontDisplay[]
    subset?: IGoogleFontSubset[]
    text?: string
}

/**
 * Builds a URL with the following format:
 * https://fonts.googleapis.com/css2?family=Font+1:ital,wght@0,400;0,500;1,400;1,900
 * &family=Font2:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap
 */
export function buildGoogleFontsUrl({
    fonts,
    display = [],
    subset = [],
    text = "",
}: Readonly<IBuildGoogleFontsUrlProps>) {
    const objUrl = new URL(googleFontsBaseUrl)

    fonts.forEach(font => {
        const parsedFamily = font.family.split(" ").join("+")
        const actualStyle = font.style ? parsePrimitiveInputToArr(font.style) : []
        const actualWeight = font.weight ? parsePrimitiveInputToArr(font.weight) : []

        // If bold defined, add 700 to actualWeight
        const boldStyleIdx = actualStyle.findIndex(s => s === "bold")
        if (boldStyleIdx !== -1 && !actualWeight.includes(700)) {
            actualWeight.push(700)
            actualStyle.splice(boldStyleIdx, 1)
        }

        // Guarantee actualWeight with at least the default one
        if (actualWeight.length === 0) {
            actualWeight.push(400)
        }

        // Build combination of italic definition and weight
        const italicValues = actualStyle.includes("italic") ? ["0", "1"] : ["0"]
        const italicWeightCombinationParam = combineStringArrays(italicValues, actualWeight, ",").join(";")

        objUrl.searchParams.append("family", `${parsedFamily}:ital,wght@${italicWeightCombinationParam}`)
    })

    if (display.length > 0) {
        objUrl.searchParams.append("display", display.join(','))
    }

    if (subset.length > 0) {
        objUrl.searchParams.append("subset", subset.join(','))
    }

    if (text && text.length > 0) {
        objUrl.searchParams.append("text", text)
    }

    return objUrl.toString()
} 