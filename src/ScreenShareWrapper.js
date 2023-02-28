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
    MeetingProvider,
    useMeeting,
} from "@videosdk.live/react-native-sdk";
import VideosdkRPK from "./VideosdkRPK";
import { createMeeting } from "./api/api";
import ToggleScreenShare from "./toggleScreenShare";

export default function ScreenSharingWrapper(props) {
    const [isMeetingJoined, setIsMeetingJoined] = useState(false);
    const [meetingId, setMeetingId] = useState('');

    const {
        join,
        localScreenShareOn,
        toggleScreenShare,
        enableScreenShare,
        disableScreenShare
    } = useMeeting({
        onError: (data) => {
            const { code, message } = data;
            console.log(`Error useMeeting: ${code}: ${message}`);
        },
        onMeetingJoined: () => {
            setIsMeetingJoined(true);
        },
        onMeetingEnded: () => {
            setIsMeetingJoined(false);
        },
        onScreenShareStopped: () => {
            disableScreenShare();
        },
    });

    const getMeetId = async () => {
        const meetId = await createMeeting(props.token)
        setMeetingId(meetId);
    }

    useEffect(() => {
        if (isMeetingJoined) {
            enableScreenShare();
        }
    }, [isMeetingJoined]);

    return (
        <MeetingProvider
            config={{
                meetingId: meetingId,
                micEnabled: true,
                webcamEnabled: true,
                name: "test",
                notification: {
                    title: "Video SDK Meeting Started",
                    message: "Meeting is running...",
                },
            }}
            token={props.token}
        >
            <View style={styles.container}>
                <View style={styles.btnContainer}>
                    {meetingId ? (
                        <ToggleScreenShare
                            join={join}
                            enableScreenShare={enableScreenShare}
                            disableScreenShare={disableScreenShare}
                            localScreenShareOn={localScreenShareOn}
                            toggleScreenShare={toggleScreenShare}
                            setIsMeetingJoined={setIsMeetingJoined}
                            getMeetId={getMeetId}
                        />
                    ) : (
                        <View>
                            <Text>No MeetingId</Text>
                        </View>
                    )}
                </View>
            </View>
        </MeetingProvider>
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
    btnContainer: {
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