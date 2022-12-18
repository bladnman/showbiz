import React from "react";
import { Stack } from "@mui/material";
import { FilterDef } from "@types";
import DrawerFilterRow from "./parts/DrawerFilterRow";
import DrawerCollapsableSection from "./parts/DrawerCollapsableSection";

export default function DrawerSection({ filter }: { filter: FilterDef }) {
  return (
    <DrawerCollapsableSection filter={filter} sectionTitle={filter.title}>
      {/* Collapse Section also implements the Options Menu */}
      <Stack
        direction={"column"}
        component={"div"}
        marginTop={1}
        marginBottom={3}
      >
        {filter.allValues.map((value, idx) => (
          <DrawerFilterRow
            value={value}
            filter={filter}
            key={`${value}_${idx}`}
          />
        ))}
      </Stack>
    </DrawerCollapsableSection>
  );
}
