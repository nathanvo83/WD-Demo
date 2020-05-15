import * as React from "react";
import { connect } from "react-redux";
import "./Diagnosis.css";
import { types } from "../../constants/types";
import { ChunkDetailsMO } from "../../models/ChunkDetailsMO";
import { IconButton } from "office-ui-fabric-react";
import { ChunkListMO } from "../../models/ChunkListMO";
// import { WordTypeScoreMO } from "../../models/WordTypeScoreMO";
import { ThemeMO } from "../../models/ThemeMO";
import { GraphCheckListMO } from "../../models/GraphCheckListMO";
import { WordManager } from "../../Utils/WordManager";

// import RegionIcon from "../../../assets/regionicon.svg";
// import DocumentIcon from "../../../assets/documenticon.svg";

// import DocumentIcon from "../../../../assets/documenticon.svg";
const DocumentIcon = require("../../../../assets/documenticon.svg");
const RegionIcon = require("../../../../assets/regionicon.svg");

export interface AppProps {
  //
  chunkDetailsMO: ChunkDetailsMO;
  setChunkDetailsMO;

  chunkListMO: ChunkListMO;
  setWordTypeScoreMO;

  themeMO: ThemeMO;

  graphCheckListMO: GraphCheckListMO;
}

export interface AppState {
  //
}

class Diagnosis extends React.Component<AppProps, AppState> {
  closeButtonHandler = () => {
    const { setChunkDetailsMO, chunkDetailsMO, chunkListMO, setWordTypeScoreMO } = this.props;
    chunkDetailsMO.isShow = false;
    setChunkDetailsMO(chunkDetailsMO);
    setWordTypeScoreMO(chunkListMO.wordTypeScore);
  };

  getChunkDetailsRating() {
    //
    const { chunkDetailsMO, graphCheckListMO } = this.props;
    let result: number;

    if (graphCheckListMO.cVerb === true) {
      result = WordManager.verifyScore(chunkDetailsMO.data.wordTypeScore.verbScore);
    } else if (graphCheckListMO.cNoun === true) {
      result = WordManager.verifyScore(chunkDetailsMO.data.wordTypeScore.nounScore);
    } else if (graphCheckListMO.cPrep === true) {
      result = WordManager.verifyScore(chunkDetailsMO.data.wordTypeScore.prepScore);
    } else if (graphCheckListMO.cAd_ === true) {
      result = WordManager.verifyScore(chunkDetailsMO.data.wordTypeScore.ad_Score);
    } else if (graphCheckListMO.cWaste === true) {
      result = WordManager.verifyScore(chunkDetailsMO.data.wordTypeScore.wasteScore);
    } else {
      result = WordManager.verifyScore(chunkDetailsMO.data.wordTypeScore.average);
    }

    return result;
  }

  getChunkListRating() {
    //
    const { chunkListMO, graphCheckListMO } = this.props;
    let result: number;

    if (graphCheckListMO.cVerb === true) {
      result = WordManager.verifyScore(chunkListMO.wordTypeScore.verbScore);
    } else if (graphCheckListMO.cNoun === true) {
      result = WordManager.verifyScore(chunkListMO.wordTypeScore.nounScore);
    } else if (graphCheckListMO.cPrep === true) {
      result = WordManager.verifyScore(chunkListMO.wordTypeScore.prepScore);
    } else if (graphCheckListMO.cAd_ === true) {
      result = WordManager.verifyScore(chunkListMO.wordTypeScore.ad_Score);
    } else if (graphCheckListMO.cWaste === true) {
      result = WordManager.verifyScore(chunkListMO.wordTypeScore.wasteScore);
    } else {
      result = WordManager.verifyScore(chunkListMO.wordTypeScore.average);
    }

    return result;
  }

  getRating() {
    const { chunkDetailsMO, themeMO } = this.props;

    let result;
    result =
      chunkDetailsMO.isShow === true
        ? themeMO.ratings[this.getChunkDetailsRating()]
        : themeMO.ratings[this.getChunkListRating()];

    return result;
  }

  render() {
    const { chunkDetailsMO, chunkListMO } = this.props;

    const regionBackgroundColor = "#5f5ba4"; // dark purple
    const documentBackgroundColor = "#69696c"; // dark grey
    const overallMessage = `This ${chunkDetailsMO.isShow ? "region" : "document"} has ${
      chunkDetailsMO.isShow ? chunkDetailsMO.data.contentWordCount : chunkListMO.contentWordCount
    } eligible words.`;

    return (
      <div
        className="diagnosis-container"
        style={{
          ...{
            backgroundColor: chunkDetailsMO.isShow ? regionBackgroundColor : documentBackgroundColor
          },

          color: "white"
        }}
      >
        <div className="diagnosis-container-top">
          <div className="diagnosis-header">
            {chunkDetailsMO.isShow ? (
              <img src={RegionIcon} className="diagnosis-icon" width="40px" height="40px"></img>
            ) : (
              <img src={DocumentIcon} className="diagnosis-icon" width="40px" height="40px"></img>
            )}
            {this.getRating()}

            {/* {console.log(
              "~~~>>calculateAverage",
              WordManager.calculateAverage(chunkDetailsMO.data.wordTypeScore),
              themeMO.ratings[5]
            )} */}
            {/* {chunkDetailsMO.isShow
              ? themeMO.ratings[chunkDetailsMO.data.wordTypeScore.average]
              : themeMO.ratings[chunkListMO.wordTypeScore.average]} */}
            {/* <DocumentIcon className="diagnosis-icon" width="40px" height="40px" /> */}
          </div>
          <div className={"diagnosis-icon-container"}>
            {chunkDetailsMO.isShow ? (
              <IconButton
                iconProps={{
                  iconName: "ChromeClose",
                  styles: { root: { color: "white" } }
                }}
                onClick={this.closeButtonHandler}
              />
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="diagnosis-container-footer">{overallMessage} </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setChunkDetailsMO: chunkDetailsMO => {
    dispatch({
      type: types.SET_CHUNK_DETAILS,
      chunkDetailsMO: chunkDetailsMO
    });
  },
  setWordTypeScoreMO: wordTypeScoreMO => {
    dispatch({
      type: types.SET_SCORE,
      wordTypeScoreMO: wordTypeScoreMO
    });
  }
});

const mapStateToProps = ({ chunkDetailsMO, chunkListMO, themeMO, graphCheckListMO }) => ({
  chunkDetailsMO,
  chunkListMO,
  themeMO,
  graphCheckListMO
});

export default connect(mapStateToProps, mapDispatchToProps)(Diagnosis);
