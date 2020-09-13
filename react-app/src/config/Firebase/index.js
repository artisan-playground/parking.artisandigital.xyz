import firebase from "firebase";
import "firebase/storage";
import config from "./config";

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
const storage = firebase.storage();
const auth = firebase.auth();

export { storage, auth, firebase };
