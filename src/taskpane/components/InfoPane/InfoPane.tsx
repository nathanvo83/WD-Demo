import * as React from "react";
import { connect } from "react-redux";
// import * as underscore from 'underscore'
import { Panel, PanelType, Link, Icon } from "office-ui-fabric-react";
// import { Config, Settings } from '../config'
import { Config } from "../../constants/config";
import "./InfoPane.css";
import { types } from "../../constants/types";

export interface AppProps {
  //
  isShowInfoPane;
  setHideInfoPane;
  setShowFirstRun;
  setShowIntro;
}

export interface AppState {
  //
}

class InfoPane extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);
    this.state = {};
  }

  render() {
    const { isShowInfoPane, setHideInfoPane, setShowIntro } = this.props;

    const onRenderFooterContent = () => {
      return (
        <div className="p-footer">
          <p className="build-number ms-fontWeight-light ms-font-s">Build {Config.base.buildNumber}</p>
        </div>
      );
    };

    const onRenderHeaderContent = () => {
      return (
        <div className="p-header">
          <div className={"info-pane-container"}>
            <div className={"info-pane-top"}>
              <div className={"info-pane-logo"}>
                <img src={"assets/wd-logo-96.png"} />
              </div>
              <h1 className={"wd-themed-header"}>The Writer’s Diet</h1>
            </div>
            <div className={"info-pane-rest"}>
              <Link
                className="p-link"
                onClick={() => {
                  setShowIntro();
                  setHideInfoPane();
                }}
              >
                Show Intro
              </Link>
              <br />
              <Link
                className="p-link"
                onClick={() => {
                  window.open("http://writersdiet.com");
                }}
              >
                Website <Icon iconName={"NavigateExternalInline"} />{" "}
              </Link>
              <Link
                className="p-link"
                onClick={() => {
                  window.open("http://writersdiet.com/privacy");
                }}
              >
                Privacy Policy <Icon iconName={"NavigateExternalInline"} />
              </Link>
            </div>
          </div>
        </div>
      );
    };

    return (
      <Panel
        type={PanelType.smallFixedNear}
        onRenderHeader={onRenderHeaderContent}
        onRenderFooterContent={onRenderFooterContent}
        isOpen={isShowInfoPane}
        isFooterAtBottom={true}
        onDismiss={() => {
          setHideInfoPane();
        }}
      ></Panel>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setHideInfoPane: () => {
    dispatch({ type: types.HIDE_INFO_PANE });
  },
  setShowIntro: () => {
    dispatch({ type: types.SHOW_INTRO });
  },
  setShowFirstRun: () => {
    dispatch({ type: types.SHOW_FIRST_RUN });
  }
});

const mapStateToProps = ({ isShowInfoPane }) => ({
  isShowInfoPane
});

export default connect(mapStateToProps, mapDispatchToProps)(InfoPane);
