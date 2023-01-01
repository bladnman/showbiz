import React from "react";
import { DRAWER_WIDTH_OPEN } from "@store/const";
import { DrawerHeaderStyled } from "../app-drawer/AppDrawer";
import BodyGrid from "./parts/BodyGrid";
import { Box } from "@mui/material";
import useDrawerTools from "@hooks/useDrawerTools";
import useMegaStore from "@store/MegaStore";
import BodyBoard from "@features/app/app-body/parts/BodyBoard";

const AppBody = () => {
  const { isDrawerPermanentOpen } = useDrawerTools();
  const bodyBoardName = useMegaStore((state) => state.bodyBoardName);

  return (
    <Box
      className={"APP-BODY"}
      flexGrow={1}
      width={"100%"}
      height={"100%"}
      marginLeft={isDrawerPermanentOpen ? `${DRAWER_WIDTH_OPEN}px` : 0}
      sx={{
        overflow: "hidden",
      }}
    >
      <DrawerHeaderStyled />
      {bodyBoardName ? <BodyBoard /> : <BodyGrid />}
    </Box>
  );
};
export default AppBody;
