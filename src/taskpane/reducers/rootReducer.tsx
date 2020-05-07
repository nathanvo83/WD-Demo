import { combineReducers } from "redux";
import { chunkDetailsMOReducer } from "./chunkDetailsMOReducer";
import { chunkListMOReducer } from "./chunkListMOReducer";
import { wordTypeScoreMOReducer } from "./wordTypeScoreMOReducer";
import { isShowInfoPaneReducer } from "./isShowInfoPaneReducer";
import { isShowFirstRunReducer } from "./isShowFirstRunReducer";
import { isShowIntroReducer } from "./isShowIntroReducer";
import { isShowSettingsPaneReducer } from "./isShowSettingsPaneReducer";
import { exclusionsMOReducer } from "./exclusionsMOReducer";
import { themeMOReducer } from "./themeMOReducer";

export const rootReducer = combineReducers({
  // MO
  chunkDetailsMO: chunkDetailsMOReducer,
  chunkListMO: chunkListMOReducer,
  wordTypeScoreMO: wordTypeScoreMOReducer,
  exclusionsMO: exclusionsMOReducer,
  themeMO: themeMOReducer,
  // TRUE - FALSE
  isShowInfoPane: isShowInfoPaneReducer,
  isShowFirstRun: isShowFirstRunReducer,
  isShowIntro: isShowIntroReducer,
  isShowSettingsPane: isShowSettingsPaneReducer
});
