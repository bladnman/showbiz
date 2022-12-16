import React from "react";
import { ShowPropOpt } from "@types";
import { Link, Stack, Typography } from "@mui/material";
import useStreamInfo from "@services/StreamAPI/useStreamInfo";

export default function DetailsStreamers({
  show,
  enabled = true,
}: ShowPropOpt & { enabled?: boolean }) {
  const streamItems = useStreamInfo(enabled, show);

  if (!enabled || !streamItems?.length) return null;
  console.log(`[🐽](DetailsStreamers) streamItems`, streamItems);
  return (
    <Stack direction={"row"} component={"div"} spacing={3}>
      {streamItems.map((streamItem: StreamItem, idx: number) => (
        <StreamEntry
          streamItem={streamItem}
          key={`${streamItem.name}_${idx}`}
        />
      ))}
    </Stack>
  );
}

function StreamEntry({ streamItem }: { streamItem: StreamItem }) {
  const isPay = ["buy", "purchase", "rent"].includes(streamItem.type);
  const title = streamItem.name + (isPay ? " ($)" : "");
  if (!streamItem.link) {
    return <Typography>{title}</Typography>;
  }
  return (
    <Link target="externalSite" href={streamItem.link}>
      {title}
    </Link>
  );
}
