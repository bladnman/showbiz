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

export type AppMenuValueItem = {
  value: string;
  title?: string;
  component?: React.ReactNode;
};
type AppMenuProps = {
  onToggleValue: (valueItem: AppMenuValueItem) => void;
  allEqualOrContain: (valueItem: AppMenuValueItem) => boolean;
  anyEqualOrContain?: (valueItem: AppMenuValueItem) => boolean;
  placeholder?: string;
  title?: string;
  itemList: AppMenuValueItem[];
  allowEntry?: boolean;
  autoFocus?: boolean;
};
export default function AppDropMenu(props: AppMenuProps) {
  const {
    allEqualOrContain,
    anyEqualOrContain,
    onToggleValue,
    itemList,
    allowEntry = false,
    title,
  } = props;

  const handleToggle = useCallback(
    (valueItem: AppMenuValueItem) => {
      if (valueItem) {
        onToggleValue(valueItem);
      }
    },
    [onToggleValue]
  );

  if (!itemList) return null;

  return (
    <Box minWidth={300} padding={1}>
      <MenuTitle title={title} />
      {allowEntry && <MenuEntryField {...props} />}
      {itemList.map((valueItem) => (
        <MenuItemForShow
          onClick={() => handleToggle(valueItem)}
          valueItem={valueItem}
          isSelected={allEqualOrContain(valueItem)}
          isPartiallySelected={Boolean(
            anyEqualOrContain && anyEqualOrContain(valueItem)
          )}
          key={valueItem.value}
        />
      ))}
    </Box>
  );
}

type MenuItemProps = {
  isSelected: boolean;
  isPartiallySelected: boolean;
  valueItem: AppMenuValueItem;
  onClick?: (value: AppMenuValueItem | undefined | null) => void;
};

function MenuItemForShow({
  isSelected,
  isPartiallySelected = false,
  valueItem,
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
    <MenuItem onClick={() => onClick && onClick(valueItem)}>
      <Stack direction={"row"} flexGrow={1} alignItems="center">
        <Box pr={1} sx={{ width: "2em", height: "1.7em" }}>
          {renderIcon()}
        </Box>
        {valueItem.component ?? valueItem.title ?? valueItem.value}
      </Stack>
    </MenuItem>
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

function MenuEntryField(props: AppMenuProps) {
  const { onToggleValue, placeholder, autoFocus = false } = props;
  const [fieldValue, setFieldValue] = useState("");
  const inputFieldRef = useRef<HTMLInputElement>();

  // FOCUS on field
  useEffect(() => {
    autoFocus && inputFieldRef.current?.focus();
  }, [autoFocus]);

  const handleAdd = useCallback(() => {
    if (inputFieldRef.current?.value) {
      onToggleValue({ value: inputFieldRef.current.value });
      setFieldValue("");
    }
  }, [onToggleValue]);
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
