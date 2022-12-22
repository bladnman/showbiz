import { CustomDataItem } from "@types";
import { fire_saveCustomData } from "@services/firestore/utils/fire_utils";
import markCustomDataListAsChanged from "@custom-data-utils/markCustomDataListAsChanged";

export default async function finalSaveCustomData(
  customData: CustomDataItem | null
) {
  if (!customData) return;
  await fire_saveCustomData(customData);
  markCustomDataListAsChanged();
}
