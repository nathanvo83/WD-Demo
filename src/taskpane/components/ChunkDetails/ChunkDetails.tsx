import * as React from "react";
import { connect } from "react-redux";
import { types } from "../../constants/types";
import { ChunkDetailsMO } from "../../models/ChunkDetailsMO";
// import { Button } from "office-ui-fabric-react";

import "./ChunkDetails.css";
import { Analysis } from "../Analysis/Analysis";
import { ChunkListMO } from "../../models/ChunkListMO";

export interface AppProps {
  //
  chunkDetailsMO: ChunkDetailsMO;
  setChunkDetailsMO;
  setWordTypeScoreMO;
  chunkListMO: ChunkListMO;
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

  private changeColor(content: string) {
    let analysis: Analysis = new Analysis();
    let listItems: JSX.Element[] = [];
    let i: number = 0;

    content.split(" ").forEach(word => {
      let term = word.toLowerCase();
      i++;

      switch (analysis.identifyWord(term)) {
        case 0:
          listItems.push(
            <span key={"v" + i} className="verb">
              {word}
            </span>
          );
          listItems.push(<span key={"e" + i}> </span>);
          break;
        case 1:
          listItems.push(
            <span key={"n" + i} className="noun">
              {word}
            </span>
          );
          listItems.push(<span key={"e" + i}> </span>);
          break;
        case 2:
          listItems.push(
            <span key={"p" + i} className="preposition">
              {word}
            </span>
          );
          listItems.push(<span key={"e" + i}> </span>);
          break;
        case 3:
          listItems.push(
            <span key={"a" + i} className="ad_">
              {word}
            </span>
          );
          listItems.push(<span key={"e" + i}> </span>);
          break;
        case 4:
          listItems.push(
            <span key={"w" + i} className="waste">
              {word}
            </span>
          );
          listItems.push(<span key={"e" + i}> </span>);
          break;

        default:
          listItems.push(
            <span key={"n" + i} className="normal">
              {word}
            </span>
          );
          listItems.push(<span key={"e" + i}> </span>);
          break;
      }
    });

    console.log("--->changeColor:", listItems);
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

        console.log("--->renderContent:", listItems);
      }
    }

    if (start < content.length - 1) {
      // listItems.push(<div>{content.substring(start + 1)}</div>);
      start++;
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

const mapStateToProps = ({ chunkDetailsMO, chunkListMO }) => ({ chunkDetailsMO, chunkListMO });

export default connect(mapStateToProps, mapDispatchToProps)(ChunkDetails);
