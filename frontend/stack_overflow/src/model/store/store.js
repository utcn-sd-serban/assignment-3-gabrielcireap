import { combineReducers, createStore } from "redux";
import userReducer from "../user/userReducer";
import questionReducer from "../question/questionReducer";
import answerReducer from "../answer/answerReducer";

const rootReducer = combineReducers({
    userState: userReducer,
    questionState: questionReducer,
    answerState: answerReducer
});

export function dispatch(action) {
    store.dispatch(action);
}

const store = createStore(rootReducer);

export default store;