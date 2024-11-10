import { combineStringArrays } from "./combine-string-arrays"

describe("combineStringArrays", () => {
    it("should combine number arrays without join", () => {
        const arr1 = [1, 2]
        const arr2 = [3, 4]

        const output = combineStringArrays(arr1, arr2)

        expect(output).toStrictEqual(["13", "14", "23", "24"])
    })

    it("should combine number arrays with join", () => {
        const arr1 = [1, 2]
        const arr2 = [3, 4]

        const output = combineStringArrays(arr1, arr2, ",")

        expect(output).toStrictEqual(["1,3", "1,4", "2,3", "2,4"])
    })

    it("should combine string arrays without join", () => {
        const arr1 = ["a", "b"]
        const arr2 = ["c", "d"]

        const output = combineStringArrays(arr1, arr2)

        expect(output).toStrictEqual(["ac", "ad", "bc", "bd"])
    })

    it("should combine string arrays with join", () => {
        const arr1 = ["a", "b"]
        const arr2 = ["c", "d"]

        const output = combineStringArrays(arr1, arr2, ",")

        expect(output).toStrictEqual(["a,c", "a,d", "b,c", "b,d"])
    })

    it("should combine number and string arrays without join", () => {
        const arr1 = [1, 2]
        const arr2 = ["a", "b"]

        const output = combineStringArrays(arr1, arr2)

        expect(output).toStrictEqual(["1a", "1b", "2a", "2b"])
    })

    it("should combine number and string arrays with join", () => {
        const arr1 = [1, 2]
        const arr2 = ["a", "b"]

        const output = combineStringArrays(arr1, arr2, ",")

        expect(output).toStrictEqual(["1,a", "1,b", "2,a", "2,b"])
    })
})