import useMegaStore from "../../../store/MegaStore";
import SearchDialog from "./searchdialog/SearchDialog";

const AppDialogs = () => {
  const isSearchMode = useMegaStore((state) => state.isSearchMode);
  const detailItem = useMegaStore((state) => state.detailItem);

  let isSearchOpen,
    isDetailOpen = false;

  // STATE MACHINE for dialogs
  if (isSearchMode) {
    isSearchOpen = true;
  }

  return (
    <>
      <SearchDialog isOpen={isSearchOpen} />
    </>
  );
};
export default AppDialogs;
