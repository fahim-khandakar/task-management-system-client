/* eslint-disable react/prop-types */
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import auth from "../firebase/firebase.config";
// import axios from "axios";

export const AuthContext = createContext(null);
const provider = new GoogleAuthProvider();
const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState(null);
  const [photo, setPhoto] = useState(null);

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };

  const createUser = (email, password, name, photo) => {
    setLoading(true);
    setName(name);
    setPhoto(photo);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      // const loggedEmail = currentUser?.email || user?.email;
      // const loggedUser = { email: loggedEmail };

      setUser(currentUser);
      setLoading(false);
      // if (currentUser) {
      //   axios
      //     .post("https://adventures-hub-server.vercel.app/jwt", loggedUser, {
      //       withCredentials: true,
      //     })
      //     .then((res) => res.data);
      // } else {
      //   axios
      //     .post("https://adventures-hub-server.vercel.app/logout", loggedUser, {
      //       withCredentials: true,
      //     })
      //     .then((res) => res.data);
      // }
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authInfo = {
    user,
    name,
    loading,
    signInWithGoogle,
    createUser,
    signIn,
    logOut,
    photo,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
