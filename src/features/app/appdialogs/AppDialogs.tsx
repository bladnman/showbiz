import React from "react";
import useMegaStore from "../../../store/MegaStore";

const LazyDetailsDialog = React.lazy(
  () => import("./detailsdialog/DetailDialog")
);

const AppDialogs = () => {
  const isDetailsOpen = useMegaStore((state) => state.isDetailsOpen);

  return (
    <>
      <LazyDetailsDialog isOpen={isDetailsOpen} />
    </>
  );
};
export default AppDialogs;
