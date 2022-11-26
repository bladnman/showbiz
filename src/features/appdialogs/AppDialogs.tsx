import useMegaStore from "../../store/MegaStore";
import DetailDialog from "./detailsdialog/DetailDialog";
import SearchDialog from "./searchdialog/SearchDialog";

const AppDialogs = () => {
  const isSearchMode = useMegaStore((state) => state.isSearchMode);
  const detailItem = useMegaStore((state) => state.detailItem);

  let isSearchOpen,
    isDetailOpen = false;

  // STATE MACHINE for dialogs
  if (!!detailItem) {
    isDetailOpen = true;
  } else if (isSearchMode) {
    isSearchOpen = true;
  }

  return (
    <>
      <DetailDialog isOpen={isDetailOpen} />
      <SearchDialog isOpen={isSearchOpen} />
    </>
  );
};
export default AppDialogs;
