import * as React from "react";
import { connect } from "react-redux";
import { types } from "../../constants/types";
import { ChunkDetailsMO } from "../../models/ChunkDetailsMO";
// import { Button } from "office-ui-fabric-react";

import "./ChunkDetails.css";
import { Analysis } from "../Analysis/Analysis";
import { ChunkListMO } from "../../models/ChunkListMO";
import { WordManager } from "../../Utils/WordManager";
import { GraphCheckListMO } from "../../models/GraphCheckListMO";

export interface AppProps {
  //
  chunkDetailsMO: ChunkDetailsMO;
  setChunkDetailsMO;
  setWordTypeScoreMO;
  chunkListMO: ChunkListMO;
  graphCheckListMO: GraphCheckListMO;
}

export interface AppState {
  //
}

class ChunkDetails extends React.Component<AppProps, AppState> {
  componentDidMount() {
    //
  }
  componentWillUnmount() {
    //
  }
  chunkHandler = () => {
    const { chunkDetailsMO, setChunkDetailsMO, setWordTypeScoreMO, chunkListMO } = this.props;

    chunkDetailsMO.isShow = false;

    setChunkDetailsMO(chunkDetailsMO);
    setWordTypeScoreMO(chunkListMO.wordTypeScore);
  };

  private addWord(listWord: JSX.Element[], word: string, key: string, className: string = "normal") {
    let { term, ext } = WordManager.seperateWord(word);

    listWord.push(
      <span key={key} className={className}>
        {term}
      </span>
    );

    if (ext !== "") {
      listWord.push(
        <span key={"_" + key} className="normal">
          {ext + " "}
        </span>
      );
    } else {
      listWord.push(
        <span key={"_" + key} className="normal">
          {" "}
        </span>
      );
    }
  }

  private combineGraphCheckList() {
    const { graphCheckListMO } = this.props;
    if (
      graphCheckListMO.cVerb === false &&
      graphCheckListMO.cNoun === false &&
      graphCheckListMO.cPrep === false &&
      graphCheckListMO.cWaste === false &&
      graphCheckListMO.cAd_ === false
    ) {
      return true;
    }
    return false;
  }

  private changeColor(content: string) {
    const { graphCheckListMO } = this.props;
    let analysis: Analysis = new Analysis();
    let listItems: JSX.Element[] = [];
    let i: number = 0;

    content.split(" ").forEach(word => {
      let term = word.toLowerCase();
      i++;

      switch (analysis.identifyWord(term)) {
        case 0:
          if (graphCheckListMO.cVerb === true || this.combineGraphCheckList() === true) {
            this.addWord(listItems, word, "v" + i, "verb");
          } else {
            this.addWord(listItems, word, "v" + i, "normal");
          }
          break;
        case 1:
          if (graphCheckListMO.cNoun === true || this.combineGraphCheckList() === true) {
            this.addWord(listItems, word, "n" + i, "noun");
          } else {
            this.addWord(listItems, word, "n" + i, "normal");
          }
          break;
        case 2:
          if (graphCheckListMO.cPrep === true || this.combineGraphCheckList() === true) {
            this.addWord(listItems, word, "p" + i, "preposition");
          } else {
            this.addWord(listItems, word, "p" + i, "normal");
          }
          break;
        case 3:
          if (graphCheckListMO.cAd_ === true || this.combineGraphCheckList() === true) {
            this.addWord(listItems, word, "a" + i, "ad_");
          } else {
            this.addWord(listItems, word, "a" + i, "normal");
          }
          break;
        case 4:
          if (graphCheckListMO.cWaste === true || this.combineGraphCheckList() === true) {
            this.addWord(listItems, word, "w" + i, "waste");
          } else {
            this.addWord(listItems, word, "w" + i, "normal");
          }
          break;
        default:
          this.addWord(listItems, word, "p" + i, "normal");
          break;
      }
    });

    return listItems;
  }

  renderContent = (content: string) => {
    let listItems: JSX.Element[] = [];
    let start: number = 0;

    for (let i = 0; i < content.length; i++) {
      if (content[i] === "\r") {
        // listItems.push(<div>{content.substring(start, i)}</div>);
        let x = content.substring(start, i);
        let y = this.changeColor(x);
        listItems.push(<div key={start}>{y}</div>);
        start = i + 1;
      }
    }

    if (start < content.length - 1) {
      // listItems.push(<div>{content.substring(start + 1)}</div>);
      if (start > 0) {
        start++;
      }
      let x = content.substring(start);
      let y = this.changeColor(x);
      listItems.push(<div key={start}>{y}</div>);
    }

    return listItems;
  };

  render() {
    // const { setWordTypeScoreMO, chunkDetailsMO } = this.props;

    // setWordTypeScoreMO(chunkDetailsMO.data.wordTypeScore);

    return (
      <div className="chunk-details-content">
        {/* <Button onClick={this.chunkHandler}>Close</Button>
        <br /> */}

        {this.renderContent(this.props.chunkDetailsMO.data.content)}
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

const mapStateToProps = ({ chunkDetailsMO, chunkListMO, graphCheckListMO }) => ({
  chunkDetailsMO,
  chunkListMO,
  graphCheckListMO
});

export default connect(mapStateToProps, mapDispatchToProps)(ChunkDetails);
