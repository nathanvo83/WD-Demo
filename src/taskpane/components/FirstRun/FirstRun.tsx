import * as React from "react";
import { connect } from "react-redux";
import { DefaultButton, PrimaryButton } from "office-ui-fabric-react";
import "./FirstRun.css";
import Lottie from "react-lottie";
import * as slideOneData from "./slideOne.json";
import { types } from "../../constants/types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export interface AppProps {
  //
  setHideIntro;
}

export interface AppState {
  //
  currentSlide: number;
}

class Slide extends React.Component<any, any> {
  render() {
    const { imagePath, animationData } = this.props;

    let slideMedia = <div className={"first-run-slide-image"}></div>;
    if (animationData) {
      const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid meet"
        }
      };
      slideMedia = (
        <div className={"first-run-slide-lottie"}>
          <Lottie options={defaultOptions} />
        </div>
      );
    } else {
      slideMedia = <div className={"first-run-slide-image"} style={{ backgroundImage: `url(${imagePath})` }}></div>;
    }

    return (
      <div className={"first-run-slide"}>
        {slideMedia}
        <div className={"first-run-slide-content-container"}>
          <div className={"first-run-slide-content"}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

class FirstRun extends React.Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = { currentSlide: 0 };
  }

  render() {
    const { setHideIntro } = this.props;
    const responsive = {
      superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 1
      },
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 1
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 1
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
      }
    };
    return (
      <div>
        <div className="first-run-container">
          <div className="first-run-skip-link">
            <DefaultButton
              text="Skip"
              onClick={() => {
                setHideIntro();
              }}
              styles={{
                flexContainer: {
                  flexDirection: "row-reverse"
                }
              }}
              iconProps={{ iconName: "ChevronRight" }}
            />
          </div>
        </div>
        <Carousel showDots={true} responsive={responsive}>
          <Slide animationData={slideOneData}>
            <p className={"ms-fontWeight-light"}>
              The WritersDiet Test is a diagnostic tool designed to give you feedback on whether your writing is “flabby
              or fit.”
            </p>
          </Slide>
          <Slide imagePath={"https://picsum.photos/330/330/?image=410"}>
            <h3 className={"ms-font-xl"}>Lorem Ipsum</h3>
            <p className={"ms-fontWeight-light"}>
              The WritersDiet Test highlights words in each of five grammatical categories. The higher the percentage of
              highlighted words, the “flabbier” your score.
            </p>
          </Slide>
          <Slide imagePath={"https://picsum.photos/330/330/?image=510"}>
            <h3 className={"ms-font-xl"}>Lorem Ipsum</h3>
            <p className={"ms-fontWeight-light"}>
              Originally designed for academic writers, the Writer’s Diet has also proven popular with students,
              technical writers, business analysts, journalists, and even fiction writers – anyone who aspires to write
              more clearly and engagingly.
            </p>
            <div className={"first-run-get-started-container"}>
              {/* <PrimaryButton text="Start Writing" onClick={onDismiss} /> */}
              <PrimaryButton
                text="Start Writing"
                onClick={() => {
                  setHideIntro();
                }}
              />
            </div>
          </Slide>
        </Carousel>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setHideIntro: () => {
    dispatch({ type: types.HIDE_INTRO });
  }
});

// const mapStateToProps = ({ isShowInfoPane }) => ({
//   isShowInfoPane
// });

export default connect(null, mapDispatchToProps)(FirstRun);
