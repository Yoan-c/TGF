import { FR, EN } from "./type";
import langFr from "../../lang/fr/langfr.json";

const initialisationLang = {
  lang: langFr,
};

const langReducer = (state = initialisationLang, action) => {
  switch (action.type) {
    case FR:
      return {
        ...state,
        lang: action.payload,
      };
    case EN:
      return {
        ...state,
        lang: action.payload,
      };

    default:
      return state;
  }
};

export default langReducer;
