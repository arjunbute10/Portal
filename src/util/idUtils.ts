import { useEternal } from "./useEternal";

const getRandom = () => {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

//TODO: WRITE UNIT TEST?
export function getUniqueIdentifier(prefix?: string) {
    const randomPart = (getRandom() + getRandom() + '-' + getRandom() + '-' + getRandom() + '-' + getRandom() + '-' + getRandom() + getRandom() + getRandom()).toLowerCase();
    if (prefix)
        return prefix + '-' + randomPart;
    else
        return randomPart;
}

//TODO: WRITE UNIT TEST?
export function makeSafeForIdAttribute(possiblyUnsafe: string | undefined) {
    if (!possiblyUnsafe)
        return;
    return possiblyUnsafe
        .replaceAll(/[ #.:>+[\](){}]/g, '_'); // remove CSS special characters from id or querying it will be kind of impossible
    // add additional replaces needed as we discover them
}

//TODO: WRITE UNIT TEST?
/** If `idProp` is defined, it is returned. Otherwise, returns a unique id string prefixed with `prefix` that will never change for the life of the component */
export function useAutoIdAttribute(idProp: string | undefined, prefix: string) {
    const uniqueId = useEternal(getUniqueIdentifier(makeSafeForIdAttribute(prefix))); // have to compute it even if we won't use it cuz hooks can't run conditionally
    return idProp || uniqueId;
}