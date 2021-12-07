import React, { createContext, useContext, useEffect, useState } from "react";
import * as Google from "expo-google-app-auth";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "@firebase/auth";
import { auth } from "../firebase";
import { useMemo } from "react";
const AuthContext = createContext({});

const config = {
  androidClientId:
    "698223115909-bj4i3m9d92ip83dgjnotb0kfu7amt3oi.apps.googleusercontent.com",
  iosClientId:
    "698223115909-ugvqcnrpi6lovep9276mlcje7crfn3hr.apps.googleusercontent.com",
  iosStandaloneAppClientId: `698223115909-ugvqcnrpi6lovep9276mlcje7crfn3hr.apps.googleusercontent.com`,
  androidStandaloneAppClientId: `698223115909-bj4i3m9d92ip83dgjnotb0kfu7amt3oi.apps.googleusercontent.com`,
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
  behavior: "web",
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          //loggued in..
          setUser(user);
        } else {
          setUser(null);
        }
        setLoadingInitial(false);
      }),
    []
  );

  const logout = () => {
    setLoading(true);
    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const signInWithGoogle = async () => {
    setLoading(true);

    await Google.logInAsync(config)
      .then(async (logInResult) => {
        if (logInResult.type === "success") {
          const { idToken, accessToken } = logInResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credential);
        }
        return Promise.reject();
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signInWithGoogle,
      logout,
    }),
    [user, loading, error]
  );

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
