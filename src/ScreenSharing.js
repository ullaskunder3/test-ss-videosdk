import React from "react";

// Customizable Area Start
import {
  View,
  StyleSheet
} from "react-native";

import MeetScreen from "./MeetScreen";

import ScreenSharingController, {
  Props,
} from "./ScreenSharingController";

export default class ScreenSharing extends ScreenSharingController {
  constructor(props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  render() {

    return (
      <View style={styles.container}>
        <MeetScreen state={this.state} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#000",
    height: "100%",
    justifyContent: "center"
  },
});