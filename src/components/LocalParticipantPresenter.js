import { useMeeting } from "@videosdk.live/react-native-sdk";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function LocalParticipantPresenter ({}){
  const { disableScreenShare } = useMeeting({});
  return (
    <View
      style={{
        flex: 3,
        backgroundColor: "pink",
        justifyContent: "center",
        borderRadius: 8,
        margin: 4,
      }}
    >
      <View
        style={{
          alignItems: "center",
        }}
      >
          <Icon name="screen-share" size={25} color="#4F8EF7" />
        <Text
          style={{
            fontSize: 14,
            color: "yellow",
            marginVertical: 12,
          }}
        >
          You are presenting to everyone
        </Text>
        <TouchableOpacity
          style={{
            paddingHorizontal: 16,
            paddingVertical: 12,
            alignItems: "center",
            backgroundColor: "#5568FE",
            borderRadius: 12,
            marginVertical: 12,
          }}
          onPress={() => {
            disableScreenShare();
          }}
        >
          <Text
            style={{
              color: "blue",
              fontSize: 16,
            }}
          >
            Stop Presenting
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
