import { EMPTY_TILE_VALUE } from "@/constants";

function isEmptyTile(tileValue: number): boolean {
  return tileValue === EMPTY_TILE_VALUE;
}

export function getTileBackgroundColor(tileValue: number): string {
  if (isEmptyTile(tileValue)) {
    return "bg-gray-300";
  }
  return "bg-white";
}

export function getTileDisplayText(tileValue: number): string {
  if (isEmptyTile(tileValue)) {
    return "";
  }
  return String(tileValue);
}
