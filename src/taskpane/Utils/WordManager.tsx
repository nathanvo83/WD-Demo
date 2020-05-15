import { ConfigManager } from "./ConfigManager";
import { WordTypeScoreMO } from "../models/WordTypeScoreMO";

export class WordManager {
  static seperateWord(word: string) {
    let punctuation = ConfigManager.getPunctuation();
    let term = word.trim();
    let ext = "";
    let i = term.length - 1;

    while (i > 0 && punctuation.indexOf(term[i]) !== -1) {
      i--;
    }

    ext = term.slice(i + 1);
    term = term.slice(0, i + 1);

    return { term, ext };
  }

  private static getScore(score: number) {
    return Math.min(score || 0, 5);
  }

  static verifyScore(score) {
    return Math.min(Math.floor(score), 4);
  }

  static calculateAverage = (wordTypeScore: WordTypeScoreMO) => {
    let average = WordManager.verifyScore(
      Math.floor(
        (WordManager.getScore(wordTypeScore.nounScore) +
          WordManager.getScore(wordTypeScore.prepScore) +
          WordManager.getScore(wordTypeScore.verbScore) +
          WordManager.getScore(wordTypeScore.ad_Score) +
          WordManager.getScore(wordTypeScore.wasteScore)) /
          5
      )
    );

    return average;
  };
}
