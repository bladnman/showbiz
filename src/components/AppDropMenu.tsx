import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Autocomplete,
  Box,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import Button from "@mui/material/Button";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PendingIcon from "@mui/icons-material/Pending";

type MenuProps = {
  onToggleValue: (value: string) => void;
  allEqualOrContain: (value: string) => boolean;
  anyEqualOrContain?: (value: string) => boolean;
  placeholder?: string;
  title?: string;
  itemList: string[];
  allowEntry?: boolean;
  autoFocus?: boolean;
};
export default function AppDropMenu(props: MenuProps) {
  const {
    allEqualOrContain,
    anyEqualOrContain,
    onToggleValue,
    itemList,
    allowEntry = false,
    title,
  } = props;

  const handleToggle = useCallback((value: string) => {
    if (value) {
      onToggleValue(value);
    }
  }, []);

  if (!itemList) return null;

  return (
    <Box minWidth={300} padding={1}>
      <MenuTitle title={title} />
      {allowEntry && <MenuEntryField {...props} />}
      {itemList.map((value) => (
        <MenuItemForShow
          onClick={() => handleToggle(value)}
          value={value}
          isSelected={allEqualOrContain(value)}
          isPartiallySelected={Boolean(
            anyEqualOrContain && anyEqualOrContain(value)
          )}
          key={value}
        />
      ))}
    </Box>
  );
}

function MenuTitle({ title }: { title?: string }) {
  if (!title) return null;
  return (
    <Box>
      <Typography variant={"h5"}>{title}</Typography>
    </Box>
  );
}

function MenuEntryField(props: MenuProps) {
  const { onToggleValue, placeholder, autoFocus = false } = props;
  const [fieldValue, setFieldValue] = useState("");
  const inputFieldRef = useRef<HTMLInputElement>();

  // FOCUS on field
  useEffect(() => {
    autoFocus && inputFieldRef.current?.focus();
  }, []);

  const handleAdd = useCallback(() => {
    if (inputFieldRef.current?.value) {
      onToggleValue(inputFieldRef.current.value);
      setFieldValue("");
    }
  }, []);
  return (
    <Stack direction="row" component={"div"}>
      <Box flexGrow={1}>
        <Autocomplete
          freeSolo
          options={[]}
          // selectOnFocus
          // clearOnBlur
          handleHomeEndKeys
          value={fieldValue}
          renderInput={(params) => (
            <TextField
              {...params}
              label={placeholder}
              onKeyDown={(event) => {
                // ENTER KEY - only acting on the "enter" key
                if (event.code.toLowerCase() !== "enter") return;
                if (inputFieldRef.current?.value) {
                  handleAdd();
                }
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
      <Button size="small" variant="contained" onClick={handleAdd}>
        <AddCircleIcon />
      </Button>
    </Stack>
  );
}

type MenuItemProps = {
  isSelected: boolean;
  isPartiallySelected: boolean;
  value: string;
  onClick?: (value: string | undefined | null) => void;
};

function MenuItemForShow({
  isSelected,
  isPartiallySelected = false,
  value,
  onClick,
}: MenuItemProps) {
  const renderIcon = () => {
    return isSelected ? (
      <CheckCircleIcon />
    ) : isPartiallySelected ? (
      <PendingIcon />
    ) : null;
  };
  return (
    <MenuItem onClick={() => onClick && onClick(value)}>
      <Stack direction={"row"}>
        <Box pr={1} sx={{ width: "2em" }}>
          {renderIcon()}
        </Box>
        {value}
      </Stack>
    </MenuItem>
  );
}
