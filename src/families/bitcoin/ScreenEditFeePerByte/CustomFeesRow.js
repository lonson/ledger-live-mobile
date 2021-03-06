// @flow
import React, { Component } from "react";
import { Trans } from "react-i18next";
import { View, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import { BigNumber } from "bignumber.js";
import {
  sanitizeValueString,
  getCryptoCurrencyById,
} from "@ledgerhq/live-common/lib/currencies";

import LText from "../../../components/LText/index";
import Check from "../../../icons/Check";

import colors from "../../../colors";

const bitcoinCurrency = getCryptoCurrencyById("bitcoin");
const satoshiUnit = bitcoinCurrency.units[bitcoinCurrency.units.length - 1];

type Props = {
  title: React$Node,
  last?: boolean,
  initialValue: ?BigNumber,
  onPress: BigNumber => void,
  isSelected: boolean,
};

type State = {
  fees: ?string,
};

class FeesRow extends Component<Props, State> {
  static defaultProps = {
    last: false,
  };

  state = {
    fees: (this.props.initialValue || "").toString(),
  };

  input = React.createRef();

  onChangeText = (text: string) => {
    const { onPress } = this.props;
    const fees = sanitizeValueString(satoshiUnit, text);
    this.setState({ fees: fees.display }, () => {
      if (fees.value !== "") {
        onPress(BigNumber(fees.value));
      } else {
        onPress(BigNumber(0));
      }
    });
  };

  onPress = () => {
    const { onPress, initialValue } = this.props;
    const { fees } = this.state;

    if (fees) {
      onPress(BigNumber(fees));
    } else if (initialValue) {
      onPress(initialValue);
    } else {
      onPress(BigNumber(0));
    }

    if (this.input.current) {
      this.input.current.focus();
    }
  };

  render() {
    const { title, last, isSelected } = this.props;

    return (
      <TouchableOpacity onPress={this.onPress}>
        <View style={[styles.root, last ? styles.last : null]}>
          <View
            style={[
              styles.iconContainer,
              isSelected ? styles.iconContainerSelected : null,
            ]}
          >
            {isSelected ? <Check size={14} color={colors.white} /> : null}
          </View>
          <View style={styles.titleContainer}>
            <LText
              semiBold={isSelected}
              style={[styles.title, isSelected ? styles.titleSelected : null]}
            >
              {title}
            </LText>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              ref={this.input}
              style={[
                styles.textInput,
                isSelected ? styles.textInputSelected : null,
              ]}
              onFocus={this.onPress}
              onChangeText={this.onChangeText}
              value={this.state.fees && isSelected ? `${this.state.fees}` : ""}
              keyboardType="numeric"
              selectTextOnFocus
            />
            <LText style={styles.text} semiBold={isSelected}>
              <Trans i18nKey="common.satPerByte" />
            </LText>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 16,
    paddingRight: 16,
    paddingVertical: 16,
    borderBottomColor: colors.lightFog,
    borderBottomWidth: 1,
  },
  last: {
    borderBottomWidth: 0,
  },
  titleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginRight: 24,
  },
  title: {
    fontSize: 14,
    color: colors.grey,
  },
  titleSelected: {
    color: colors.darkBlue,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: colors.fog,
    borderRadius: 50,
    marginRight: 16,
  },
  iconContainerSelected: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.live,
    backgroundColor: colors.live,
  },
  text: {
    color: colors.darkBlue,
  },
  textInput: {
    fontSize: 14,
    marginRight: 6,
    color: colors.darkBlue,
    textAlign: "right",
  },
  textInputSelected: {
    fontWeight: "600",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});

export default FeesRow;
