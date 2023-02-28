import { Alert } from "react-native"
// @ts-ignore
const API_BASE_URL: string = "https://api.videosdk.live/v2"

// API call to create meeting
export const createMeeting = async ({ token }) => {
  const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
    method: "POST",
    headers: {
      authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const { roomId } = await res.json();
  return roomId;
};

export const validateMeeting = async ({
  meetingId,
  token,
}: {
  meetingId: string
  token: string
}) => {
  const url = `${API_BASE_URL}/validateMeeting`
  const options = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      token: token,
      meetingId: meetingId,
    }),
  }

  try {
    const result = await fetch(url, options)
    let res = await result.json() //result will have meeting id
    return res ? res.meetingId === meetingId : false
  } catch (error) {
    Alert.alert("meeting is not valid")
  }
}
