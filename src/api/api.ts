import { Alert } from "react-native"
// @ts-ignore
const API_BASE_URL: string = "https://api.videosdk.live/v2"
const VIDEOSDK_TOKEN: string | null = null

export const createMeeting = async ({ token }: { token: string }) => {
  const url = `${API_BASE_URL}/rooms`
  const options = {
    method: "POST",
    headers: { Authorization: token, "Content-Type": "application/json" },
    body: JSON.stringify({
      token: token,
    }),
  }

  try {
    const res = await fetch(url, options)
      .then((response) => response.json())
      .catch((error) =>  Alert.alert("error", error))
    if (res.statusCode === 401) {
      Alert.alert(JSON.stringify(res.error))
    }
    console.log("meeting ID", res);
    
    return res.roomId
  } catch (error: any) {
    Alert.alert(JSON.stringify(error))
  }
}

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
