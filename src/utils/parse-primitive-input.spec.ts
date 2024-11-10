import { dropPrimitiveArrayDuplicates, parsePrimitiveInputToArr } from "./parse-primitive-input"

describe("dropPrimitiveArrayDuplicates", () => {
    it("should drop array duplicates when there are duplicates", () => {
        const arr = ["a", "a", "b"]

        const output = dropPrimitiveArrayDuplicates(arr)

        expect(output).toStrictEqual(["a", "b"])
    })

    it("should return same array when there are no duplicates", () => {
        const arr = ["a", "b"]

        const output = dropPrimitiveArrayDuplicates(arr)

        expect(output).toStrictEqual(["a", "b"])
    })
})

describe("parsePrimitiveInputToArr", () => {
    it("should parse correctly when it's array and has duplicates", () => {
        const arr = ["a", "a", "b"]

        const output = parsePrimitiveInputToArr(arr)

        expect(output).toStrictEqual(["a", "b"])
    })

    it("should parse correctly when it's array and has no duplicates", () => {
        const arr = ["a", "b"]

        const output = parsePrimitiveInputToArr(arr)

        expect(output).toStrictEqual(["a", "b"])
    })

    it("should parse correctly when it's object", () => {
        const str = "a"

        const output = parsePrimitiveInputToArr(str)

        expect(output).toStrictEqual(["a"])
    })
})