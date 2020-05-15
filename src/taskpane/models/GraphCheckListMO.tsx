import { types } from "../constants/types";

export class GraphCheckListMO {
  public cVerb: boolean;
  public cNoun: boolean;
  public cPrep: boolean;
  public cWaste: boolean;
  public cAd_: boolean;

  constructor(cVerb: boolean = false, cNoun: boolean = false, cPrep: boolean = false, cWaste = false, cAd_ = false) {
    this.cVerb = cVerb;
    this.cNoun = cNoun;
    this.cPrep = cPrep;
    this.cWaste = cWaste;
    this.cAd_ = cAd_;
  }

  reset() {
    this.cVerb = false;
    this.cNoun = false;
    this.cPrep = false;
    this.cWaste = false;
    this.cAd_ = false;
  }

  setCheck(type: string) {
    switch (type) {
      case types.CHECK_VERB:
        this.cVerb = !this.cVerb;
        this.cNoun = false;
        this.cPrep = false;
        this.cWaste = false;
        this.cAd_ = false;
        break;
      case types.CHECK_NOUN:
        this.cNoun = !this.cNoun;
        this.cVerb = false;
        this.cPrep = false;
        this.cWaste = false;
        this.cAd_ = false;
        break;
      case types.CHECK_PREP:
        this.cPrep = !this.cPrep;
        this.cVerb = false;
        this.cNoun = false;
        this.cWaste = false;
        this.cAd_ = false;
        break;
      case types.CHECK_AD_:
        this.cAd_ = !this.cAd_;
        this.cVerb = false;
        this.cNoun = false;
        this.cPrep = false;
        this.cWaste = false;
        break;
      case types.CHECK_WASTE:
        this.cWaste = !this.cWaste;
        this.cVerb = false;
        this.cNoun = false;
        this.cPrep = false;
        this.cAd_ = false;
        break;
      default:
        break;
    }
  }
}
