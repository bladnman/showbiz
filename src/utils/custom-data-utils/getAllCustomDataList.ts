import useMegaStore from "@store/MegaStore";

export default function getAllCustomDataList() {
  return useMegaStore.getState().customDataList;
}
