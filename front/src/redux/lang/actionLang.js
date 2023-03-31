import { FR, EN } from "./type";
import langFr from "../../lang/fr/langfr.json";
import langEn from "../../lang/en/langen.json";

export const changeLangFr = (choiceFr) => {
  return {
    type: FR,
    payload: langFr,
  };
};
export const changeLangEn = (choiceEn) => {
  return {
    type: EN,
    payload: langEn,
  };
};
