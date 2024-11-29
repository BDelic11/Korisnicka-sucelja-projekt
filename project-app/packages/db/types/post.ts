import { StaticImageData } from "next/image";

export type Post = {
  id: string;
  image: StaticImageData;
  title: string;
  tags: Tags[];
};

export enum Tags {
  LongHair = "long-hair",
  ShortHair = "short-hair",
  Curly = "curly",
  Straight = "straight",
  Wavy = "wavy",
  Blonde = "blonde",
  Brunette = "brunette",
  Updo = "updo",
  Braids = "braids",
  BobCut = "bob-cut",
  Ponytail = "ponytail",
}
