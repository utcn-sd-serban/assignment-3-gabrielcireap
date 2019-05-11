import { ADD_TAG } from "./tagActionTypes";

const initialState = {
    tags: ["tag1", "react", "js"],
    newTag: "node"
};

function tagReducer(state = initialState, action) {

    switch (action.type) {
        case ADD_TAG:
            return addTag(state, action.payload);
    }
    return state;
};

function addTag(state, payload) {
    let newState = {
        ...state,
        tags: state.tags.concat([payload.name])
    };
    return newState;
}

export default tagReducer;