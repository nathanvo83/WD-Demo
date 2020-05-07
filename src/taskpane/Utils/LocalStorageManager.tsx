import { ThemeMO } from "../models/ThemeMO";
import { ExclusionsMO } from "../models/ExclusionsMO";

export class LocalStorageManager {
  private static _themeName = "wd-Theme";
  private static _exclusionsName = "wd-Exclusions";

  static getThemeMOFromLocalStorage = () => {
    let _themeMO: ThemeMO = JSON.parse(localStorage.getItem(LocalStorageManager._themeName));
    return _themeMO;
  };

  static setThemeMOToLocalStorage = (themeMO: ThemeMO) => {
    //
    let lsThemeMO = JSON.stringify(themeMO);
    localStorage.setItem(LocalStorageManager._themeName, lsThemeMO);
  };

  static getExclusionsMOFromLocalStorage = () => {
    let _exclusionsMO: ExclusionsMO = JSON.parse(localStorage.getItem(LocalStorageManager._exclusionsName));
    return _exclusionsMO;
  };

  static setExclusionsMOToLocalStorage = (exclusionsMO: ExclusionsMO) => {
    //
    let lsExclusionMO = JSON.stringify(exclusionsMO);
    localStorage.setItem(LocalStorageManager._exclusionsName, lsExclusionMO);
  };
}
