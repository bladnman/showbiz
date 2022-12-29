import React from "react";
import { ReactComponent as Google } from "@/images/google.svg";
import { ReactComponent as Imdb } from "@/images/imdb.svg";
import { ReactComponent as Home } from "@/images/home-green.svg";
import { ReactComponent as RottenTomatoes } from "@/images/tomato.svg";
import { ReactComponent as CloudStream } from "@/images/cloud-stream.svg";
import { ReactComponent as SideBar } from "@/images/side-bar.svg";
import { ReactComponent as SelectReverse } from "@/images/select-reverse.svg";
import { ReactComponent as RatingDotFull } from "@/images/rating_dot_full.svg";
import { ReactComponent as RatingDotHalf } from "@/images/rating_dot_half.svg";
import { ReactComponent as RatingDotNone } from "@/images/rating_dot_none.svg";
import { ReactComponent as DotFull } from "@/images/dot_full.svg";
import { ReactComponent as DotHalf } from "@/images/dot_half.svg";
import { ReactComponent as DotEmpty } from "@/images/dot_empty.svg";
import { ReactComponent as DotOneThird } from "@/images/dot_1third.svg";
import { ReactComponent as DotTwoThird } from "@/images/dot_2third.svg";
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

export function SelectReverseIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={SelectReverse} {...props} />;
}

export function RatingDotFullIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={RatingDotFull} {...props} />;
}

export function RatingDotHalfIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={RatingDotHalf} {...props} />;
}

export function RatingDotNoneIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={RatingDotNone} {...props} />;
}

export function DotFullIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={DotFull} {...props} sx={{ background: "#fff" }} />;
}

export function DotHalfIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={DotHalf} {...props} />;
}

export function DotEmptyIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={DotEmpty} {...props} />;
}

export function DotOneThirdIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={DotOneThird} {...props} />;
}

export function DotTwoThirdIcon(props: AppSvgIconProps) {
  return <AppSvgIcon Icon={DotTwoThird} {...props} />;
}
