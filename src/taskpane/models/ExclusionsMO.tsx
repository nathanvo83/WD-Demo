export class ExclusionsMO {
  public parens: boolean;
  public singleQuotes: boolean;
  public doubleQuotes: boolean;
  public headings: boolean;
  public indentedParagraphs: boolean;
  public listItems: boolean;
  public tables: boolean;
  public wordCountLessThan: number;
  public customExclusion: string[];

  constructor(
    parens: boolean = true,
    singleQuotes: boolean = true,
    doubleQuotes: boolean = true,
    headings: boolean = true,
    indentedParagraphs: boolean = true,
    listItems: boolean = true,
    tables: boolean = true,
    wordCountLessThan: number = 25,
    customExclusion: string[] = []
  ) {
    this.parens = parens;
    this.singleQuotes = singleQuotes;
    this.doubleQuotes = doubleQuotes;
    this.headings = headings;
    this.indentedParagraphs = indentedParagraphs;
    this.listItems = listItems;
    this.tables = tables;
    this.wordCountLessThan = wordCountLessThan;
    this.customExclusion = customExclusion;
  }
}
