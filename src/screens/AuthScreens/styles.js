import { StyleSheet } from "react-native";

import Colors from "../../shared/theme/Colors";
import Texts from "../../shared/theme/Texts";

export default StyleSheet.create({
  login: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flex: 1,
    paddingTop: 20,
  },
  login__header: {},
  login__title: {
    textAlign: "center",
    fontSize: Texts.title,
    color: "black",
    fontFamily: "Roboto-Bold",
  },
  login__formTextInput: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: Colors.input,
    borderRadius: 12,
    marginBottom: 10,
    fontSize: 14,
  },
  login__button: {
    marginTop: 10,
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 17,
    borderRadius: 38,
  },
  login__buttonDisabled: {
    backgroundColor: Colors.input,
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderRadius: 38,
  },
  login__buttonLabel: {
    textAlign: "center",
    textTransform: "uppercase",
    color: "#fff",
    fontWeight: "bold",
    // fontSize: 16,
  },
  login__forgot: {
    marginTop: 20,
  },
  login__forgotText: {
    textAlign: "center",
  },
  login__error: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    height: 20,
    marginBottom: 10,
  },
  login__errorText: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    color: "#ff3333",
    marginBottom: 20,
    textAlign: "center",
  },
  login__registerButton: {
    marginTop: 10,
  },
  login__signup: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
  },
  login__signupButtonText: {
    textTransform: "uppercase",
    color: Colors.primary,
    marginLeft: 3,
    fontWeight: "bold",
  },

  // REGISTER

  //   register: {
  //     backgroundColor: "#fff",
  //     padding: 10,
  //     flex: 1,
  //   },
  register: {
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flex: 1,
    justifyContent: "center",
    paddingTop: 20,
  },
  register__section: {
    marginVertical: 10,
  },
  register__picker: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    marginVertical: 4,
  },
});
