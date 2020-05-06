export class ThemeMO {
  key: string;
  themeTitle: string;
  themeQuestion: string;
  ratings: string[];

  constructor(key: string = "", themeTitle: string = "", themeQuestion: string = "", ratings: string[] = []) {
    this.key = key;
    this.themeTitle = themeTitle;
    this.themeQuestion = themeQuestion;
    this.ratings = ratings;
  }
}
