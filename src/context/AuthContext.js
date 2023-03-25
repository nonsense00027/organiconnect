import React, { createContext, useContext, useState, useEffect } from "react";
import { Keyboard } from "react-native";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth, db } from "../configs/firebase/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import * as Location from "expo-location";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [error, setError] = useState(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [granted, setGranted] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      } else {
        setGranted(true);
      }
    })();
  }, [location]);

  useEffect(() => {
    (async () => {
      if (!granted) return;
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, [granted]);

  // signOut(auth);
  const handleError = (err) => {
    switch (err.code) {
      case "auth/invalid-email":
        setError("Invalid email address.");
        break;
      case "auth/wrong-password":
        setError("Invalid password.");
        break;
      case "auth/user-not-found":
        setError("Account not found.");
        break;
      default:
        setError("Something went wrong, please try again.");
    }
  };

  useEffect(() => {
    let subscription;

    try {
      subscription = onAuthStateChanged(auth, async (authUser) => {
        if (authUser) {
          const docRef = doc(db, "users", authUser.uid);
          // const docSnap = await getDoc(docRef);
          // setUser({ id: authUser.uid, ...docSnap.data() });

          onSnapshot(docRef, (doc) => {
            setUser({ id: authUser.uid, ...doc.data() });
            Keyboard.dismiss(0);

            setAuthLoading(false);
          });
        } else {
          setUser(null);
          setAuthLoading(false);
        }
      });
    } catch (error) {
      setAuthLoading(false);
    }

    return () => {
      subscription();
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 3000);
    // Clear timeout if the component is unmounted
    return () => clearTimeout(timer);
  });

  const login = (email, password) => {
    setAuthLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        handleError(error);
        setAuthLoading(false);
      });
  };

  const logout = () => {
    auth().signOut();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        authLoading,
        error,
        location,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
