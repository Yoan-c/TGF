import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import langReducer from "../lang/reducerLang";

const store = createStore(langReducer, applyMiddleware(thunk));

export default store;
