export function dropPrimitiveArrayDuplicates<T extends number | string>(arr: T[]) {
    return [...new Set(arr)]
}

export const parsePrimitiveInputToArr = <T extends number | string>(
    input: T | T[]
) => Array.isArray(input) ? dropPrimitiveArrayDuplicates(input) : [input]