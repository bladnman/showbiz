import useMegaStore from "@store/MegaStore";

export default function setDrawerMode(mode: "permanent" | "temporary") {
  useMegaStore.setState({
    drawerMode: mode,
  });
}
