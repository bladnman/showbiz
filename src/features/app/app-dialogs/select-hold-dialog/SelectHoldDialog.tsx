import React, { useCallback, useEffect, useRef } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  TextField,
} from "@mui/material";
import useMegaStore from "@store/MegaStore";
import setShowsToSelectHold from "@custom-data-utils/setShowsToSelectHold";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import { Stack } from "@mui/system";
import Shim from "@components/Shim";
import Typography from "@mui/material/Typography";
import setHoldUntilForShow from "@watch-status-utils/setHoldUntilForShow";
import useBreakSize from "@utils/useBreakSize";
import getCustomDataForShow from "@custom-data-utils/getCustomDataForShow";
import { dateFromTimestamp } from "@utils/helpers";

export default function SelectHoldDialog({
  isOpen = false,
}: {
  isOpen: boolean;
}) {
  const [selectedDate, setSelectedDate] = React.useState<Dayjs>(
    dayjs().add(1, "week")
  );
  const showsToSelectHold = useMegaStore((state) => state.showsToSelectHold);
  const { isXs } = useBreakSize();

  useEffect(() => {
    // use any show's holdUntil as the default date
    if (showsToSelectHold?.length === 1) {
      const customData = getCustomDataForShow(showsToSelectHold[0]);
      if (customData?.holdUntilDate) {
        setSelectedDate(dayjs(dateFromTimestamp(customData.holdUntilDate)));
        return;
      }
    }

    // all other cases select a week out
    selectedDate && setSelectedDate(dayjs().add(1, "week"));
  }, [showsToSelectHold]);

  const handleClose = useRef(() => {
    setShowsToSelectHold(null);
  }).current;

  const handleSave = useCallback(() => {
    if (!showsToSelectHold || showsToSelectHold.length < 1) return;

    showsToSelectHold.forEach((show) => {
      setHoldUntilForShow(show, selectedDate.toDate()).catch();
    });
    setShowsToSelectHold(null);
  }, [showsToSelectHold, selectedDate]);

  return (
    <Dialog onClose={handleClose} open={isOpen} fullScreen={isXs}>
      <DialogTitle>Hold Until</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Select a date to hold the selected shows until. This is purely a
          visual cue to help you remember when you want to check up on the show
          again.
        </DialogContentText>
        <Shim height={2} />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <Stack
            direction={isXs ? "column" : "row"}
            spacing={3}
            justifyContent={"center"}
            alignItems={isXs ? "flex-start" : "center"}
          >
            <Stack direction="column" alignItems={isXs ? "center" : "flex-end"}>
              <Shim height={2} />
              <Typography variant={"h6"}>Quick Picks</Typography>
              <Shim height={1} />
              <Button onClick={() => setSelectedDate(dayjs().add(1, "day"))}>
                Tomorrow
              </Button>
              <Divider flexItem={true} sx={{ marginY: "10px" }} />
              <Button
                onClick={() => setSelectedDate(selectedDate.add(1, "month"))}
              >
                One month
              </Button>
              <Button
                onClick={() => setSelectedDate(selectedDate.add(2, "month"))}
              >
                Two months
              </Button>
              <Button
                onClick={() => setSelectedDate(selectedDate.add(3, "month"))}
              >
                Three months
              </Button>
              <Button
                onClick={() => setSelectedDate(selectedDate.add(6, "month"))}
              >
                Six months
              </Button>
              <Button
                onClick={() => setSelectedDate(selectedDate.add(9, "month"))}
              >
                Nine months
              </Button>
            </Stack>
            <StaticDatePicker
              displayStaticWrapperAs="desktop"
              // openTo="year"
              value={selectedDate}
              onChange={(newValue) => {
                newValue && setSelectedDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Stack>
          <Shim height={2} />
          <Stack direction={"row"} justifyContent={"flex-end"}>
            <Typography
              variant={"caption"}
              sx={{ opacity: 0.6, marginRight: 2 }}
            >
              Hold until:
            </Typography>
            <Typography variant={"caption"}>
              {selectedDate.format("LL")}
            </Typography>
          </Stack>
        </LocalizationProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSave}>Save Date</Button>
      </DialogActions>
    </Dialog>
  );
}

function _dayjs_add_days(dayjsDate: Dayjs, days: number) {
  return dayjsDate.add(days, "day");
}
