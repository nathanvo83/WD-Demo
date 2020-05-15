import * as React from "react";
import { connect } from "react-redux";
import "./Graph.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGrinHearts, faSmileBeam, faMeh, faFrown, faSadCry } from "@fortawesome/free-regular-svg-icons";
import GraphPart from "./GraphPart";
import { WordTypeScoreMO } from "../../models/WordTypeScoreMO";
import { ConfigManager } from "../../Utils/ConfigManager";
import { types } from "../../constants/types";

export interface AppProps {
  //
  wordTypeScoreMO: WordTypeScoreMO;
}

export interface AppState {
  //
}

class Graph extends React.Component<AppProps, AppState> {
  componentDidMount() {
    //
  }
  componentWillUnmount() {
    //
  }

  render() {
    const theSections = (
      <div className={"graph-part-sections"}>
        <div className={"graph-part-section-slice graph-part-section-slice--1"}></div>
        <div className={"graph-part-section-slice graph-part-section-slice--2"}></div>
        <div className={"graph-part-section-slice graph-part-section-slice--3"}></div>
        <div className={"graph-part-section-slice graph-part-section-slice--4"}></div>
        <div className={"graph-part-section-slice graph-part-section-slice--5"}></div>
      </div>
    );

    const theLines = (
      <div className={"graph-part-sections graph-part-lines"}>
        <div className={"graph-part-section-line"}></div>
        <div className={"graph-part-section-line"}></div>
        <div className={"graph-part-section-line"}></div>
        <div className={"graph-part-section-line"}></div>
        <div className={"graph-part-section-line"}></div>
      </div>
    );

    const theEmojis = (
      <div className={"graph-part graph-part-emojis"}>
        <FontAwesomeIcon icon={faSmileBeam} style={{ flex: 1 }} />
        <FontAwesomeIcon icon={faGrinHearts} style={{ flex: 1 }} />
        <FontAwesomeIcon icon={faMeh} style={{ flex: 1 }} />
        <FontAwesomeIcon icon={faFrown} style={{ flex: 1 }} />
        <FontAwesomeIcon icon={faSadCry} style={{ flex: 1 }} />
      </div>
    );
    const { wordTypeScoreMO } = this.props;
    const metrics = ConfigManager.getMetrics();
    const graph = (
      <div className={"graph-container"}>
        {theSections}
        {theLines}
        {theEmojis}
        <GraphPart
          label={metrics.Verbs.label}
          score={wordTypeScoreMO.verbScore}
          color={metrics.Verbs.color}
          type={types.CHECK_VERB}
        ></GraphPart>
        <GraphPart
          label={metrics.Nouns.label}
          score={wordTypeScoreMO.nounScore}
          color={metrics.Nouns.color}
          type={types.CHECK_NOUN}
        ></GraphPart>
        <GraphPart
          label={metrics.Prepositions.label}
          score={wordTypeScoreMO.prepScore}
          color={metrics.Prepositions.color}
          type={types.CHECK_PREP}
        ></GraphPart>
        <GraphPart
          label={metrics.AdjectivesAdverbs.label}
          score={wordTypeScoreMO.ad_Score}
          color={metrics.AdjectivesAdverbs.color}
          type={types.CHECK_AD_}
        ></GraphPart>
        <GraphPart
          label={metrics.WasteWords.label}
          score={wordTypeScoreMO.wasteScore}
          color={metrics.WasteWords.color}
          type={types.CHECK_WASTE}
        ></GraphPart>
      </div>
    );

    return <div>{graph}</div>;
  }
}

const mapStateToProps = ({ wordTypeScoreMO }) => ({
  wordTypeScoreMO
});

export default connect(mapStateToProps, null)(Graph);
