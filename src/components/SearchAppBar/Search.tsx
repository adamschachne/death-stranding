import React, { RefObject } from "react";
import Downshift from "downshift";
import classNames from "classnames";
import { WithStyles } from "@material-ui/styles";
import SearchIcon from "@material-ui/icons/Search";
import { InputBase } from "@material-ui/core";
import {} from "@material-ui/core/Popper";
import styles from "./styles";
import SearchMenu from "./SearchMenu";
import { StateConsumer } from "../State";

interface Props extends WithStyles<typeof styles> {
  inputRef: RefObject<HTMLInputElement>;
}

interface State {
  focused: Boolean;
}

class Search extends React.Component<Props, State> {
  state = {
    focused: false
  };

  render() {
    const { inputRef, classes } = this.props;
    const { focused } = this.state;

    return (
      <Downshift
        isOpen={focused}
        onChange={(selection) => {
          console.log(`You selected ${selection ? selection.value : ""}`);
          const { current } = inputRef;

          if (current !== null) {
            if (!selection) {
              current.blur();
            } else {
              current.select();
            }
          }
        }}
        itemToString={(item) => (item ? item.value : "")}
        stateReducer={(state, changes) => {
          // Do not clear search input content on blur
          switch (changes.type) {
            case Downshift.stateChangeTypes.blurInput:
              return state;
            case Downshift.stateChangeTypes.keyDownEscape:
              if (inputRef.current !== null) {
                inputRef.current.blur();
              }
              return { ...state, ...changes, selectedItem: state.selectedItem };
            default:
              return { ...state, ...changes };
          }
        }}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          isOpen,
          inputValue,
          highlightedIndex,
          selectedItem
        }) => (
          <div className={classNames(classes.allPointerEvents, classes.search)}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <div>
              <InputBase
                classes={{
                  root: classes.inputRoot,
                  input: classNames(classes.inputInput, focused && classes.inputInputFocused)
                }}
                {...getInputProps({
                  placeholder: "Search…",
                  onFocus: ({ target }: React.FocusEvent<HTMLInputElement>) => {
                    // this.hasFocus = true;
                    this.setState({ focused: true });
                    target.select();
                  },
                  onBlur: () => {
                    const {
                      inputRef: { current }
                    } = this.props;

                    if (current === null || current !== document.activeElement) {
                      this.setState({ focused: false });
                    }
                  },
                  inputRef,
                  // ts complains without onChange and ref
                  onChange: undefined,
                  ref: undefined
                })}
              />
              <StateConsumer>
                {({ flex }) => (
                  <SearchMenu
                    classes={classes}
                    flex={flex}
                    isOpen={isOpen}
                    getMenuProps={getMenuProps}
                    getItemProps={getItemProps}
                    inputValue={inputValue}
                  />
                )}
              </StateConsumer>
            </div>
          </div>
        )}
      </Downshift>
    );
  }
}

export default Search;
