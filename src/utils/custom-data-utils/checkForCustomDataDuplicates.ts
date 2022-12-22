import getDuplicateItemIds from "@custom-data-utils/getDuplicateItemIds";

let _dedupe_check_called = false;

export default function checkForCustomDataDuplicates() {
  if (_dedupe_check_called) return;
  _dedupe_check_called = true;
  const dupeIds = getDuplicateItemIds();
  if (dupeIds.size > 0) {
    console.warn(
      `There are ${dupeIds.size} duplicate items in the custom data list.`
    );
    console.log(dupeIds);
  }
}
