import { LANG_DATA } from "../REDUX/actionTypes";

export default (
  state = {
    theme: false,
    lang: "en"
  },
  action
) => {
  switch (action.type) {
    case "FALDAXTHEME":
      return {
        ...state,
        theme: action.payload
      };
    case LANG_DATA:
      return { ...state, lang: action.payload };
    default:
      /* console.log("default") */
      return { ...state };
  }
};
