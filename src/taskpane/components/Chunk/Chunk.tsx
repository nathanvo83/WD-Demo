import * as React from "react";
import { connect } from "react-redux";
import "./Chunk.css";
import { faGrinHearts } from "@fortawesome/free-regular-svg-icons";
import { faSmileBeam } from "@fortawesome/free-regular-svg-icons";
import { faMeh } from "@fortawesome/free-regular-svg-icons";
import { faFrown } from "@fortawesome/free-regular-svg-icons";
import { faSadCry } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GraphCheckListMO } from "../../models/GraphCheckListMO";
import { ConfigManager } from "../../Utils/ConfigManager";
import { ChunkDataMO } from "../../models/ChunkDataMO";
import { WordManager } from "../../Utils/WordManager";

export interface AppProps {
  //
  // title: string;
  // score;

  isUpdated;
  chunkDataMO: ChunkDataMO;
  graphCheckListMO: GraphCheckListMO;
}

export interface AppState {
  //
}

class Chunk extends React.Component<AppProps, AppState> {
  icons = [faSmileBeam, faGrinHearts, faMeh, faFrown, faSadCry];

  componentDidMount() {
    //
  }

  componentWillUnmount() {
    //
  }

  generateIcon = score => {
    let result;

    switch (score) {
      case 0:
        result = <FontAwesomeIcon icon={faSmileBeam}></FontAwesomeIcon>;
        break;
      case 1:
        result = <FontAwesomeIcon icon={faGrinHearts}></FontAwesomeIcon>;
        break;
      case 2:
        result = <FontAwesomeIcon icon={faMeh}></FontAwesomeIcon>;
        break;
      case 3:
        result = <FontAwesomeIcon icon={faFrown}></FontAwesomeIcon>;
        break;
      case 4:
        result = <FontAwesomeIcon icon={faSadCry}></FontAwesomeIcon>;
        break;
      default:
        break;
    }

    return result;
  };

  getIcon() {
    const { graphCheckListMO, chunkDataMO } = this.props;
    let result;

    if (graphCheckListMO.cVerb === true) {
      result = this.generateIcon(WordManager.verifyScore(chunkDataMO.wordTypeScore.verbScore));
    } else if (graphCheckListMO.cNoun === true) {
      result = this.generateIcon(WordManager.verifyScore(chunkDataMO.wordTypeScore.nounScore));
    } else if (graphCheckListMO.cPrep === true) {
      result = this.generateIcon(WordManager.verifyScore(chunkDataMO.wordTypeScore.prepScore));
    } else if (graphCheckListMO.cAd_ === true) {
      result = this.generateIcon(WordManager.verifyScore(chunkDataMO.wordTypeScore.ad_Score));
    } else if (graphCheckListMO.cWaste === true) {
      result = this.generateIcon(WordManager.verifyScore(chunkDataMO.wordTypeScore.wasteScore));
    } else {
      result = this.generateIcon(WordManager.verifyScore(chunkDataMO.wordTypeScore.average));
    }

    return result;
  }

  getCSSStyle() {
    const { graphCheckListMO } = this.props;

    let result: React.CSSProperties;
    const metrics = ConfigManager.getMetrics();

    if (graphCheckListMO.cVerb === true) {
      result = { borderTopColor: metrics.Verbs.color, borderBottomColor: metrics.Verbs.color };
    } else if (graphCheckListMO.cNoun === true) {
      result = { borderTopColor: metrics.Nouns.color, borderBottomColor: metrics.Nouns.color };
    } else if (graphCheckListMO.cPrep === true) {
      result = { borderTopColor: metrics.Prepositions.color, borderBottomColor: metrics.Prepositions.color };
    } else if (graphCheckListMO.cAd_ === true) {
      result = { borderTopColor: metrics.AdjectivesAdverbs.color, borderBottomColor: metrics.AdjectivesAdverbs.color };
    } else if (graphCheckListMO.cWaste === true) {
      result = { borderTopColor: metrics.WasteWords.color, borderBottomColor: metrics.WasteWords.color };
    }

    return result;
  }

  render() {
    // const metrics = ConfigManager.getMetrics();
    const { chunkDataMO } = this.props;
    return (
      <div>
        <div
          className={this.props.isUpdated == true ? "chunk chunk-updated" : "chunk chunk-pending"}
          // style={{ borderTopColor: metrics.Verbs.color, borderBottomColor: metrics.Verbs.color }}
          style={this.getCSSStyle()}
        >
          {this.props.isUpdated == true ? this.getIcon() : ""} {chunkDataMO.title.trim()}
        </div>
      </div>
    );
  }
}
const mapStateToProps = ({ graphCheckListMO }) => ({
  graphCheckListMO
});

export default connect(mapStateToProps, null)(Chunk);
