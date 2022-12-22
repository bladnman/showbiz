import { useMemo } from "react";
import { ShowbizItem } from "../@types";
import getAllShowTypes from "@show-utils/getAllShowTypes";

export default function useShowTypes(shows: ShowbizItem[]) {
  return useMemo(() => {
    return getAllShowTypes(shows);
  }, [shows]);
}
