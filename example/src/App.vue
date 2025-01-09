<template>
  <div class="bg-card h-full w-full">
    <div class="gstc-wrapper" ref="gstcElement"></div>
  </div>
</template>

<script setup lang="ts">
import {
  GSTC,
  TimelinePointer,
  Selection,
  ItemResizing,
  ItemMovement,
  Bookmarks,
} from "@ydzs/plugins/gantt";

import "../../public/gantt/style.css";
import { ref, onMounted, onBeforeUnmount } from "vue";

// helper functions

function generateRows() {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Rows }
   */
  const rows = {};
  for (let i = 0; i < 100; i++) {
    const id = GSTC.api.GSTCID(i.toString());
    rows[id] = {
      id,
      label: `Row ${i}`,
    };
  }
  return rows;
}

function generateItems() {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Items }
   */
  const items = {};
  let start = GSTC.api.date().startOf("day").subtract(6, "day");
  for (let i = 0; i < 100; i++) {
    const id = GSTC.api.GSTCID(i.toString());
    const rowId = GSTC.api.GSTCID(Math.floor(Math.random() * 100).toString());
    start = start.add(1, "day");
    items[id] = {
      id,
      label: `Item ${i}`,
      rowId,
      time: {
        start: start.valueOf(),
        end: start.add(1, "day").endOf("day").valueOf(),
      },
    };
  }
  return items;
}

let gstc, state;
const gstcElement = ref(null);

onMounted(() => {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Config }
   */
  const config = {
    licenseKey:
      "====BEGIN LICENSE KEY====\nsTPiIFomrdc33XZf1bFOtu5F6EKG0M/KY30nKOv0KouYqoYyRffaF7QYvThQe0LncwLzPsmDOSvVqosOqjHMDoRDgeU3hWBI7KhFsjpqzDYxJ9n4qzMv1aUvcDXLKE7pkT7dkUA1UCfWa25tlPiLEoVv9nPN5bHbdjdbKX5L+SmNa22KhrPPMZnf2WLgeJXUkADgbA++2afMvSQW1Kz8/1spzyRw3X4w+7hH8Q4jF54Lgt2xIvU6He8cRaGD3E39eMv1pSuuxdW3YNKt1tdSIzKlIbxDfSPkFXgzjRqKIQhHqXcy3uJkRoatMfPbSGafVeiETRXtLNTvXGGKhJ1HeA==||U2FsdGVkX1+wYV5Ob5RWtpWCzL6hKXKrMQeGYa96YFEvuIkQLPsNNLrUerk/DYuWJYW7xdMlhuLQtqfzCfbMkAEkbeYcrdHOs9EFbkF3jmA=\nBgNQdrTtabgeS1rr5LRbXDJ0FBIyfwhs3bw4WFBIqrq0Shjfl49Ng60OXME1rmnLg1/Gpa7w0tIzuvvNn0WnPNhjMn1xU5X8XAkAi0X2bVBoVmt1UxhctSUGzXf5vRg//X3zJzZ2Fe4It1Rx0uRWevlOCN2aLzk1mGv1e0x+6Gkp/bRl9GgeOl0ZTsAvx7FCL9Xnv2rJKch4eH+YVaZrop+0G156T+EIX9Inm/Kgmx1w5u2Fo5DF5ZLnBSLaHiLN4f5ALMKCG7XrlxWazI5aF/ISF9fPafxuA+zXMmdtPCt1NJl6v7dLkZWFFxPoH61dzxucnY1GrsDrmfmP4FusUA==\n====END LICENSE KEY====",
    plugins: [
      TimelinePointer(),
      Selection(),
      ItemResizing(),
      ItemMovement(),
      Bookmarks(),
    ],
    list: {
      columns: {
        data: {
          [GSTC.api.GSTCID("label")]: {
            id: GSTC.api.GSTCID("label"),
            width: 200,
            data: "label",
            header: {
              content: "所有任务",
            },
          },
        },
      },
      rows: generateRows(),
    },
    chart: {
      items: generateItems(),
    },
  };

  state = GSTC.api.stateFromConfig(config);
  globalThis.state = state;
  const element = gstcElement.value;
  if (element) {
    gstc = GSTC({
      element,
      state,
    });
  }
  globalThis.gstc = gstc;
});

onBeforeUnmount(() => {
  if (gstc) gstc.destroy();
});

function updateFirstRow() {
  state.update(`config.list.rows.${GSTC.api.GSTCID("0")}`, (row) => {
    row.label = "Changed dynamically";
    return row;
  });
}

function changeZoomLevel() {
  state.update("config.chart.time.zoom", 21);
}
</script>
<style scoped>
.gstc-component {
  padding: 0;
  margin: 0;
}

.toolbox {
  padding: 10px;
}
</style>
