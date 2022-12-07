import { Autocomplete, Box, MenuItem, TextField } from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { ShowProp } from "../../../../@types";
import { Stack } from "@mui/system";
import Button from "@mui/material/Button";
import { COLORS } from "../../../app/apptheme/theme_const";
import MdiIcon from "@mdi/react";
import { mdiCheckCircle as AcceptIcon } from "@mdi/js";
import { showContainsCollection } from "../../../../store/utils/itemUtils";
import useShowTools from "../../../../hooks/useShowTools";
import useCollectionTools from "../../../../hooks/useCollectionTools";

type MenuProps = {
  onClose: () => void;
} & ShowProp;
export default function DetailsCollectionMenu({
  onClose,
  show: withShow,
}: MenuProps) {
  const [fieldValue, setFieldValue] = useState("");
  const { show, shows, addShow, updateShows } = useShowTools(withShow);
  const { collections, showCollections, addCollection } =
    useCollectionTools(show);

  useEffect(
    () => console.log(`[🐽](DetailsCollectionMenu) 🧑‍🤝‍🧑 shows changed!`),
    [shows]
  );
  useEffect(
    () => console.log(`[🐽](DetailsCollectionMenu) collections`, collections),
    [collections]
  );
  useEffect(
    () =>
      console.log(
        `[🐽](DetailsCollectionMenu) showCollections`,
        showCollections
      ),
    [showCollections]
  );
  const doAddCollection = useCallback(
    (value: string | undefined | null) => {
      if (!value || !show) return;
      addCollection(show, value);
      addShow(show);
      setFieldValue(""); // clears ui field
    },
    [show, setFieldValue, addShow, updateShows]
  );

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
                label="Add new collection"
                onKeyDown={(event: any) => {
                  if (event.code.toLowerCase() !== "enter") return;
                  const value = event.target.value as string | undefined;
                  doAddCollection(value);
                }}
                onChange={(newValue) => {
                  setFieldValue(newValue.target.value);
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
        >
          <MdiIcon path={AcceptIcon} size={1} />
        </Button>
      </Stack>

      {collections.map((collection) => (
        <MenuItemForShow
          onClose={onClose}
          collection={collection}
          isSelected={showContainsCollection(show, collection, shows)}
          key={collection}
        />
      ))}
    </Box>
  );
}

type MenuItemProps = {
  isSelected: boolean;
  collection: string;
  onClose?: () => void;
};

function MenuItemForShow({ isSelected, collection, onClose }: MenuItemProps) {
  return (
    <MenuItem onClick={onClose}>
      <Stack direction={"row"}>
        <Box pr={1} sx={{ width: "2em" }}>
          {isSelected ? <MdiIcon path={AcceptIcon} size={1} /> : null}
        </Box>
        {collection}
      </Stack>
    </MenuItem>
  );
}
