import React from "react";
import WATCH_STATUS_VALUES from "@watch-status-utils/const";
import { Stack } from "@mui/system";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { ClickEvent, ShowbizItem } from "@types";
import getCustomDataForShow from "@custom-data-utils/getCustomDataForShow";
import { dateFromTimestamp } from "@utils/helpers";
import dayjs from "dayjs";
import setShowsToSelectHold from "@custom-data-utils/setShowsToSelectHold";
import Shim from "@components/Shim";

export default function getWatchStatusMenuItemList(shows: ShowbizItem[]) {
  const handleHoldOptionsClick = (event: ClickEvent) => {
    event.stopPropagation();
    setShowsToSelectHold(shows);
  };
  const holdUntilDateString = getCommonHoldUntilDescription(shows);
  return WATCH_STATUS_VALUES.map((item) => {
    if (item.toLowerCase() === "hold") {
      return {
        value: item,
        component: (
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"space-between"}
            flexGrow={1}
          >
            <Typography flexGrow={1}>{item}</Typography>
            {holdUntilDateString && (
              <Typography variant={"caption"} sx={{ opacity: 0.6 }}>
                {holdUntilDateString}
              </Typography>
            )}
            <Shim width={1} />
            <Button
              variant="outlined"
              onClick={handleHoldOptionsClick}
              sx={{
                opacity: 0.4,
                ":hover": {
                  opacity: 1,
                },
              }}
            >
              <MoreHorizIcon />
            </Button>
          </Stack>
        ),
      };
    }
    return {
      value: item,
    };
  });
}

function getCommonHoldUntilDescription(shows: ShowbizItem[]) {
  if (shows.length === 0) return null;
  if (shows.length === 1) return getShowHoldUntilDescription(shows[0]);

  const descList = shows.map((show) => getShowHoldUntilDescription(show));
  const allSame = allAreEqual(descList);
  if (!allSame) return "multiple";
  return descList[0];
}

function getShowHoldUntilDescription(show: ShowbizItem) {
  const customData = getCustomDataForShow(show);
  if (customData?.holdUntilDate) {
    return dayjs(dateFromTimestamp(customData.holdUntilDate)).format(
      "MMM D, YYYY"
    );
  }
  return null;
}

function allAreEqual(array: any[]) {
  if (array.length === 0) return true;
  return array.every((element) => element === array[0]);
}
