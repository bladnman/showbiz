import { TextField } from "@mui/material";
import { useEffect, useRef } from "react";
import useMegaStore from "../store/MegaStore";
import { setSearchQuery } from "../store/utils/searchUtils";

type SearchFieldProps = {
  onChange?: (value: string) => void;
};
export default function SearchField({ onChange }: SearchFieldProps) {
  const searchQuery = useMegaStore((state) => state.searchQuery);
  // const searchType = useMegaStore((state) => state.searchType);

  const handleChanges = useRef((value: string) => {
    setSearchQuery(value);

    // if our owner wanted to hear about changes
    onChange && onChange(value);
  }).current;

  const inputFieldRef = useRef<HTMLInputElement>();

  useEffect(() => {
    inputFieldRef.current?.focus();
  }, []);

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
