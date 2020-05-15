import { types } from "../constants/types";
import { GraphCheckListMO } from "../models/GraphCheckListMO";

export const graphCheckListMOReducer = (state = new GraphCheckListMO(), action) => {
  switch (action.type) {
    case types.SET_GRAPH_CHECK_LIST:
      return {
        ...state,
        ...action.graphCheckListMO
      };

    default:
      return state;
  }
};
