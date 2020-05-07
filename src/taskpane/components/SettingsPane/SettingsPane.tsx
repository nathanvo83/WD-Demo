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
import { ExclusionsMO } from "../../models/ExclusionsMO";
import { ThemeMO } from "../../models/ThemeMO";
import { ConfigManager } from "../../Utils/ConfigManager";
import { LocalStorageManager } from "../../Utils/LocalStorageManager";

interface AppProps {
  //
  isShowSettingsPane;
  setHideSettingsPane;

  setExclusionsMO;
  exclusionsMO: ExclusionsMO;

  setThemeMO;
  themeMO: ThemeMO;
}

interface AppState {
  //
  isShowCustomTheme: boolean;
  unsaveExclusionsMO: ExclusionsMO;
  unsaveThemeMO: ThemeMO;
}

class SettingsPane extends React.Component<AppProps, AppState> {
  CUSTOM_KEY = "custom";

  constructor(props, context) {
    super(props, context);

    // init data
    this.state = {
      isShowCustomTheme: this.props.themeMO.key === this.CUSTOM_KEY,
      unsaveExclusionsMO: this.props.exclusionsMO,
      unsaveThemeMO: this.props.themeMO
    };
  }

  private getUnsaveExclusionsValue = name => {
    const { unsaveExclusionsMO } = this.state;
    return unsaveExclusionsMO[name];
  };

  private setUnsaveExclusionsValue = (name, newValue) => {
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

    // console.log("=======> setUnsaveExclusionsValue", this.state.unsaveExclusionsMO);
  };

  private getUnsaveThemeValue = name => {
    const { unsaveThemeMO } = this.state;
    return unsaveThemeMO[name];
  };

  private setUnsaveThemeValue = (name, newValue) => {
    const { unsaveThemeMO } = this.state;

    var settingEntry = {};

    settingEntry[name] = newValue;

    const updatedSettings = {
      ...unsaveThemeMO,
      ...settingEntry
    };

    this.setState({
      ...this.state,
      unsaveThemeMO: updatedSettings
    });

    // console.log("=======> setUnsaveThemeValue", this.state.unsaveThemeMO, this.props.themeMO);
  };

  private renderExclusionsCheckbox = (name, label) => {
    const settingValue = this.getUnsaveExclusionsValue(name);
    return (
      <Checkbox
        label={label}
        onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
          this.setUnsaveExclusionsValue(name, ev.target.checked);
        }}
        checked={settingValue}
      />
    );
  };

  renderThemeTab = () => {
    const ratingLabelPresets = ConfigManager.getRatingLabelPresets();

    const _onChange = (ev, option) => {
      console.log(ev);
      // console.log("++++++++++RatingLabel", getRatingLabelPresetsByKey(option.key));

      let _themeMO = ConfigManager.getThemeByKey(option.key);
      this.setState({
        ...this.state,
        unsaveThemeMO: _themeMO
      });

      if (option.key === this.CUSTOM_KEY) {
        this.setState({ isShowCustomTheme: true });
      } else {
        this.setState({ isShowCustomTheme: false });
      }
    };

    const onRenderCustomTheme = () => {
      const settingValue = this.getUnsaveThemeValue("ratings");

      const ratingHandler = (ev: React.ChangeEvent<HTMLInputElement>, pos) => {
        let newValue = [...settingValue];
        newValue[pos] = ev.target.value;
        this.setUnsaveThemeValue("ratings", newValue);
      };

      return (
        <div>
          <TextField
            className="ms-fontWeight-light theme-label-caption"
            label="1 (Best)"
            value={settingValue[0]}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
              ratingHandler(ev, 0);
            }}
          />
          <TextField
            className="ms-fontWeight-light theme-label-caption"
            label="2"
            value={settingValue[1]}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
              ratingHandler(ev, 1);
            }}
          />
          <TextField
            className="ms-fontWeight-light theme-label-caption"
            label="3"
            value={settingValue[2]}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
              ratingHandler(ev, 2);
            }}
          />
          <TextField
            className="ms-fontWeight-light theme-label-caption"
            label="4"
            value={settingValue[3]}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
              ratingHandler(ev, 3);
            }}
          />
          <TextField
            className="ms-fontWeight-light theme-label-caption"
            label="5 (Worst)"
            value={settingValue[4]}
            onChange={(ev: React.ChangeEvent<HTMLInputElement>) => {
              ratingHandler(ev, 4);
            }}
          />
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
      const { unsaveThemeMO } = this.state;

      return (
        <div className="currentscores  ms-font-s ms-fontWeight-bold">
          <p>{`${unsaveThemeMO.ratings[0]} - ${unsaveThemeMO.ratings[1]} - ${unsaveThemeMO.ratings[2]} - ${unsaveThemeMO.ratings[3]} - ${unsaveThemeMO.ratings[4]}`}</p>
          {/* <p>Current: Learn - Fit & Trim - Needs Toning - Flabby - Heart Attack!</p> */}
        </div>
      );
    };

    return (
      <div>
        {onRenderLanguageCurrentChoice()}
        <ChoiceGroup
          options={options}
          onChange={_onChange}
          selectedKey={this.state.unsaveThemeMO.key}
          // selectedKey={unsavedSettings.scoreLanguagePreset}
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
        <br />
        <p className="ms-fontWeight-light ms-font-s">Types of text to be excluded from test results.</p>
        <Stack tokens={stackTokens}>
          {this.renderExclusionsCheckbox("parens", "Text within parentheses")}
          {this.renderExclusionsCheckbox("singleQuotes", "Text within single quotes")}
          {this.renderExclusionsCheckbox("doubleQuotes", "Text within double quotes")}
          <br />
          {this.renderExclusionsCheckbox("headings", "Text styled as a heading")}
          {this.renderExclusionsCheckbox("indentedParagraphs", "Indented paragraphs")}
          {this.renderExclusionsCheckbox("listItems", "Text within lists")}
          {this.renderExclusionsCheckbox("tables", "Text within tables")}
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
    const { setHideSettingsPane, exclusionsMO, themeMO } = this.props;

    // console.log(themeMO, this.state.unsaveExclusionsMO);
    // console.log(exclusionsMO, this.state.unsaveExclusionsMO);
    this.setState({
      unsaveExclusionsMO: exclusionsMO,
      unsaveThemeMO: themeMO,
      isShowCustomTheme: themeMO.key === this.CUSTOM_KEY
    });

    setHideSettingsPane();
  };

  saveButtonHandler = () => {
    const { setHideSettingsPane, setExclusionsMO, setThemeMO } = this.props;
    setExclusionsMO(this.state.unsaveExclusionsMO);
    setThemeMO(this.state.unsaveThemeMO);

    // store to storage
    LocalStorageManager.setThemeMOToLocalStorage(this.state.unsaveThemeMO);
    LocalStorageManager.setExclusionsMOToLocalStorage(this.state.unsaveExclusionsMO);

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
  },
  setThemeMO: themeMO => {
    dispatch({
      type: types.SET_THEME,
      themeMO: themeMO
    });
  }
});

const mapStateToProps = ({ isShowSettingsPane, exclusionsMO, themeMO }) => ({
  isShowSettingsPane,
  exclusionsMO,
  themeMO
});

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPane);
