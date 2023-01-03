import { useEffect, useMemo, useState } from "react";
import { ShowbizItem } from "@types";
import Diary from "@utils/Diary";
import fetchWatchMode from "@services/StreamAPI/fetchWatchMode";
import useShowTools from "@/hooks/useShowTools";
import updateShow from "@show-utils/updateShow";

const promiseDiary = new Diary(300);

export default function useStreamInfo(
  enabled: boolean,
  show?: ShowbizItem | null
) {
  const [isLoading, setIsLoading] = useState(false);
  const [streamItems, setStreamItems] = useState<StreamItem[]>();
  const { updateShow } = useShowTools();

  useEffect(() => {
    if (!enabled || !show) {
      setStreamItems(undefined);
      setIsLoading(false);
      return;
    }

    // use previous values from customData if available
    if (show.streamItems?.length) {
      setStreamItems(show.streamItems);
      setIsLoading(false);
      return;
    }

    // time to do the pull
    const doFetch = async () => {
      setIsLoading(true);
      const watchModePromise = promiseDiary.readOrWrite(
        `watchMode__${show.id}`,
        () => fetchWatchMode(show)
      );

      const [watchModeResults] = await Promise.all([watchModePromise]);

      // put items on show
      show.streamItems = watchModeResults as StreamItem[];
      await updateShow(show); // only updates if a saved show

      // save to state (for re-render)
      setStreamItems(show.streamItems);

      setIsLoading(false);
    };
    doFetch().catch();
  }, [show, enabled, updateShow, setIsLoading]);

  return useMemo(() => {
    return {
      isLoading,
      streamItems,
    };
  }, [isLoading, streamItems]);
}
