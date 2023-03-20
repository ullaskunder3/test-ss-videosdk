import React, { useEffect, useState, useRef, useMemo } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Clipboard,
    Alert,
    Dimensions,
    TextInput,
    SafeAreaView,
    FlatList
} from "react-native";
import {
    MeetingProvider,
    useMeeting,
    useParticipant,
    RTCView
} from "@videosdk.live/react-native-sdk";
import Icon from 'react-native-vector-icons/Feather';
import { createMeeting } from "./api/api";
import RemoteParticipantPresenter from "./components/RemoteParticipantPresenter";
import LocalParticipantPresenter from "./components/LocalParticipantPresenter";


function JoinScreen(props) {
    const [meetingVal, setMeetingVal] = useState("");

    return (
        <View style={styles.mainBtnsWrapper}>

            <View style={styles.mainBtnsWrapper}>
                <View style={{}}>
                    <TextInput
                        value={meetingVal}
                        onChangeText={setMeetingVal}
                        placeholder={"XXXX-XXXX-XXXX"}
                        placeholderTextColor={"white"}
                        style={{
                            padding: 12,
                            borderWidth: 1,
                            borderRadius: 6,
                            borderColor: "#5568FE",
                            backgroundColor: "#5555",
                            color: "white"
                        }}
                    />
                    <TouchableOpacity
                        style={styles.btn}
                        onPress={() => {
                            props.getMeetingId(meetingVal)
                        }}
                    >
                        <Text style={{ color: "white", alignSelf: "center", fontSize: 18 }}>
                            Join Meeting
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.btnsContainer}>
                    <TouchableOpacity style={styles.btn} onPress={() => props.getMeetingId()}>
                        <Text style={styles.TextColor}>Create Meeting</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

const CustomButton = ({ onPress, buttonText, backgroundColor }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: backgroundColor,
                justifyContent: "center",
                alignItems: "center",
                padding: 12,
                borderRadius: 4,
            }}
        >
            <Text style={{ color: "white", fontSize: 12 }}>{buttonText}</Text>
        </TouchableOpacity>
    );
};

function ControlsContainer({ join, leave, toggleWebcam, toggleScreenShare, localScreenShareOn, meetingId }) {
    return (
        <View
            style={{
                flexDirection: "row",
                justifyContent: "space-between",
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0
            }}
        >
            {
                !meetingId ? (
                    <CustomButton
                        onPress={() => {
                            join();
                        }}
                        buttonText={"Join"}
                        backgroundColor={"#5568FE"}
                    />
                ) : null
            }
            <CustomButton
                onPress={() => {
                    toggleWebcam();
                }}
                buttonText={"Toggle Webcam"}
                backgroundColor={"#5568FE"}
            />
            <CustomButton
                onPress={() => {
                    toggleScreenShare();
                }}
                buttonText={`${localScreenShareOn ? "Stop" : "Start"} Screen Share`}
                backgroundColor={"#5568FE"}
            />
            {
                !meetingId ? (null) : (
                    <CustomButton
                        onPress={() => {
                            leave();
                        }}
                        buttonText={"Leave"}
                        backgroundColor={"#FF0000"}
                    />
                )
            }
        </View>
    );
}

function ParticipantView({ participantId }) {
    const {
        screenShareStream
    } = useParticipant(participantId);

    const { localScreenShareOn, displayName, presenterId } = useMeeting({})

    const isPortrait = () => {
        const dim = Dimensions.get("screen");
        return dim.height >= dim.width;
    };

    const orientation = isPortrait() ? "PORTRAIT" : "LANDSCAPE"

    return (
        <>
            <View
                style={{
                    flex: 1,
                    flexDirection: orientation == "PORTRAIT" ? "column" : "row",
                    marginVertical: 12,
                }}
            >
                {presenterId && !localScreenShareOn && participantId !== presenterId ? (
                    <RemoteParticipantPresenter presenterId={presenterId} />
                ) : presenterId && localScreenShareOn && participantId !== presenterId ? (
                    <LocalParticipantPresenter />
                ) : (
                    <View>
                        <Text style={{ color: "white" }}>No SCREEN SHARE STREAM</Text>
                    </View>
                )}
            </View>
        </>
    )
}

function ParticipantList({ participants }) {
    return participants.length > 0 ? (
        <FlatList
            data={participants}
            renderItem={({ item }) => {
                return <ParticipantView participantId={item} />;
            }}
        />
    ) : (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Text style={styles.TextColor}>Press Join button to enter meeting.</Text>
        </View>
    );
}
function MeetingView() {
    const { join, leave, toggleWebcam, toggleScreenShare, meetingId, participants, localScreenShareOn } = useMeeting({});
    const participantsArrId = [...participants.keys()];

    const clipboardCopyText = () => {
        Clipboard.setString(meetingId);
        Alert.alert("Meeting Id copied Successfully");
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.meetingHeaderUser}>
                <View style={styles.userProfile}>
                    <Icon name="user" size={25} color="#4F8EF7" />
                </View>
                <TouchableOpacity
                    style={styles.copyText}
                    onPress={() => clipboardCopyText()}
                >
                    {meetingId ? (
                        <Text style={styles.TextColorMeedID}>
                            {meetingId}
                        </Text>
                    ) : null}
                    {meetingId ? (<Icon name="copy" size={25} color="#4F8EF7" />) : null}
                </TouchableOpacity>
            </View>
            <ParticipantList participants={participantsArrId} />
            <ControlsContainer
                join={join}
                leave={leave}
                toggleWebcam={toggleWebcam}
                toggleScreenShare={toggleScreenShare}
                localScreenShareOn={localScreenShareOn}
                meetingId={meetingId}
            />
        </View>
    );
}



export default function MeetScreen(props) {
    console.log("props", props);

    const [meetingId, setMeetingId] = useState(null);

    const getMeetingId = async (id) => {
        const meetingId = id == null ? await createMeeting(props.state) : id;
        console.log("Join Meeting: id", meetingId);

        setMeetingId(meetingId);
    };

    return meetingId ? (
        <SafeAreaView style={{ flex: 1 }}>
            <MeetingProvider
                config={{
                    meetingId,
                    micEnabled: false,
                    webcamEnabled: true,
                    name: "Ullas",
                }}
                token={props.state.token}
            >
                <MeetingView />
            </MeetingProvider>
        </SafeAreaView>
    ) : (
        <JoinScreen getMeetingId={getMeetingId} />
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 667,
        justifyContent: "space-between"
    },
    containerHeader: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    meetingHeaderUser: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    userProfile: {
        backgroundColor: "white",
        padding: 5,
        borderRadius: 50,
    },
    meetContentWrapper: {
        flexDirection: "row"
    },
    meetingIdText: {
        fontSize: 16,
        color: "white",
        backgroundColor: "#5556",
        padding: 10,
        borderRadius: 10
    },
    mainBtnsWrapper: {

    },
    btnsContainer: {
        flexDirection: "row",
        justifyContent: "center"
    },
    meetingText: {
        color: "white"
    },
    copyText: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    participantViewContainer: {
        marginTop: 10
    },
    btn: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#5568FE',
        marginTop: 20
    },
    btnAlt: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#5558',
        marginTop: 20
    },
    TextColor: {
        color: "#ffff",
        fontSize: 18,
    },
    TextColorMeedID: {
        backgroundColor: "#1116",
        color: "white",
        padding: 10,
        borderRadius: 10,
        marginRight: 10
    },
});