import {
  getAuth,
  GoogleAuthProvider,
  isSignInWithEmailLink,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { app } from "../Providers/FirebaseProvider";
import { logEventToAnalytics } from "./AnalyticsHelper";
import { getDocument, setDocument, setUserDocumentData } from "./FirestoreHelper";

export const auth = getAuth(app);
auth.languageCode = "fr";
const provider = new GoogleAuthProvider();

auth.onAuthStateChanged((user) => {
  if (user)
    getDocument("/users/" + user.uid).then((res) => {
      if (res.data()) {
        let user = res.data();
        user.path = res.ref.path;
        user.id = res.id;
        setUserDocumentData(user);
      }
    });
});

export function signInWithGoogle() {
  return new Promise((resolve, reject) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        const isFirstLogin = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
        if (isFirstLogin) {
          logEventToAnalytics("sign_up", { method: "google", email: result.user.email });
          setDocument("/users/" + result.user.uid, { displayName: result.user.displayName, email: result.user.email });
        }

        // The signed-in user info.
        resolve(result.user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData?.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);

        console.error("Error Code : " + errorCode);
        console.error(errorMessage);
        console.error("Email : " + email);

        reject(error);
      });
  });
}

export function sendSignInLink(email) {
  return new Promise((resolve, reject) => {
    const actionCodeSettings = {
      url: window.location.origin,
      handleCodeInApp: true,
    };
    sendSignInLinkToEmail(auth, email, actionCodeSettings)
      .then(() => {
        window.localStorage.setItem("emailForSignIn", email);
        resolve();
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        reject(error);
      });
  });
}

export function signInLink(email) {
  return new Promise((resolve, reject) => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      signInWithEmailLink(auth, email, window.location.href)
        .then((result) => {
          localStorage.removeItem("emailForSignIn");
          const isFirstLogin = result.user.metadata.creationTime === result.user.metadata.lastSignInTime;
          if (isFirstLogin) {
            logEventToAnalytics("sign_up", { method: "email_link", email: result.user.email });
          }
          resolve(result.user);
        })
        .catch((error) => {
          reject(error);
        });
    } else {
      reject();
    }
  });
}

export function LogOut() {
  return new Promise((resolve, reject) => {
    signOut(auth).then(resolve).catch(reject);
  });
}

export function isUserLoged() {
  return auth.currentUser !== null && auth.currentUser !== undefined;
}
