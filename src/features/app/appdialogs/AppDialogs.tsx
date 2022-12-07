import useMegaStore from "../../../store/MegaStore";
import SearchDialog from "./searchdialog/SearchDialog";
import DetailsDialog from "./detailsdialog/DetailDialog";

const AppDialogs = () => {
  const isDetailsOpen = useMegaStore((state) => state.isDetailsOpen);

  return (
    <>
      <DetailsDialog isOpen={isDetailsOpen} />
    </>
  );
};
export default AppDialogs;
