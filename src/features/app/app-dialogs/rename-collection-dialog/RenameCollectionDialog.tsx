import React, { useCallback, useRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { setSearchMode } from "@utils/appUtils";
import useMegaStore from "@store/MegaStore";
import {
  clearCollectionToRename,
  renameCollection,
} from "@utils/collectionUtils";

export default function RenameCollectionDialog({
  isOpen = false,
}: {
  isOpen: boolean;
}) {
  const collectionToRename = useMegaStore((state) => state.collectionToRename);
  const handleClose = useRef(() => {
    clearCollectionToRename();
  }).current;
  const inputFieldRef = useRef<HTMLInputElement>();

  // FOCUS on field
  // useEffect(() => {
  //   inputFieldRef.current?.focus();
  // }, []);

  const handleRename = useCallback(() => {
    const newValue = inputFieldRef.current?.value;

    if (newValue && collectionToRename && collectionToRename !== newValue) {
      renameCollection(collectionToRename, newValue);
      clearCollectionToRename();
    }
  }, [collectionToRename]);
  return (
    <Dialog onClose={handleClose} open={isOpen}>
      <DialogTitle>Rename collection</DialogTitle>
      <DialogContent sx={{ width: "300px" }}>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Collection Name"
          fullWidth
          variant="standard"
          defaultValue={collectionToRename}
          InputProps={{
            inputRef: inputFieldRef,
          }}
          onKeyDown={(event) => {
            // ENTER KEY - only acting on the "enter" key
            if (event.code.toLowerCase() !== "enter") return;
            if (inputFieldRef.current?.value) {
              handleRename();
            }
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleRename}>Rename</Button>
      </DialogActions>
    </Dialog>
  );
}
