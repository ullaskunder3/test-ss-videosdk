
import React from "react";
// Customizable Area Start
import { imgPasswordInVisible, imgPasswordVisible } from "./assets";
import { createMeeting } from "./api/api";
// Customizable Area End

export const configJSON = require("./config");

export default class ScreenSharingController extends React.Component{
  // Customizable Area Start

  // Customizable Area End

  constructor(props) {
    super(props);
    // Customizable Area Start

    this.state = {
      txtInputValue: "",
      txtSavedValue: "A",
      enableField: false,
      // Customizable Area Start
      meetingId: "",
      micEnabled: true,
      webcamEnabled: true,
      token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiI0ZGEzMDJiNi0zOWExLTQwMGQtOWRiMS0zYjdiZjkyMjZjMGYiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTY3NzU2NDkwMCwiZXhwIjoxNjc4MTY5NzAwfQ.3Cc2oXSVynfjGXVtzOIYP4p16quYiQg8TknLl8Fqs9Q",
      roomId: "",
      isRoomValidated: "",
      isMeetingJoined: false,
      // Customizable Area End
    };

    // Customizable Area Start
    // Customizable Area End
  }

  async componentDidMount(){
    const {token} = this.state
    const meetId = await createMeeting(this.state)
    console.log("meetID on component did mount", meetId);
    
    this.setState({
      meetingId: meetId
    })
  }
  // Customizable Area End
}
