import { types } from "../constants/types";
import { ThemeMO } from "../models/ThemeMO";

export const themeMOReducer = (state = new ThemeMO(), action) => {
  switch (action.type) {
    case types.SET_THEME:
      return {
        ...state,
        ...action.themeMO
      };

    default:
      return state;
  }
};
