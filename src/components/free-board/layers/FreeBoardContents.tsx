import React, { Children, isValidElement } from "react";
import { Box } from "@mui/material";
import FreeBoardPiece, {
  BoardEventHandlers,
  FreeBoardPieceProps,
} from "@components/free-board/FreeBoardPiece";

type ContentProps = {
  platformSize: { width: number; height: number };
  children?: React.ReactNode[] | React.ReactNode;
};
export default function FreeBoardContents(
  props: ContentProps & BoardEventHandlers
) {
  const { platformSize, children } = props;
  const { onDragStart, onDragStop, onClick, onDoubleClick, onContextMenu } =
    props;
  return (
    <Box
      className={"FREE-BOARD-CONTENTS"}
      sx={{
        position: "absolute",
        left: `${platformSize.width / 2}px`,
        top: `${platformSize.height / 2}px`,
      }}
    >
      {Children.map(children, (child, index) => {
        /// https://www.wikiwand.com/en/Archimedean_spiral
        /// http://jsfiddle.net/bladnman/qpLbn720/1/
        const centerX = 0;
        const centerY = 0;
        const a = 20;
        const b = 2;
        const thetaAngle = 50 * index;
        const x = centerX + (a + b * thetaAngle) * Math.cos(thetaAngle);
        const y = centerY + (a + b * thetaAngle) * Math.sin(thetaAngle);

        const isBoardPiece =
          isValidElement(child) && child.type === FreeBoardPiece;

        // CLONE - board pieces
        if (isBoardPiece) {
          const origPiece = child as React.ReactElement<FreeBoardPieceProps>;
          return React.cloneElement(origPiece, {
            key: index,
          });
        }

        // WRAP - non-board-piece
        return (
          <FreeBoardPiece
            key={index}
            pieceData={child}
            onDragStart={onDragStart}
            onDragStop={onDragStop}
            onClick={onClick}
            onDoubleClick={onDoubleClick}
            onContextMenu={onContextMenu}
          >
            {child}
          </FreeBoardPiece>
        );
      })}
    </Box>
  );
}
