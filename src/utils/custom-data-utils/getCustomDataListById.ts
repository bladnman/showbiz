import getAllCustomDataList from "@custom-data-utils/getAllCustomDataList";

export default function getCustomDataListById(id: number) {
  const customDataList = getAllCustomDataList();
  return customDataList.filter((item) => item.id === id);
}
