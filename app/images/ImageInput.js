import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Image,
  Button,
  View,
  TouchableWithoutFeedback,
  ImageEditor,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

import Screen from "../Screen";
import AppForm from "../forms";
import colors from "../../config/colors";
import Icon from "../icons/Icon";

function ImageInput({ imageUri, onChangeImage }) {
  useEffect(() => {
    requestPermision;
  }, []);

  const requestPermision = async () => {
    const { granted } = await ImagePicker.requestCameraRollPermissionsAsync();
    if (!granted) {
      alert("You need to enable access to your camera roll");
    }
  };
  const handlePress = () => {
    if (!imageUri) {
      selectImage();
    } else {
      Alert.alert(
        "DELETE",
        "Are you shure you want to delete the selected image?",
        [{ text: "Yes", onPress: () => onChangeImage(null) }, { text: "No" }]
      );
    }
  };
  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.5,
      });
      if (!result.cancelled) {
        onChangeImage(result.uri);
      }
    } catch (error) {
      console.log("Error reading library");
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <Icon
            name="camera"
            size={80}
            iconColor={colors.mediumGrey}
            backgroundColor={colors.transparent}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.lightGrey,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export default ImageInput;
