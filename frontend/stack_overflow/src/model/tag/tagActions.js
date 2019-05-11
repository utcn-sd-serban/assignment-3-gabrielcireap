import { ADD_TAG } from "./tagActionTypes";

export function addTag(name) {

    let payload = {
        name
    };

    return {
        type: ADD_TAG,
        payload
    };
}