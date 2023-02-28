import React from "react";

// Customizable Area Start
import {
  View,
  StyleSheet,
  Platform,
} from "react-native";

import ScreenShareWrapper from "./ScreenShareWrapper";

//@ts-ignore

// Merge Engine - import assets - Start
// Merge Engine - import assets - End

// Merge Engine - Artboard Dimension  - Start
let artBoardHeightOrg = 667;
let artBoardWidthOrg = 375;
// Merge Engine - Artboard Dimension  - End
// Customizable Area End

import ScreenSharingController, {
  Props,
} from "./ScreenSharingController";

export default class ScreenSharing extends ScreenSharingController {
  constructor(props) {
    super(props);
    // Customizable Area Start
    // Customizable Area End
  }

  // Customizable Area Start
  // async getMeetId() {
  //   const meetId = await createMeeting(this.state)
  //   this.setState({
  //     meetingId: meetId
  //   })
  // }
  // Customizable Area End

  render() {
    // Customizable Area Start
    // Merge Engine - render - Start
    console.log("Screen Share data token", this.state.token);
    console.log("Screen Share data roomID", this.state.meetingId);

    return (
      <View style={styles.btnContainer}>
        {/* NOT WORKING */}
        <ScreenShareWrapper props={this.state} />
      </View>
    );
    // Merge Engine - render - End
    // Customizable Area End
  }
}

// Customizable Area Start
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginLeft: "auto",
    marginRight: "auto",
    width: Platform.OS === "web" ? "75%" : "100%",
    maxWidth: 650,
    backgroundColor: "#ffffffff",
  },
  btnContainer: {
    justifyContent: "space-between",
    flexDirection: "row"
  },
  title: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  body: {
    marginBottom: 32,
    fontSize: 16,
    textAlign: "left",
    marginVertical: 8,
  },
  bgPasswordContainer: {
    flexDirection: "row",
    backgroundColor: "#00000000",
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: "#767676",
    borderRadius: 2,
    padding: 10,
    borderWidth: Platform.OS === "web" ? 0 : 1,
  },
  bgMobileInput: {
    flex: 1,
  },
  showHide: {
    alignSelf: "center",
  },
  imgShowhide: Platform.OS === "web" ? { height: 30, width: 30 } : {},
});
// Customizable Area End
