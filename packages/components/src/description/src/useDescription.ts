import type { DescriptionProps, DescInstance, UseDescReturnType } from "./type";
import { ref, getCurrentInstance, unref } from "vue";

export function useDescription(
  props?: Partial<DescriptionProps>
): UseDescReturnType {
  if (!getCurrentInstance()) {
    throw new Error("useDescription（）只能在 setup（）或功能组件中使用！");
  }
  const desc = ref<DescInstance | null>(null);
  const loaded = ref(false);

  function register(instance: DescInstance) {
    if (unref(loaded)) {
      return;
    }
    desc.value = instance;
    props && instance.setDescProps(props);
    loaded.value = true;
  }

  const methods: DescInstance = {
    setDescProps: (descProps: Partial<DescriptionProps>): void => {
      unref(desc)?.setDescProps(descProps);
    },
  };

  return [register, methods];
}
