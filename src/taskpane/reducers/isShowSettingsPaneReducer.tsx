import { types } from "../constants/types";

export const isShowSettingsPaneReducer = (state = false, action) => {
  switch (action.type) {
    case types.SHOW_SETTINGS_PANE:
      return true;

    case types.HIDE_SETTINGS_PANE:
      return false;

    default:
      return state;
  }
};
