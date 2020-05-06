import * as React from "react";
import { connect } from "react-redux";
import "./SettingsPane.css";
import {
  Panel,
  PanelType,
  Pivot,
  PivotItem,
  PivotLinkSize,
  PivotLinkFormat,
  PrimaryButton,
  DefaultButton,
  ChoiceGroup,
  TextField,
  Checkbox,
  Stack,
  SpinButton
} from "office-ui-fabric-react";
import { types } from "../../constants/types";
import { Config } from "../../constants/config";
import { ExclusionsMO } from "../../models/ExclusionsMO";

interface AppProps {
  //
  isShowSettingsPane;
  setHideSettingsPane;

  setExclusionsMO;
  exclusionsMO: ExclusionsMO;
}

interface AppState {
  //
  isShowCustomTheme: boolean;
  unsaveExclusionsMO: ExclusionsMO;
}

class SettingsPane extends React.Component<AppProps, AppState> {
  constructor(props, context) {
    super(props, context);

    // init data
    this.state = { isShowCustomTheme: false, unsaveExclusionsMO: this.props.exclusionsMO };
  }

  private getUnsaveExclusionsValue = name => {
    const { unsaveExclusionsMO } = this.state;
    return unsaveExclusionsMO[name];
  };

  private setUnsaveExclusionsValue(name, newValue) {
    const { unsaveExclusionsMO } = this.state;
    var settingEntry = {};

    settingEntry[name] = newValue;

    const updatedSettings = {
      ...unsaveExclusionsMO,
      ...settingEntry
    };

    this.setState({
      ...this.state,
      unsaveExclusionsMO: updatedSettings
    });

    console.log("=======> setUnsaveExclusionsValue", this.state.unsaveExclusionsMO);
  }

