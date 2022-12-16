import { useEffect, useState } from "react";
import { ShowbizItem } from "@types";
import Diary from "@utils/Diary";
import fetchWatchMode from "@services/StreamAPI/fetchWatchMode";
import useShowTools from "@/hooks/useShowTools";

const promiseDiary = new Diary(300);

export default function useStreamInfo(
  enabled: boolean,
  show?: ShowbizItem | null
): StreamItem[] | undefined {
  const [streamItems, setStreamItems] = useState<StreamItem[]>();
  const { updateShowInCloud } = useShowTools();

  useEffect(() => {
    if (!enabled || !show) {
      setStreamItems(undefined);
      return;
    }

    // use previous values from customData if available
    if (show.streamItems?.length) {
      setStreamItems(show.streamItems);
      return;
    }

    // time to do the pull
    const doFetch = async () => {
      const watchModePromise = promiseDiary.readOrWrite(
        `watchMode__${show.id}`,
        () => fetchWatchMode(show)
      );

      const [watchModeResults] = await Promise.all([watchModePromise]);

      // put items on show
      show.streamItems = watchModeResults as StreamItem[];
      updateShowInCloud(show); // only updates if a saved show

      // save to state (for re-render)
      setStreamItems(show.streamItems);
    };
    doFetch().catch();
  }, [show, enabled]);

  return streamItems;
}
