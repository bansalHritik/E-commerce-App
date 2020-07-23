import { StatusBar, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ebebeb",
    paddingTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#101010",
    fontSize: 24,
    fontWeight: "bold",
  },
  buttonContainer: {
    backgroundColor: "#222",
    borderRadius: 5,
    padding: 10,
    margin: 20,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  formContainer: {
    flex: 1,
    padding: 20,
  },
  formItem: {
    marginTop: 10,
  },
  formButton: {
    marginVertical: 20,
  },
  mainCards: {
    paddingVertical: 15,
  },
  featureText: {
    padding: 5,
    borderRadius: 5,
    borderColor: "#afafaf",
    borderWidth: 0.5,
    margin: 5
  },
  featureContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    backgroundColor: "white",
    borderBottomWidth:0.25,
  }
});
