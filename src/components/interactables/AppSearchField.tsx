import React, { useCallback, useEffect, useMemo, useRef } from "react";
import { TextField } from "@mui/material";
import useWindowFocus from "@hooks/useWindowFocus";
import setSimilarToShow from "@show-utils/setSimilarToShow";
import setSearchQuery from "@search-utils/setSearchQuery";
import debounce from "lodash/debounce";
import { SEARCH_DEBOUNCE_MS } from "@CONST";

type SearchFieldProps = {
  onChange?: (value: string) => void;
};
export default function AppSearchField({ onChange }: SearchFieldProps) {
  const [localSearchQuery, setLocalSearchQuery] = React.useState("");
  const isWindowFocused = useWindowFocus();

  const debouncedChangeHandler = useMemo(
    () =>
      debounce((value: string) => {
        // clear related search
        setSimilarToShow(null);
        setSearchQuery(value);

        // if our owner wanted to hear about changes
        onChange && onChange(value);
      }, SEARCH_DEBOUNCE_MS),
    [onChange]
  );

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
  }, [focusAndSelect, isWindowFocused]);

  return (
    <TextField
      id="search-field"
      label="Search"
      variant="standard"
      value={localSearchQuery || ""}
      onChange={(event) => {
        const newValue = event.target.value;
        setLocalSearchQuery(newValue);
        debouncedChangeHandler(newValue);
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
