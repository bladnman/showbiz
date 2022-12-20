import React from "react";
import { ReactComponent as Google } from "@/images/google.svg";
import { ReactComponent as Imdb } from "@/images/imdb.svg";
import { ReactComponent as Home } from "@/images/home-green.svg";
import { ReactComponent as RottenTomatoes } from "@/images/tomato.svg";
import { ReactComponent as CloudStream } from "@/images/cloud-stream.svg";
import { ReactComponent as SideBar } from "@/images/side-bar.svg";
import AppSvgIcon, { AppSvgIconProps } from "@/components/AppSvgIcon";

export function GoogleIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={Google} {...props} />;
}

export function ImdbIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={Imdb} {...props} />;
}

export function HomeIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={Home} {...props} />;
}

export function RottenTomatoesIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={RottenTomatoes} {...props} />;
}

export function CloudStreamIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={CloudStream} {...props} />;
}

export function SideBarIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={SideBar} {...props} />;
}
