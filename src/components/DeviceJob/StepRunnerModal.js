// @flow

import React, { PureComponent } from "react";
import { StyleSheet } from "react-native";
import { translate } from "react-i18next";
import BottomModal from "../BottomModal";
import Close from "../../icons/Close";
import Touchable from "../Touchable";
import colors from "../../colors";
import type { Step } from "./types";
import { ErrorFooterGeneric, RenderError } from "./StepRenders";

class SelectDeviceConnectModal extends PureComponent<{
  isOpened: boolean,
  deviceName: ?string,
  onClose: () => void,
  onRetry: () => void,
  onStepDone: () => void,
  step: Step,
  error: ?Error,
}> {
  render() {
    const {
      deviceName,
      isOpened,
      onClose,
      onRetry,
      onStepDone,
      error,
      step,
    } = this.props;

    return (
      <BottomModal id="DeviceJobModal" isOpened={isOpened} onClose={onClose}>
        {error ? (
          <RenderError
            error={error}
            onRetry={onRetry}
            Footer={step.ErrorFooter || ErrorFooterGeneric}
          />
        ) : (
          <step.Body
            deviceName={deviceName || ""}
            step={step}
            onDone={onStepDone}
          />
        )}
        <Touchable
          event="DeviceJobClose"
          style={styles.close}
          onPress={onClose}
        >
          <Close color={colors.fog} size={20} />
        </Touchable>
      </BottomModal>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  close: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  headIcon: {
    padding: 10,
  },
  title: {
    marginBottom: 10,
    fontSize: 18,
    color: colors.black,
  },
  description: {
    fontSize: 14,
    color: colors.grey,
  },
  retryButton: {
    marginTop: 20,
    alignSelf: "stretch",
  },
});

export default translate()(SelectDeviceConnectModal);
