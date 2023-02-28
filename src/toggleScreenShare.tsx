import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Platform,
  Button,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import {
  useMeeting
} from "@videosdk.live/react-native-sdk";
import VideosdkRPK from "./VideosdkRPK";

export default function ToggleScreenShare({meetingId, enableScreenShare, disableScreenShare, toggleScreenShare, isMeetingJoined, localScreenShareOn}) {

  useEffect(() => {
    if (Platform.OS == "ios") {
      VideosdkRPK.addListener("onScreenShare", (event: any) => {
        if (event === "START_BROADCAST") {
          enableScreenShare();
        } else if (event === "STOP_BROADCAST") {
          disableScreenShare();
        }
      });

      return () => {
        VideosdkRPK.removeSubscription("onScreenShare");
      };
    }
  }, []);

  const toggleScreenshareOnMeetingJoined = () => {
    console.log("triggered", isMeetingJoined);
    // onPress
    if (meetingId) {
      toggleScreenShare();
    }
  };

  return (
    <View style={styles.container}>
      <Text>{meetingId ? meetingId : "meeting Id Unavailable"}</Text>
      <Text>{isMeetingJoined ? "Joined" : "Not Joined"}</Text>

      <TouchableOpacity style={styles.btn} onPress={toggleScreenshareOnMeetingJoined}>
        <Text style={styles.TextColor}>{`${localScreenShareOn ? "Stop" : "Start"} Screen Share`}</Text>
      </TouchableOpacity>

    </View>
  );
}

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
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#3abeff',
    marginTop: 20
  },
  TextColor: {
    color: "#ffff"
  }
});