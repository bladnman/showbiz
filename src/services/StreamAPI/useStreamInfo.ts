import { useEffect, useState } from "react";
import { ShowbizItem } from "@types";
import Diary from "@utils/Diary";
import fetchWatchMode from "@services/StreamAPI/fetchWatchMode";
import { getStreamService } from "@services/StreamAPI/utils/streamUtils";

const promiseDiary = new Diary(300);

export default function useStreamInfo(
  enabled: boolean,
  show?: ShowbizItem | null
): StreamItem[] | undefined {
  const [streamItems, setStreamItems] = useState<StreamItem[]>();

  useEffect(() => {
    if (!enabled || !show) {
      setStreamItems(undefined);
      return;
    }

    // time to do the pull
    const doFetch = async () => {
      // const streamAvailabilityPromise = promiseDiary.readOrWrite(
      //   `streamAvailability__${show.id}`,
      //   () => fetchStreamAvailability(show)
      // );
      //
      // const ottDetailsPromise = promiseDiary.readOrWrite(
      //   `ottDetails__${show.id}`,
      //   () => fetchOttDetails(show)
      // );
      //
      const watchModePromise = promiseDiary.readOrWrite(
        `watchMode__${show.id}`,
        () => fetchWatchMode(show)
      );

      // BEST
      // const streamlineWatchPromise = promiseDiary.readOrWrite(
      //   `streamlineWatch__${show.id}`,
      //   () => fetchStreamlineWatch(show)
      // );

      const [
        // streamAvailabilityResults,
        // ottDetailsResults,
        watchModeResults,
        // streamlineWatchResults,
      ] = await Promise.all([
        // streamAvailabilityPromise,
        // ottDetailsPromise,
        watchModePromise,
        // streamlineWatchPromise,
      ]);

      // console.log(`🐽 streamAvailabilityResults`, streamAvailabilityResults);
      // console.log(`🐽 fetchedOTTInfo`, ottDetailsResults);
      console.log(`🐽 watchModeResults`, watchModeResults);
      // console.log(`🐽 streamlineWatchResults`, streamlineWatchResults);

      setStreamItems(watchModeResults as StreamItem[]);
    };
    doFetch().catch();
  }, [show, enabled]);

  return streamItems;
}
