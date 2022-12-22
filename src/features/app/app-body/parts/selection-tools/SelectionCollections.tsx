import React, { useCallback, useEffect, useMemo } from "react";
import {
  bindMenu,
  bindTrigger,
  usePopupState,
} from "material-ui-popup-state/hooks";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { Menu } from "@mui/material";
import AppDropMenu, { AppMenuValueItem } from "@components/AppDropMenu";
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
    (valueItem: AppMenuValueItem | undefined | null) => {
      if (!valueItem) return;

      // change values on all selected shows
      selectedShows.forEach((show) => toggleCollection(show, valueItem.value));

      // update the selected show list in case
      // something has fallen out of the current filter
    },
    [addShow, toggleCollection, selectedShows]
  );
  const allEqualOrContain = useCallback(
    (valueItem: AppMenuValueItem) => {
      return selectedShows.every((show) =>
        showContainsCollection(show, valueItem.value)
      );
    },
    [collections, selectedShows]
  );

  const anyEqualOrContain = useCallback(
    (valueItem: AppMenuValueItem) => {
      return selectedShows.some((show) =>
        showContainsCollection(show, valueItem.value)
      );
    },
    [collections, selectedShows]
  );

  const valueOptions: AppMenuValueItem[] = useMemo(() => {
    return collections.map((item) => {
      return {
        value: item,
      };
    });
  }, [collections]);

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
          itemList={valueOptions}
          allowEntry={true}
          title={"Collections"}
        />
      </Menu>
    </>
  );
}
