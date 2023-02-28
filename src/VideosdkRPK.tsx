import { NativeModules, NativeEventEmitter,Platform, EventSubscriptionVendor } from "react-native";

class VideosdkRPK extends NativeEventEmitter {
  startBroadcast: any;
  constructor(nativeModule: EventSubscriptionVendor | any) {
    super(nativeModule);
    this.startBroadcast = Platform.OS === "ios" ? nativeModule.startBroadcast : null
  }
}

export default new VideosdkRPK(NativeModules.VideosdkRPK);
