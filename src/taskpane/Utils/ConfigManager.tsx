import { Config } from "../constants/config";
import { ThemeMO } from "../models/ThemeMO";
import { ExclusionsMO } from "../models/ExclusionsMO";

export class ConfigManager {
  static getThemeByKey = (key: string) => {
    let idx = Config.ratingLabelPresets.findIndex(item => item.key === key);
    let _preset = Config.ratingLabelPresets[idx];
    let _rating: string[] = [
      _preset.ratings[0],
      _preset.ratings[1],
      _preset.ratings[2],
      _preset.ratings[3],
      _preset.ratings[4]
    ];

    let _themeMO = new ThemeMO(key, _preset.themeTitle, _preset.themeQuestion, _rating);
    return _themeMO;
  };

  static getDefaultTheme = () => {
    return ConfigManager.getThemeByKey(Config.themeDefault);
  };

  static getDefaultExclusions = () => {
    let ex = Config.exclusions;
    let _exclusionsMO = new ExclusionsMO(
      ex.parens,
      ex.singleQuotes,
      ex.doubleQuotes,
      ex.headings,
      ex.indentedParagraphs,
      ex.listItems,
      ex.tables,
      ex.wordCountLessThan,
      ex.customExclusion
    );

    return _exclusionsMO;
  };

  static getRatingLabelPresets = () => {
    return Config.ratingLabelPresets;
  };

  static getPunctuation = () => {
    return Config.punctuation;
  };

  static getMetrics = () => {
    return Config.metrics;
  };

  static getChunkLength = () => {
    return Config.chunkLength;
  };

  static getNodePerProcess = () => {
    return Config.nodePerProcess;
  };

  static getDelayPerProcess = () => {
    return Config.delayPerProcess;
  };

  // static getThemeRating = (key: string, rate: number) => {};
}
