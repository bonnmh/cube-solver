import { Dimensions, StyleSheet } from "react-native";

export const { width: WIDTH, height: HEIGHT } = Dimensions.get("window");
export const SPACER = 24;
export const ITEM_WIDTH = (WIDTH - SPACER * 2) / 4;
export const ITEM_BTN_WIDTH = (WIDTH - SPACER * 3) / 3;

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
  },
  containerFaces: {
    alignItems: "center",
    paddingVertical: 10,
  },
  container1: {
    flex: 1,
    paddingTop: SPACER,
  },
  containerPermission: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  button: {
    width: ITEM_BTN_WIDTH,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    backgroundColor: "#ccc",
    paddingVertical: SPACER / 2,
  },
  face: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderWidth: 1,
    borderColor: "purple",
  },
  miniFace: {
    width: ITEM_WIDTH * 0.7,
    height: ITEM_WIDTH * 0.7,
  },
  border: {
    borderWidth: 1,
    borderColor: "white",
  },
  mainFace: {},
  containerContentPopup: {
    backgroundColor: "white",
    padding: SPACER / 2,
    borderRadius: 4,
  },
  containerWrapperPopup: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: SPACER,
  },
  popupItem: {
    alignItems: "center",
    padding: 3,
  },
  imgPopupItem: {
    width: 32,
    height: 54.8,
  },
  containerLoadingPage: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    alignItems: "center",
    justifyContent: "center",
  },
  containerBtns: {
    width: "100%",
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: SPACER,
  },
});
