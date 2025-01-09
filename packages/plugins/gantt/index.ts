import GSTC from "./gstc.wasm.esm.min.js";
import { Plugin as TimelinePointer } from "./plugins/timeline-pointer.esm.min.js";
import { Plugin as Selection } from "./plugins/selection.esm.min.js";
import { Plugin as ItemResizing } from "./plugins/item-resizing.esm.min.js";
import { Plugin as ItemMovement } from "./plugins/item-movement.esm.min.js";
import { Plugin as Bookmarks } from "./plugins/time-bookmarks.esm.min.js";

//框选 Selection
//宽度变化 ItemResizing
//拖动 ItemMovement
//点击选中 Bookmarks
export {
  GSTC,
  TimelinePointer,
  Selection,
  ItemResizing,
  ItemMovement,
  Bookmarks,
};
