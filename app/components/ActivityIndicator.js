import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";

import colors from "../config/colors";

function ActivityIndicator({ visible = false }) {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <LottieView
        source={require("../assets/animations/loader.json")}
        loop
        autoPlay
        autoSize
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: "100%",
    width: "100%",
    zIndex: 1,
    position: "absolute",
    opacity: 0.8,
    backgroundColor: colors.white,
  },
});

export default ActivityIndicator;
