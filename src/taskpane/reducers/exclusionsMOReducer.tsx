import { types } from "../constants/types";
import { ExclusionsMO } from "../models/ExclusionsMO";

export const exclusionsMOReducer = (state = new ExclusionsMO(), action) => {
  switch (action.type) {
    case types.SET_EXCLUSIONS:
      return {
        ...state,
        ...action.exclusionsMO
      };

    default:
      return state;
  }
};
