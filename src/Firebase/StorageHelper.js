import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "../Providers/FirebaseProvider";

const storage = getStorage(app);

export function uploadImageToStorage(file) {
  return new Promise((resolve, reject) => {
    uploadBytes(ref(storage, "/images/" + file.name), file)
      .then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);
        resolve(downloadURL);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
