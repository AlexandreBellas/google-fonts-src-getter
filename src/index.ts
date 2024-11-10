import { IGoogleFontRequest, IGoogleFontResponse } from './@types/google-fonts'
import { buildGoogleFontsUrl } from './functions/build-google-fonts-url'
import { parseResponse } from './functions/parse-response'
import { parseGoogleFontRequestFonts } from './utils/parse-fonts-input'
import { parsePrimitiveInputToArr } from './utils/parse-primitive-input'

/**
 * Gets the data related to a google font in a plain JS object.
 *
 * @see https://developers.google.com/fonts/docs/getting_started
 */
export async function getGoogleFontData({
    fonts,
    display,
    subset,
    text
}: Readonly<IGoogleFontRequest>): Promise<IGoogleFontResponse> {
    const actualFonts = parseGoogleFontRequestFonts(fonts)

    if (actualFonts.length === 0) return { fonts: [], url: "" }

    const actualDisplay = display ? parsePrimitiveInputToArr(display) : undefined
    const actualSubset = subset ? parsePrimitiveInputToArr(subset) : undefined
    const actualText = text

    try {
        const url = buildGoogleFontsUrl({
            fonts: actualFonts,
            display: actualDisplay,
            subset: actualSubset,
            text: actualText
        })

        const responseObj = await fetch(url, { method: 'GET' })
        const responseRawString = await responseObj.text()

        return { fonts: parseResponse(responseRawString), url }
    } catch (_) {
        return { fonts: [], url: "" }
    }
}
