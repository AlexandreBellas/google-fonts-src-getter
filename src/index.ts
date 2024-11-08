// import { IGoogleFontRequest, IGoogleFontResponse } from "./@types/google-fonts"
// import { dropFontsArrayDuplicates } from "./utils/drop-fonts-array-duplicates"

/**
 * Achieve something like:
 * https://fonts.googleapis.com/css2?family=Font+1:ital,wght@0,400;0,500;1,400;1,900
 * &family=Font2:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap
 *
 * @see https://developers.google.com/fonts/docs/getting_started
 */
// export async function getGoogleFontData({
//     fonts,
//     display,
//     subset,
//     text
// }: Readonly<IGoogleFontRequest>): Promise<IGoogleFontResponse> {
//     const baseUrl = "https://fonts.googleapis.com/css2"
//     const actualFonts = Array.isArray(fonts) ? dropFontsArrayDuplicates(fonts) : [fonts]

//     try {
//         const objUrl = new URL(baseUrl)

//         actualFonts.forEach(font => {
//             const parsedFamily = font.family.split(" ").join("+")
//             const parsedStyleAndWeights = ["0", "1"].map(
//                 italValue => font.weight.map(weight => `${italValue},${weight}`)
//             ).flat().join(";")

//             const queryParamValue = `${parsedFamily}:ital,wght@${parsedStyleAndWeights}`

//             objUrl.searchParams.append("family", queryParamValue)

//         })

//         console.log(objUrl.toString())

//         return []
//     } catch (e) {
//         return []
//     }
// }