import GSTC from "./gstc.wasm.esm.min.js";
import { Plugin as TimelinePointer } from "./plugins/timeline-pointer.esm.min.js";
import { Plugin as Selection } from "./plugins/selection.esm.min.js";
import { Plugin as ItemResizing } from "./plugins/item-resizing.esm.min.js";
import { Plugin as ItemMovement } from "./plugins/item-movement.esm.min.js";
import { Plugin as Bookmarks } from "./plugins/time-bookmarks.esm.min.js";
import { Plugin as CalendarScroll } from "./plugins/calendar-scroll.esm.min.js";
import { Plugin as ExportPdf } from "./plugins/export-pdf.esm.min.js";
import { Plugin as ExportImage } from "./plugins/export-image.esm.min.js";
import { Plugin as ProgressBar } from "./plugins/progress-bar.esm.min.js";
import { Plugin as DependencyLines } from "./plugins/dependency-lines.esm.min.js";
import { Plugin as HighlightWeekends } from "./plugins/highlight-weekends.esm.min.js";

export {
  GSTC, //甘特图核心
  TimelinePointer, //时间轴指针
  Selection, //框选
  ItemResizing, //宽度变化
  ItemMovement, //拖动
  Bookmarks, //点击选中
  CalendarScroll, //日历滚动
  ExportPdf, //导出PDF
  ExportImage, //导出图片
  ProgressBar, //进度条
  DependencyLines, //依赖线
  HighlightWeekends, //高亮周末
};
