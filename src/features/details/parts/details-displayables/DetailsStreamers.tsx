import React from "react";
import { ShowPropOpt } from "@types";
import { Link, Stack, Typography } from "@mui/material";
import Image from "mui-image";
import useStreamInfo from "@services/StreamAPI/useStreamInfo";
import IconPod from "@components/utils/IconPod";
import DoNotDisturbIcon from "@mui/icons-material/DoNotDisturb";

export default function DetailsStreamers({
  show,
  enabled = true,
}: ShowPropOpt & { enabled?: boolean }) {
  const { streamItems, isLoading } = useStreamInfo(enabled, show);

  if (!enabled || isLoading) return null;

  // NONE found
  if (!streamItems?.length) {
    return (
      <IconPod spacing={2}>
        <DoNotDisturbIcon opacity={0.6} />
      </IconPod>
    );
  }

  // SOME
  return (
    <IconPod spacing={2}>
      {streamItems.map((streamItem: StreamItem, idx: number) => (
        <StreamEntry
          streamItem={streamItem}
          key={`${streamItem.name}_${idx}`}
        />
      ))}
    </IconPod>
  );
}

function StreamEntry({ streamItem }: { streamItem: StreamItem }) {
  const renderName = () => {
    if (!streamItem.link) {
      return <Typography>{streamItem.name}</Typography>;
    }
    return (
      <Link target="_externalSite" href={streamItem.link}>
        {streamItem.name}
      </Link>
    );
  };
  const renderType = () => {
    const costIndicator = getCostString(streamItem.type);
    if (!costIndicator) return null;

    return <Typography>{costIndicator}</Typography>;
  };
  const renderLogo = () => {
    if (!streamItem.logo) return null;
    if (streamItem.link) {
      return (
        <Link target="_externalSite" href={streamItem.link}>
          <Image src={streamItem.logo} width={"25px"} />
        </Link>
      );
    }
    return <Image src={streamItem.logo} width={"25px"} />;
  };

  return (
    <Stack direction={"row"} component={"div"} spacing={0.5}>
      {renderLogo()}
      {/*{renderName()}*/}
      {renderType()}
    </Stack>
  );
}

function getCostString(type: string) {
  switch (type) {
    case "buy":
    case "purchase":
      return "$$";
    case "rent":
      return "$";
    default:
      return "";
  }
}
