import { combineReducers, createStore } from "redux";
import userReducer from "../user/userReducer";
import questionReducer from "../question/questionReducer";
import answerReducer from "../answer/answerReducer";
import tagReducer from "../tag/tagReducer";
import voteReducer from "../vote/voteReducer";

const rootReducer = combineReducers({
    userState: userReducer,
    questionState: questionReducer,
    answerState: answerReducer,
    tagState: tagReducer,
    voteState: voteReducer
});

const store = createStore(rootReducer);

export default store;