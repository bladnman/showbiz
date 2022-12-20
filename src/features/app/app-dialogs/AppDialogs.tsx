import React from "react";
import useMegaStore from "../../../store/MegaStore";
import RenameCollectionDialog from "@features/app/app-dialogs/rename-collection-dialog/RenameCollectionDialog";

const LazyDetailsDialog = React.lazy(
  () => import("./details-dialog/DetailDialog")
);

const AppDialogs = () => {
  const isDetailsOpen = useMegaStore((state) => state.isDetailsOpen);
  const isRenameCollectionOpen = !!useMegaStore(
    (state) => state.collectionToRename
  );

  return (
    <>
      <LazyDetailsDialog isOpen={isDetailsOpen} />
      <RenameCollectionDialog isOpen={isRenameCollectionOpen} />
    </>
  );
};
export default AppDialogs;
