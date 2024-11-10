export function combineStringArrays(array1: (number | string)[], array2: (number | string)[], joinWith?: string) {
    return array1.flatMap(d => array2.map(v => String(d) + (joinWith ?? "") + String(v)))
}