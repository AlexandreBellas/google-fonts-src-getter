import { IGoogleFontResponse, IGoogleFontResponseItem } from "src/@types/google-fonts";

export function parseResponse(raw: string): IGoogleFontResponse["fonts"] {
    const lines = raw.split("\n")
    const output: IGoogleFontResponse["fonts"] = []

    const defaultOutputItem: IGoogleFontResponseItem = {
        fontFamily: "",
        fontStyle: "",
        fontWeight: 0,
        fontDisplay: undefined,
        subset: "latin",
        src: "",
        format: "truetype"
    }

    let currOutputItem: IGoogleFontResponseItem = { ...defaultOutputItem }

    for (const rawLine of lines) {
        const line = rawLine.trim()

        if (line.includes('/*') && line.includes('*/')) {
            currOutputItem = {
                ...defaultOutputItem,
                subset: line.replace("/* ", "").replace(" */", "")
            }

            continue
        }

        if (line.includes("@font-face {")) continue

        if (line.includes('font-family:')) {
            currOutputItem.fontFamily = line.replace("font-family: '", "").replace("';", "")
            continue
        }

        if (line.includes('font-style:')) {
            currOutputItem.fontStyle = line.replace("font-style: ", "").replace(";", "")
            continue
        }

        if (line.includes('font-weight:')) {
            currOutputItem.fontWeight = Number(line.replace("font-weight: ", "").replace(";", ""))
            continue
        }

        if (line.includes('font-display:')) {
            currOutputItem.fontDisplay = line.replace("font-display: ", "").replace(";", "")
            continue
        }

        if (line.includes('src:')) {
            const value = line.replace("src: ", "").replace(";", "")
            const pieces = value.match(/\(([^)]+)\)/g)

            if (pieces === null) continue

            const [url, format] = pieces.map(piece => piece.replace('(', "").replace(')', "").replaceAll("'", ""))
            currOutputItem.src = url

            if (format === "truetype") {
                currOutputItem.format = format
            } else if (format === "woff2") {
                currOutputItem = { ...currOutputItem, format: format, unicodeRange: [] }
            }

            continue
        }

        if (line.includes('unicode-range:')) {
            if (currOutputItem.format !== "woff2") continue

            currOutputItem.unicodeRange = line.replace("unicode-range: ", "").replace(";", "").split(", ")

            continue
        }

        if (line.includes("}")) {
            output.push(currOutputItem)
            currOutputItem = { ...defaultOutputItem }
        }
    }

    return output
}