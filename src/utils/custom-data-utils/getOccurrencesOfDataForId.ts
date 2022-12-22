import getAllCustomDataList from "@custom-data-utils/getAllCustomDataList";

export default function getOccurrencesOfDataForId(id: number) {
  return getAllCustomDataList().filter((item) => item.id === id);
}
