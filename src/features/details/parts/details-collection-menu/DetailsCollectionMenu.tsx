import React, { useCallback, useEffect, useRef, useState } from "react";
import { Autocomplete, Box, MenuItem, TextField } from "@mui/material";
import { ShowProp } from "../../../../@types";
import { Stack } from "@mui/system";
import Button from "@mui/material/Button";
import { COLORS } from "../../../app/app-theme/theme_const";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import useShowTools from "../../../../hooks/useShowTools";
import useCollectionTools from "../../../../hooks/useCollectionTools";
import { showContainsCollection } from "../../../../utils/collectionUtils";

type MenuProps = {
  onClose: () => void;
} & ShowProp;
export default function DetailsCollectionMenu({ onClose, show }: MenuProps) {
  const [fieldValue, setFieldValue] = useState("");
  const { shows, addShow, updateShows } = useShowTools();
  const { collections, toggleCollection, addCollection } = useCollectionTools();
  const inputFieldRef = useRef<HTMLInputElement>();

  const focusOnField = () => {
    setFieldValue(""); // clears ui field
    inputFieldRef.current?.focus();
  };
  const getFieldValue = () => inputFieldRef.current?.value;
  const doAddCollection = useCallback(() => {
    const value = getFieldValue();
    if (!value || !show) return;
    addCollection(show, value);
    addShow(show);
    focusOnField();
  }, [show, setFieldValue, addShow, updateShows]);
  const doToggleCollection = useCallback(
    (value: string | undefined | null) => {
      if (!value || !show) return;
      toggleCollection(show, value);
      addShow(show);
      focusOnField();
    },
    [show, setFieldValue, addShow, updateShows]
  );
  useEffect(() => {
    inputFieldRef.current?.focus();
  }, []);

  if (!show) return null;

  return (
    <Box minWidth={300} padding={1}>
      <Stack direction="row">
        <Box flexGrow={1}>
          <Autocomplete
            freeSolo
            options={[]}
            selectOnFocus
            clearOnBlur
            handleHomeEndKeys
            value={fieldValue}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add to a collection"
                onKeyDown={(event) => {
                  // only acting on the "enter" key
                  if (event.code.toLowerCase() !== "enter") return;
                  doAddCollection();
                }}
                onChange={(newValue) => {
                  setFieldValue(newValue.target.value);
                }}
                InputProps={{
                  inputRef: inputFieldRef,
                }}
              />
            )}
          />
        </Box>
        <Button
          size="small"
          variant="contained"
          sx={{
            color: COLORS.bg_back,
            // backgroundColor: isSaved ? COLORS.warn : COLORS.callout,
          }}
          onClick={() => doAddCollection()}
        >
          <CheckCircleIcon />
        </Button>
      </Stack>

      {collections.map((collection) => (
        <MenuItemForShow
          onClick={doToggleCollection}
          collection={collection}
          isSelected={showContainsCollection(show, collection)}
          key={collection}
        />
      ))}
    </Box>
  );
}

type MenuItemProps = {
  isSelected: boolean;
  collection: string;
  onClick?: (value: string | undefined | null) => void;
};

function MenuItemForShow({ isSelected, collection, onClick }: MenuItemProps) {
  return (
    <MenuItem onClick={() => onClick && onClick(collection)}>
      <Stack direction={"row"}>
        <Box pr={1} sx={{ width: "2em" }}>
          {isSelected ? <AddCircleIcon /> : null}
        </Box>
        {collection}
      </Stack>
    </MenuItem>
  );
}
