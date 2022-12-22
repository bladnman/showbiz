import React, { useCallback, useEffect } from "react";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Menu } from "@mui/material";
import AppDropMenu from "@components/AppDropMenu";
import useMegaStore from "@store/MegaStore";
import useCollectionTools from "@hooks/useCollectionTools";
import AppDropButton from "@/components/AppDropButton";
import showContainsCollection from "@collection-utils/showContainsCollection";
import addShow from "@show-utils/addShow";

export default function SelectionCollections() {
  const selectedShows = useMegaStore((state) => state.selectedShows);
  const anySelected = selectedShows.length > 0;
  const { collections, toggleCollection } = useCollectionTools();

  const popupState = usePopupState({
    variant: "popover",
    popupId: "ctaOverflowMenu",
  });

  //
  // CLOSE POPUPS WHEN NOTHING SELECTED
  useEffect(() => {
    !anySelected && popupState.close();
  }, [anySelected]);

  //
  // HANDLERS
  const onToggleValue = useCallback(
    (value: string | undefined | null) => {
      if (!value) return;

      // change values on all selected shows
      selectedShows.forEach((show) => toggleCollection(show, value));

      // update the selected show list in case
      // something has fallen out of the current filter
    },
    [addShow, toggleCollection, selectedShows]
  );
  const allEqualOrContain = useCallback(
    (value: string) => {
      return selectedShows.every((show) => showContainsCollection(show, value));
    },
    [collections, selectedShows]
  );

  const anyEqualOrContain = useCallback(
    (value: string) => {
      return selectedShows.some((show) => showContainsCollection(show, value));
    },
    [collections, selectedShows]
  );

  return (
    <>
      <AppDropButton
        isOpen={popupState.isOpen}
        {...bindTrigger(popupState)}
        disabled={!anySelected}
      >
        <LocalOfferIcon fontSize="medium" />
      </AppDropButton>

      <Menu {...bindMenu(popupState)}>
        <AppDropMenu
          onToggleValue={onToggleValue}
          allEqualOrContain={allEqualOrContain}
          anyEqualOrContain={anyEqualOrContain}
          itemList={collections}
          allowEntry={true}
          title={"Collections"}
        />
      </Menu>
    </>
  );
}
