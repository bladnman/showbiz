import { getFirestore, collection } from "firebase/firestore";
import { useMemo, useRef } from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { firebaseApp } from "../../../services/firestore";

export default function useItems() {
  const db = useRef(getFirestore(firebaseApp)).current;
  const [value, loading, error] = useCollection(collection(db, "items"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });

  const items = useMemo(() => value?.docs ?? [], [value]);
  return {
    items,
    loading,
    error,
  };
}
