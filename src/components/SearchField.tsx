import { TextField } from "@mui/material";
import { lowerCase } from "lodash";
import { useRef } from "react";
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

  return (
    <TextField
      id="search-field"
      label="Search"
      variant="outlined"
      value={searchQuery || ""}
      onChange={(event) => {
        const newValue = event.target.value;
        handleChanges(newValue);
      }}
    />
  );
}
