import React, { useCallback, useRef } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { firebaseApp } from "../../services/firestore";
import { Box, Button, Card, Typography } from "@mui/material";
import { ymdhms } from "../../utils/MU";

// example:
// https://github.com/csfrequency/react-firebase-hooks/tree/master/firestore#full-example
// firebase console:
// https://console.firebase.google.com/project/fireplay-a798a/firestore/data/~2Fhooks~2F33aIFeiujlhWOS2vraVt
export default function ConnectionRoute() {
  const db = useRef(getFirestore(firebaseApp)).current;
  const [value, loading, error] = useCollection(collection(db, "hooks"), {
    snapshotListenOptions: { includeMetadataChanges: true },
  });
  const addRand = useCallback(() => {
    const groceriesColRef = collection(db, "hooks");
    return addDoc(groceriesColRef, {
      created: serverTimestamp(),
      title: `I was created: ${ymdhms(new Date())}`,
    });
  }, [db]);

  return (
    <div>
      <h4>ConnectionRoute</h4>
      <div>
        <p>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && <span>Collection: Loading...</span>}
          {value && (
            <span>
              Collection:{" "}
              {value.docs.map((doc) => (
                <Box mb={1}>
                  <Card key={doc.id}>
                    <Typography>{doc.data().title}</Typography>
                  </Card>
                </Box>
              ))}
            </span>
          )}
        </p>
        <Button onClick={addRand}>Add Random Document</Button>
      </div>
    </div>
  );
}
