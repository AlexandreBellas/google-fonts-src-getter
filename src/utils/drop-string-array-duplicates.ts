export function dropStringArrayDuplicates(arr: string[]) {
    return [...new Set(arr)]
}