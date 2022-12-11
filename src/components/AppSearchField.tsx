import React, { useCallback } from "react";
import { TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import useMegaStore from "../store/MegaStore";
import { setSearchQuery } from "../utils/searchUtils";
import { setSimilarToShow } from "../utils/itemUtils";
import useWindowFocus from "../hooks/useWindowFocus";

type SearchFieldProps = {
  onChange?: (value: string) => void;
};
export default function AppSearchField({ onChange }: SearchFieldProps) {
  const searchQuery = useMegaStore((state) => state.searchQuery);
  const isWindowFocused = useWindowFocus();

  const handleChanges = useRef((value: string) => {
    // clear related search
    setSimilarToShow(null);
    setSearchQuery(value);

    // if our owner wanted to hear about changes
    onChange && onChange(value);
  }).current;

  const inputFieldRef = useRef<HTMLInputElement>();

  // focus on mount
  useEffect(() => {
    inputFieldRef.current?.focus();
  }, []);

  // focus and select function
  const focusAndSelect = useCallback(() => {
    if (!inputFieldRef.current) return;
    inputFieldRef.current.focus();
    inputFieldRef.current.select();
  }, []);

  // focus on window focus
  useEffect(() => {
    if (isWindowFocused) {
      focusAndSelect();
    }
  }, [isWindowFocused]);

  return (
    <TextField
      id="search-field"
      label="Search"
      variant="standard"
      value={searchQuery || ""}
      onChange={(event) => {
        const newValue = event.target.value;
        handleChanges(newValue);
      }}
      sx={{
        width: "100%",
      }}
      InputProps={{
        inputRef: inputFieldRef,
      }}
    />
  );
}
