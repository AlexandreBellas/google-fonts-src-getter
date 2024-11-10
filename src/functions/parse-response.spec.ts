import { parseResponse } from "./parse-response"

describe("parseResponse", () => {
    it('should parse response with TTF type and single entry', () => {
        const input = `
            @font-face {
                font-family: 'Cantarell';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/cantarell/v17/B50NF7ZDq37KMUvlO01Jiw.ttf) format('truetype');
            }
        `

        const output = parseResponse(input)

        expect(output).toStrictEqual([{
            fontFamily: "Cantarell",
            fontStyle: "normal",
            fontWeight: 400,
            fontDisplay: 'swap',
            src: "https://fonts.gstatic.com/s/cantarell/v17/B50NF7ZDq37KMUvlO01Jiw.ttf",
            format: "truetype",
            subset: 'latin'
        }])
    })

    it('should parse response with TTF type and multiple entry', () => {
        const input = `
            @font-face {
                font-family: 'Cantarell';
                font-style: normal;
                font-weight: 400;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/cantarell/v17/B50NF7ZDq37KMUvlO01Jiw.ttf) format('truetype');
            }
            @font-face {
                font-family: 'Droid Serif';
                font-style: italic;
                font-weight: 700;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/droidserif/v19/tDbV2oqRg1oM3QBjjcaDkOJGiSD8.ttf) format('truetype');
            }
        `

        const output = parseResponse(input)

        expect(output).toStrictEqual([{
            fontFamily: "Cantarell",
            fontStyle: "normal",
            fontWeight: 400,
            fontDisplay: 'swap',
            src: "https://fonts.gstatic.com/s/cantarell/v17/B50NF7ZDq37KMUvlO01Jiw.ttf",
            format: "truetype",
            subset: "latin"
        }, {
            fontFamily: "Droid Serif",
            fontStyle: "italic",
            fontWeight: 700,
            fontDisplay: 'swap',
            src: "https://fonts.gstatic.com/s/droidserif/v19/tDbV2oqRg1oM3QBjjcaDkOJGiSD8.ttf",
            format: "truetype",
            subset: "latin"
        }])
    })

    it('should parse response with WOFF2 type and single entry', () => {
        const input = `
            /* latin-ext */
            @font-face {
                font-family: 'Poppins';
                font-style: italic;
                font-weight: 400;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/poppins/v21/pxiGyp8kv8JHgFVrJJLufntAKPY.woff2) format('woff2');
                unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
        `

        const output = parseResponse(input)

        expect(output).toStrictEqual([{
            fontFamily: "Poppins",
            fontStyle: "italic",
            fontWeight: 400,
            fontDisplay: 'swap',
            src: "https://fonts.gstatic.com/s/poppins/v21/pxiGyp8kv8JHgFVrJJLufntAKPY.woff2",
            format: "woff2",
            subset: "latin-ext",
            unicodeRange: [
                "U+0100-02BA",
                "U+02BD-02C5",
                "U+02C7-02CC",
                "U+02CE-02D7",
                "U+02DD-02FF",
                "U+0304",
                "U+0308",
                "U+0329",
                "U+1D00-1DBF",
                "U+1E00-1E9F",
                "U+1EF2-1EFF",
                "U+2020",
                "U+20A0-20AB",
                "U+20AD-20C0",
                "U+2113",
                "U+2C60-2C7F",
                "U+A720-A7FF"
            ]
        }])
    })

    it('should parse response with WOFF2 type and multiple entry', () => {
        const input = `
            /* latin-ext */
            @font-face {
                font-family: 'Poppins';
                font-style: italic;
                font-weight: 400;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/poppins/v21/pxiGyp8kv8JHgFVrJJLufntAKPY.woff2) format('woff2');
                unicode-range: U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
            }
            /* latin */
            @font-face {
                font-family: 'Poppins';
                font-style: italic;
                font-weight: 500;
                font-display: swap;
                src: url(https://fonts.gstatic.com/s/poppins/v21/pxiDyp8kv8JHgFVrJJLmg1hVF9eO.woff2) format('woff2');
                unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
            }
        `

        const output = parseResponse(input)

        expect(output).toStrictEqual([{
            fontFamily: "Poppins",
            fontStyle: "italic",
            fontWeight: 400,
            fontDisplay: 'swap',
            src: "https://fonts.gstatic.com/s/poppins/v21/pxiGyp8kv8JHgFVrJJLufntAKPY.woff2",
            format: "woff2",
            subset: "latin-ext",
            unicodeRange: [
                "U+0100-02BA",
                "U+02BD-02C5",
                "U+02C7-02CC",
                "U+02CE-02D7",
                "U+02DD-02FF",
                "U+0304",
                "U+0308",
                "U+0329",
                "U+1D00-1DBF",
                "U+1E00-1E9F",
                "U+1EF2-1EFF",
                "U+2020",
                "U+20A0-20AB",
                "U+20AD-20C0",
                "U+2113",
                "U+2C60-2C7F",
                "U+A720-A7FF"
            ]
        }, {
            fontFamily: "Poppins",
            fontStyle: "italic",
            fontWeight: 500,
            fontDisplay: 'swap',
            src: "https://fonts.gstatic.com/s/poppins/v21/pxiDyp8kv8JHgFVrJJLmg1hVF9eO.woff2",
            format: "woff2",
            subset: "latin",
            unicodeRange: [
                "U+0000-00FF",
                "U+0131",
                "U+0152-0153",
                "U+02BB-02BC",
                "U+02C6",
                "U+02DA",
                "U+02DC",
                "U+0304",
                "U+0308",
                "U+0329",
                "U+2000-206F",
                "U+20AC",
                "U+2122",
                "U+2191",
                "U+2193",
                "U+2212",
                "U+2215",
                "U+FEFF",
                "U+FFFD"
            ]
        }])
    })
})