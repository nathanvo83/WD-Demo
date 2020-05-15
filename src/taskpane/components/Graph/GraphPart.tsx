import * as React from "react";
import { connect } from "react-redux";
import { Checkbox } from "office-ui-fabric-react";
import { types } from "../../constants/types";
import { GraphCheckListMO } from "../../models/GraphCheckListMO";

export interface AppProps {
  //
  label: string;
  color: string;
  score: number;
  type: string;

  graphCheckListMO: GraphCheckListMO;
  setGraphCheckListMO;
}

export interface AppState {
  //
  start: boolean;
  down: boolean;
  active: boolean;
}

class GraphPart extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      start: true,
      down: false,
      active: false
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ ...this.state, start: false });
    }, 0);
  }

  checkBoxHandler() {
    const { graphCheckListMO, setGraphCheckListMO, type } = this.props;

    console.log("~~>> check change:", this.props.type, graphCheckListMO);
    // this.setState({ ...this.state, active: !this.state.active });

    let _graphCheckListMO = new GraphCheckListMO(
      graphCheckListMO.cVerb,
      graphCheckListMO.cNoun,
      graphCheckListMO.cPrep,
      graphCheckListMO.cWaste,
      graphCheckListMO.cAd_
    );
    // let _graphCheckListMO = { ...graphCheckListMO, cVerb: true };
    switch (type) {
      case types.CHECK_VERB:
        _graphCheckListMO.setCheck(types.CHECK_VERB);
        setGraphCheckListMO(_graphCheckListMO);
        break;
      case types.CHECK_NOUN:
        _graphCheckListMO.setCheck(types.CHECK_NOUN);
        setGraphCheckListMO(_graphCheckListMO);
        break;
      case types.CHECK_PREP:
        _graphCheckListMO.setCheck(types.CHECK_PREP);
        setGraphCheckListMO(_graphCheckListMO);
        break;
      case types.CHECK_AD_:
        _graphCheckListMO.setCheck(types.CHECK_AD_);
        setGraphCheckListMO(_graphCheckListMO);
        break;
      case types.CHECK_WASTE:
        _graphCheckListMO.setCheck(types.CHECK_WASTE);
        setGraphCheckListMO(_graphCheckListMO);
        break;

      default:
        break;
    }
  }

  getIsChecked() {
    const { graphCheckListMO, type } = this.props;

    let result: boolean = false;
    switch (type) {
      case types.CHECK_VERB:
        result = graphCheckListMO.cVerb;
        break;
      case types.CHECK_NOUN:
        result = graphCheckListMO.cNoun;
        break;
      case types.CHECK_PREP:
        result = graphCheckListMO.cPrep;
        break;
      case types.CHECK_AD_:
        result = graphCheckListMO.cAd_;
        break;
      case types.CHECK_WASTE:
        result = graphCheckListMO.cWaste;
        break;

      default:
        break;
    }

    return result;
  }

  render() {
    // const { label, color, score, foo, activeMetric, setActiveMetric, metricKey } = this.props;
    const { label, color, score } = this.props;
    const { start, down } = this.state;
    // const active = metricKey === activeMetric;
    // function _onChange(ev: React.FormEvent<HTMLElement>, isChecked: boolean) {
    //   console.log(`The option has been changed to ${isChecked}. ${ev}`);
    // }

    const pct = (score / 5) * 100;

    // const theLabel = <span className={`graph-part-label ${active ? "graph-part-label--active" : ""}`}>{label}</span>;
    const theLabel = <span className={`graph-part-label`}>{label}</span>;

    const theBar = (
      <div
        // className={`graph-part-bar ${down ? "graph-part-bar--down" : ""} ${active ? "graph-part-bar--active" : ""}`}
        className={`graph-part-bar ${down ? "graph-part-bar--down" : ""} `}
        style={{
          width: `${start ? 0 : pct}%`,
          backgroundColor: color
        }}
      ></div>
    );

    return (
      <div
        className={`graph-part graph-part--active`}
        // className={`graph-part ${active ? "graph-part--active" : ""}`}
        // onClick={() => {
        //   setActiveMetric(active ? 0 : metricKey);
        //   this.setState({ ...this.state, down: active });
        //   setTimeout(() => {
        //     this.setState({ ...this.state, down: false });
        //   }, 100);
        // }}
        onClick={() => {
          this.checkBoxHandler();
        }}
      >
        {/* <Checkbox checked={active} /> */}

        <Checkbox checked={this.getIsChecked()} />
        {theLabel}
        {theBar}
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setGraphCheckListMO: graphCheckListMO => {
    dispatch({
      type: types.SET_GRAPH_CHECK_LIST,
      graphCheckListMO: graphCheckListMO
    });
  }
});

const mapStateToProps = ({ graphCheckListMO }) => ({
  graphCheckListMO
});

export default connect(mapStateToProps, mapDispatchToProps)(GraphPart);
