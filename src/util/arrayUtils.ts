export const unique = <T>(value: T, index: number, array: T[]): boolean => {
    return array.indexOf(value) === index;
};

export const groupBy: <TKey, TValue>(list: TValue[], keyGetter: (item: TValue) => TKey) => Map<TKey, TValue[]> =  
<TKey, TValue>(list: TValue[], keyGetter: (item: TValue) => TKey) => {
    const map = new Map<TKey, TValue[]>();
    list.forEach((item: TValue) => {
         const key = keyGetter(item);
         const collection = map.get(key);
         if (!collection) {
             map.set(key, [item]);
         } else {
             collection.push(item);
         }
    });
    return map;
};

/// Performs an Array join with null and undefined items filtered out in advance
export function joinHasValue<T = any>(array: T[], separator: string) {
    return array.filter(a => a !== undefined && a !== null).join(separator);
};

// Performs an Array join with null, undefined, and empty/whitespace-only items filtered out in advance
export function joinHasValueNotBlank<T = any>(array: T[], separator: string) {
    return array.filter(a => a !== undefined && a !== null && (a as any).toString().trim() !== "").join(separator);
};