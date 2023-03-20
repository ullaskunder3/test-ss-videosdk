import React from "react";
import { View, Text } from "react-native";
import {
  useParticipant,
  RTCView,
  MediaStream,
} from "@videosdk.live/react-native-sdk";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function RemoteParticipantPresenter({ presenterId }) {
  const { displayName, screenShareStream, screenShareOn } =
    useParticipant(presenterId);

  const presentingText = displayName || "";

  return (
    <View
      style={{
        flex: 3,
        paddingHorizontal: 12,
        borderTopColor: "green",
        justifyContent: "space-between",
      }}
    >
      {screenShareOn && screenShareStream ? (
        <View
          style={{
            width: 300,
            height: 300
          }}
        >
          <RTCView
            streamURL={new MediaStream([screenShareStream.track]).toURL()}
            objectFit={"contain"}
            style={{
              flex: 3,
            }}
          />
        </View>
      ) : <View><Text>ScreeShare not working</Text></View>}
      <View
        style={{
          flexDirection: "row",
          marginBottom: 8,
          justifyContent: "space-between",
          position: "absolute",
          bottom: 0,
          right: 0,
          left: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            padding: 6,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 4,
          }}
        >
          <Icon name="screen-share" size={25} color="#4F8EF7" />
          <Text
            style={{
              color: "white",
              fontSize: 12,
              marginLeft: 10,
            }}
          >
            {`${presentingText} is Presenting`}
          </Text>
        </View>
      </View>
    </View>
  );
}
