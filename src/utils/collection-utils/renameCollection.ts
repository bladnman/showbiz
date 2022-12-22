import getAllCustomDataList from "@custom-data-utils/getAllCustomDataList";
import finalSaveCustomData from "@custom-data-utils/finalSaveCustomData";

export default async function renameCollection(
  oldCollectionName: string,
  newCollectionName: string,
  doCloudSave = true
) {
  // we need to go through ALL custom data
  const customDataList = getAllCustomDataList(); // we do really need ALL (including non-active)

  const savePromises: Promise<void>[] = [];
  customDataList.forEach((customData) => {
    const set = new Set<string>(customData.collections);
    if (set.has(oldCollectionName.toLowerCase())) {
      set.delete(oldCollectionName.toLowerCase());
      set.add(newCollectionName.toLowerCase());
      customData.collections = Array.from(set).sort();
      if (doCloudSave) {
        savePromises.push(finalSaveCustomData(customData));
      }
    }
  });
  await Promise.all(savePromises);
}
