import React from "react";
import useMegaStore from "../../../store/MegaStore";
import RenameCollectionDialog from "@features/app/app-dialogs/rename-collection-dialog/RenameCollectionDialog";
import SelectHoldDialog from "@features/app/app-dialogs/select-hold-dialog/SelectHoldDialog";

const LazyDetailsDialog = React.lazy(
  () => import("./details-dialog/DetailDialog")
);

const AppDialogs = () => {
  const isDetailsOpen = useMegaStore((state) => state.isDetailsOpen);
  const showsToSelectHold = useMegaStore((state) => state.showsToSelectHold);
  const isRenameCollectionOpen = !!useMegaStore(
    (state) => state.collectionToRename
  );

  return (
    <>
      <LazyDetailsDialog isOpen={isDetailsOpen} />
      <RenameCollectionDialog isOpen={isRenameCollectionOpen} />
      <SelectHoldDialog isOpen={!!showsToSelectHold} />
    </>
  );
};
export default AppDialogs;
