import WATCH_STATUS_VALUES from "@watch-status-utils/const";

export default function sortAccordingToConstant(list: string[]): string[] {
  return list.sort(
    (a, b) => WATCH_STATUS_VALUES.indexOf(a) - WATCH_STATUS_VALUES.indexOf(b)
  );
}
