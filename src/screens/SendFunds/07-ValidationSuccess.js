/* @flow */
import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { translate } from "react-i18next";
import type { NavigationScreenProp } from "react-navigation";
import type { Account, Operation } from "@ledgerhq/live-common/lib/types";

import { accountScreenSelector } from "../../reducers/accounts";
import { TrackScreen } from "../../analytics";
import colors from "../../colors";
import PreventNativeBack from "../../components/PreventNativeBack";
import ValidateSuccess from "./ValideSuccess";

type Props = {
  account: Account,
  navigation: NavigationScreenProp<{
    params: {
      accountId: string,
      deviceId: string,
      transaction: *,
      result: Operation,
    },
  }>,
};

class ValidationSuccess extends Component<Props> {
  static navigationOptions = {
    header: null,
    gesturesEnabled: false,
  };

  dismiss = () => {
    const { navigation } = this.props;
    if (navigation.dismiss) {
      const dismissed = navigation.dismiss();
      if (!dismissed) navigation.goBack();
    }
  };

  goToOperationDetails = () => {
    const { navigation, account } = this.props;
    const result = navigation.getParam("result");
    if (!result) return;
    navigation.navigate("OperationDetails", {
      accountId: account.id,
      operation: result,
    });
  };

  render() {
    return (
      <View style={styles.root}>
        <TrackScreen category="SendFunds" name="ValidationSuccess" />
        <PreventNativeBack />
        <ValidateSuccess
          onClose={this.dismiss}
          onViewDetails={this.goToOperationDetails}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.white,
  },
});

const mapStateToProps = (state, props) => ({
  account: accountScreenSelector(state, props),
});

export default connect(mapStateToProps)(translate()(ValidationSuccess));
