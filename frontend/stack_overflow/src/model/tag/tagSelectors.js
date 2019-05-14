import store from "../store/store";

export function toString(tags) {
    let s = "";
    if (tags === null || tags === undefined)
        return "";

    tags.forEach(tag => s += tag + " ");
    return s;
}

export function isNew(tag) {
    return !store.getState().tagState.tags.includes(tag);
}
