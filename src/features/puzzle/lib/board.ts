import { EMPTY_TILE_VALUE } from "@/features/puzzle/constants";

function isEmptyTile(tileValue: number): boolean {
  return tileValue === EMPTY_TILE_VALUE;
}

export function getTileBackgroundColor(tileValue: number): string {
  if (isEmptyTile(tileValue)) {
    return "border border-dashed border-slate-600 bg-slate-900 text-transparent";
  }
  return "border border-slate-300 bg-slate-100 text-slate-950 shadow-[3px_3px_0_0_rgb(245_158_11)]";
}

export function getTileDisplayText(tileValue: number): string {
  if (isEmptyTile(tileValue)) {
    return "";
  }
  return String(tileValue);
}