  private renderCheckbox = (name, label) => {
    const settingValue = this.getUnsaveExclusionsValue(name);
    return (
      <Checkbox
        label={label}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          console.log(ev.target, "---", ev.target.value, "===");
          this.setUnsaveExclusionsValue(name, ev.target.checked);
        }}
        checked={settingValue}
      />
    );
  };

  renderThemeTab = () => {
    const ratingLabelPresets = Config.ratingLabelPresets;

    const _onChange = (ev, option) => {
      console.log(ev, option, option.key);

      if (option.key === "custom") {
        this.setState({ isShowCustomTheme: true });
      } else {
        this.setState({ isShowCustomTheme: false });
      }
    };

    const onRenderCustomTheme = () => {
      return (
        <div>
          <TextField className="ms-fontWeight-light theme-label-caption" label="1 (Best)" />
          <TextField className="ms-fontWeight-light theme-label-caption" label="2" />
          <TextField className="ms-fontWeight-light theme-label-caption" label="3" />
          <TextField className="ms-fontWeight-light theme-label-caption" label="4" />
          <TextField className="ms-fontWeight-light theme-label-caption" label="5 (Worst)" />
        </div>
      );
    };

    const onRenderLanguageChoiceLabel = props => {
      return (
        <span id={props.labelId} className="ms-ChoiceFieldLabel">
          <span>{props.text}</span>
          {"   "}
          <span className="ms-fontWeight-light theme-label-caption">{props.themeQuestion}</span>
        </span>
      );
    };

    const options = ratingLabelPresets.map(preset => {
      return {
        ...preset,
        text: preset.themeTitle,
        onRenderLabel: onRenderLanguageChoiceLabel
      };
    });

    const onRenderLanguageCurrentChoice = () => {
      return (
        <div className="currentscores  ms-font-s ms-fontWeight-bold">
          <p>Current: Learn - Fit & Trim - Needs Toning - Flabby - Heart Attack!</p>
        </div>
      );
    };

    return (
      <div>
        {onRenderLanguageCurrentChoice()}
        <ChoiceGroup
          options={options}
          onChange={_onChange}
          // selectedKey={unsavedSettings.scoreLanguagePreset}
          // label="Learn - Fit & Trim - Needs Toning - Flabby - Heart Attack!"
          required={true}
        />
        {this.state.isShowCustomTheme === true ? onRenderCustomTheme() : null}
        <br />
      </div>
    );
  };

  renderExclusionTab = () => {
    const stackTokens = { childrenGap: 10 };
    const { unsaveExclusionsMO } = this.state;
    const suffix = " words";
    const maxWord = 1000000;

    const hasSuffix = (value: string, unitSuffix: string): Boolean => {
      const subString = value.substr(value.length - unitSuffix.length);
      return subString === unitSuffix;
    };

    const removeSuffix = (value: string, unitSuffix: string): string => {
      if (!hasSuffix(value, unitSuffix)) {
        return value;
      }
      return value.substr(0, value.length - suffix.length);
    };

    const onSpinButtonIncrement = (value: string) => {
      value = removeSuffix(value, suffix);
      let result: number = maxWord;
      if (Number(value) + 1 > maxWord) {
        // return String(+value) + suffix;
      } else {
        result = Number(value) + 1;
        // return String(+value + 1) + suffix;
      }

      this.setUnsaveExclusionsValue("wordCountLessThan", result);

      return String(result) + suffix;
    };

    const onSpinButtonDecrement = (value: string) => {
      value = removeSuffix(value, suffix);
      let result: number = 0;
      if (Number(value) - 1 < 0) {
        // return String(+value) + suffix;
      } else {
        result = Number(value) - 1;
        // return String(+value - 1) + suffix;
      }

      this.setUnsaveExclusionsValue("wordCountLessThan", result);

      return String(result) + suffix;
    };

    const onSpinButtonValidate = (value: string) => {
      value = removeSuffix(value, suffix);

      if (Number(value) > maxWord || Number(value) < 0 || value.trim().length === 0 || isNaN(+value)) {
        value = "0";
        // return "0" + suffix;
      }

      this.setUnsaveExclusionsValue("wordCountLessThan", value);

      return String(value) + suffix;
    };

    const _a2S = (a: string[]): string => {
      let result: string = "";

      a.map(item => {
        result += result != "" ? "\n" + item : item;
      });

      return result;
    };

    const _s2A = (s: string): string[] => {
      let result: string[];
      result = s.split("\n");
      return result;
    };

    return (
      <div>
        {console.log("-------------------------------renderExclusionTab")}
        <br />
        <p className="ms-fontWeight-light ms-font-s">Types of text to be excluded from test results.</p>
        <Stack tokens={stackTokens}>
          {this.renderCheckbox("parens", "Text within parentheses")}
          {this.renderCheckbox("singleQuotes", "Text within single quotes")}
          {this.renderCheckbox("doubleQuotes", "Text within double quotes")}
          <br />
          {this.renderCheckbox("headings", "Text styled as a heading")}
          {this.renderCheckbox("indentedParagraphs", "Indented paragraphs")}
          {this.renderCheckbox("listItems", "Text within lists")}
          {this.renderCheckbox("tables", "Text within tables")}
        </Stack>
        <br />
        {/* <p>Paragraphs with a word count less than:</p> */}
        <SpinButton
          label={"Paragraphs with a word count less than:"}
          min={0}
          max={maxWord}
          value={unsaveExclusionsMO.wordCountLessThan + suffix}
          onValidate={onSpinButtonValidate}
          onIncrement={onSpinButtonIncrement}
          onDecrement={onSpinButtonDecrement}
          incrementButtonAriaLabel={"Increase value by 1"}
          decrementButtonAriaLabel={"Decrease value by 1"}
        />
        <br />
        <TextField
          label="Custom word exclusions"
          multiline
          value={_a2S(unsaveExclusionsMO.customExclusion)}
          onChange={(ev: React.ChangeEvent<HTMLTextAreaElement>) => {
            this.setUnsaveExclusionsValue("customExclusion", _s2A(ev.target.value));
          }}
        ></TextField>
        <p className="ms-fontWeight-light ms-font-s">Add words separated by a new line.</p>
        <br />
        <br />
      </div>
    );
  };

  cancelButtonHandler = () => {
    const { setHideSettingsPane, exclusionsMO } = this.props;
    this.setState({
      unsaveExclusionsMO: exclusionsMO
    });

    console.log(exclusionsMO, this.state.unsaveExclusionsMO);

    setHideSettingsPane();
  };

  saveButtonHandler = () => {
    const { setHideSettingsPane, setExclusionsMO } = this.props;
    setExclusionsMO(this.state.unsaveExclusionsMO);
    setHideSettingsPane();
  };

  render() {
    const { isShowSettingsPane } = this.props;

    const onRenderHeaderContent = () => {
      return <div className="s-header">Settings</div>;
    };

    const onRenderFooterContent = () => {
      return (
        <div className="s-footer">
          <PrimaryButton style={{ marginRight: "16px" }} onClick={() => this.saveButtonHandler()}>
            Save
          </PrimaryButton>
          <DefaultButton onClick={() => this.cancelButtonHandler()}>Cancel</DefaultButton>
        </div>
      );
    };

    const onRenderBodyContent = () => {
      return (
        <div className="s-body">
          <Pivot linkFormat={PivotLinkFormat.tabs} linkSize={PivotLinkSize.normal}>
            <PivotItem headerText="Theme">
              <br />
              <p className="ms-fontWeight-light ms-font-s">Customize the theme.</p>
              {this.renderThemeTab()}
            </PivotItem>
            <PivotItem headerText="Exclusions">{this.renderExclusionTab()}</PivotItem>
          </Pivot>
        </div>
      );
    };

    return (
      <Panel
        hasCloseButton={false}
        type={PanelType.smallFixedFar}
        onRenderHeader={onRenderHeaderContent}
        onRenderBody={onRenderBodyContent}
        onRenderFooterContent={onRenderFooterContent}
        isOpen={isShowSettingsPane}
        isFooterAtBottom={true}
        onDismiss={() => {
          this.cancelButtonHandler();
        }}
      ></Panel>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setHideSettingsPane: () => {
    dispatch({ type: types.HIDE_SETTINGS_PANE });
  },
  setExclusionsMO: exclusionsMO => {
    dispatch({
      type: types.SET_EXCLUSIONS,
      exclusionsMO: exclusionsMO
    });
  }
});

const mapStateToProps = ({ isShowSettingsPane, exclusionsMO }) => ({
  isShowSettingsPane,
  exclusionsMO
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPane);
