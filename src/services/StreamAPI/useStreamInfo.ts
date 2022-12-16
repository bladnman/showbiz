import { useEffect, useState } from "react";
import { ShowbizItem } from "@types";
import Diary from "@utils/Diary";
import fetchWatchMode from "@services/StreamAPI/fetchWatchMode";
import { getStreamService } from "@services/StreamAPI/utils/streamUtils";
import useCustomData from "@hooks/useCustomData";

const promiseDiary = new Diary(300);

export default function useStreamInfo(
  enabled: boolean,
  show?: ShowbizItem | null
): StreamItem[] | undefined {
  const [streamItems, setStreamItems] = useState<StreamItem[]>();
  const customData = useCustomData(show);


  useEffect(() => {
    if (!enabled || !show) {
      setStreamItems(undefined);
      return;
    }

    // use previous values from customData if available
    // TODO: HERE!
    // I don't want to store this on custom since that
    // data is always valid. Needs to be stored on the
    // show record since it has a TTL.
    if (customData?.streamItems?.length) {
      setStreamItems(customData?.streamItems);
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
  }, [show, enabled, customData]);

  return streamItems;
}
