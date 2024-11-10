import { getGoogleFontData } from "."
import { IGoogleFontRequest, IGoogleFontResponse } from "./@types/google-fonts"
import { googleFontsBaseUrl } from "./constants/google-fonts-base-url"

describe("getGoogleFontData", () => {
    afterAll(() => {
        jest.restoreAllMocks()
    })

    it("should return the desired fonts", async () => {
        const request: IGoogleFontRequest = {
            fonts: {
                family: "Poppins",
                style: "italic",
                weight: [500, 600]
            }
        }

        const result = await getGoogleFontData(request)

        const expectedResult: IGoogleFontResponse = {
            url: googleFontsBaseUrl
                + `?family=${encodeURIComponent("Poppins:ital,wght@0,500;0,600;1,500;1,600")}`,
            fonts: [{
                fontFamily: "Poppins",
                fontStyle: "italic",
                fontWeight: 500,
                fontDisplay: undefined,
                subset: 'latin',
                format: "truetype",
                src: "https://fonts.gstatic.com/s/poppins/v21/pxiDyp8kv8JHgFVrJJLmg1hlEA.ttf"
            }, {
                fontFamily: "Poppins",
                fontStyle: "italic",
                fontWeight: 600,
                fontDisplay: undefined,
                subset: 'latin',
                format: "truetype",
                src: "https://fonts.gstatic.com/s/poppins/v21/pxiDyp8kv8JHgFVrJJLmr19lEA.ttf"
            }, {
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 500,
                fontDisplay: undefined,
                subset: 'latin',
                format: "truetype",
                src: "https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLGT9V1s.ttf"
            }, {
                fontFamily: "Poppins",
                fontStyle: "normal",
                fontWeight: 600,
                fontDisplay: undefined,
                subset: 'latin',
                format: "truetype",
                src: "https://fonts.gstatic.com/s/poppins/v21/pxiByp8kv8JHgFVrLEj6V1s.ttf"
            }]
        }
        expect(result).toStrictEqual(expectedResult)
    }, 30000)

    it("should return empty array when no fonts have been defined", async () => {
        const request: IGoogleFontRequest = { fonts: [] }

        const result = await getGoogleFontData(request)

        expect(result).toStrictEqual({ fonts: [], url: "" })
    })

    it("should return empty array when there is an error", async () => {
        global.fetch = jest.fn(() => Promise.reject(new Error("API failed."))) as jest.Mock;
        const request: IGoogleFontRequest = {
            fonts: {
                family: "Poppins",
                style: "italic",
                weight: [500, 600]
            }
        }

        const result = await getGoogleFontData(request)

        expect(result).toStrictEqual({ fonts: [], url: "" })
    })
})