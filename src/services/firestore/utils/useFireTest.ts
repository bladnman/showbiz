import { addDoc, collection } from "firebase/firestore";
import { fireDb } from "../firestore";

export default async function useFireTest() {
  try {
    const docRef = await addDoc(collection(fireDb, "users"), {
      first: "Ada",
      last: "Lovelace",
      born: 1815,
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
