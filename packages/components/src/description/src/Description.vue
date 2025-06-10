<script lang="tsx">
import {
  computed,
  defineComponent,
  ref,
  toRefs,
  unref,
  type CSSProperties,
  type PropType,
} from "vue";
import { Descriptions, type DescriptionsProps } from "ant-design-vue";
import type { DescInstance, DescItem, DescriptionProps } from "./type";
import { isFunction } from "@vm-kit/utils";

const props = {
  useCollapse: { type: Boolean, default: true },
  title: { type: String, default: "" },
  size: {
    type: String,
    validator: (v: string) =>
      ["small", "default", "middle", undefined].includes(v),
    default: "small",
  },
  bordered: { type: Boolean, default: true },
  column: {
    type: [Number, Object],
    default: () => {
      return { xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 };
    },
  },

  schema: {
    type: Array as PropType<DescItem[]>,
    default: () => [],
  },
  data: { type: Object },
};

export default defineComponent({
  name: "Description",
  props,
  emits: ["register"],
  setup(props, { emit }) {
    const propsRef = ref<Partial<DescriptionProps> | null>(null);

    const getProps = computed(() => {
      return {
        ...props,
        ...(unref(propsRef) as any),
      } as DescriptionProps;
    });

    /**
     * @description:设置desc
     */
    function setDescProps(descProps: DescriptionsProps): void {
      // Keep the last setDrawerProps
      propsRef.value = {
        ...(unref(propsRef) as Record<string, any>),
        ...descProps,
      } as Record<string, any>;
    }

    // Prevent line breaks
    function renderLabel({ label, labelMinWidth, labelStyle }: DescItem) {
      if (!labelStyle && !labelMinWidth) {
        return label;
      }

      const labelStyles: CSSProperties = {
        ...labelStyle,
        minWidth: `${labelMinWidth}px`,
      };
      return <div style={labelStyles}>{label}</div>;
    }

    function renderItem() {
      const { schema, data } = unref(getProps);
      return unref(schema)
        .map((item) => {
          const { render, field, span, show, contentMinWidth } = item;

          if (show && isFunction(show) && !show(data)) {
            return null;
          }

          const getContent = () => {
            const _data = unref(getProps)?.data;
            if (!_data) {
              return null;
            }
            const getField = _data?.[field] ?? "";
            // eslint-disable-next-line
            if (getField && !toRefs(_data).hasOwnProperty(field)) {
              return isFunction(render) ? render("", _data) : "";
            }
            return isFunction(render)
              ? render(getField, _data)
              : getField ?? "";
          };

          const width = contentMinWidth;
          return (
            <Descriptions.Item
              label={renderLabel(item)}
              key={field}
              span={span}
            >
              {() => {
                if (!contentMinWidth) {
                  return getContent();
                }
                const style: CSSProperties = {
                  minWidth: `${width}px`,
                };
                return <div style={style}>{getContent()}</div>;
              }}
            </Descriptions.Item>
          );
        })
        .filter((item) => !!item);
    }

    function renderDesc() {
      return (
        <Descriptions {...(unref(getProps) as any)}>
          {renderItem()}
        </Descriptions>
      );
    }
    const methods: DescInstance = {
      setDescProps,
    };

    emit("register", methods);
    return () => renderDesc();
  },
});
</script>
