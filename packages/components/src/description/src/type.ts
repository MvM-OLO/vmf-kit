import type { CSSProperties, VNode } from "vue";
import type { JSX } from "vue/jsx-runtime";
import type { DescriptionsProps } from "ant-design-vue/es/descriptions";

/**
 * 描述列表基础属性接口
 */
export interface DescriptionProps {
  /** 描述列表的标题 */
  title?: string;
}

/**
 * 描述列表项配置接口
 */
export interface DescItem {
  /** 标签最小宽度(px) */
  labelMinWidth?: number;

  /** 内容最小宽度(px) */
  contentMinWidth?: number;

  /** 标签自定义样式 */
  labelStyle?: CSSProperties;

  /** 数据字段名 */
  field: string;

  /** 标签文本，支持文本、VNode 或 JSX */
  label: string | VNode | JSX.Element;

  /** 列数，合并列时使用 */
  span?: number;

  /**
   * 是否显示该项的判断函数
   * @param args 任意参数
   * @returns 是否显示
   */
  show?: (...arg: any) => boolean;

  /**
   * 自定义渲染函数
   * @param val 当前字段值
   * @param row 整行数据
   * @returns 渲染内容
   */
  render?: (
    val: any,
    row: any
  ) => VNode | undefined | JSX.Element | Element | string | number;
}

/**
 * 完整的描述列表属性接口，继承自 ant-design-vue 的 DescriptionsProps
 */
export interface DescriptionProps extends DescriptionsProps {
  /**
   * 配置项数组
   * @type DescItem[]
   */
  schema: DescItem[];

  /**
   * 数据对象
   * @type object
   */
  data: any;
}

/**
 * 描述列表实例接口
 */
export interface DescInstance {
  /**
   * 设置描述列表属性
   * @param descProps 要设置的属性对象
   */
  setDescProps(descProps: Partial<DescriptionProps>): void;
}

/** 注册函数类型 */
export type Register = (descInstance: DescInstance) => void;

/** useDescription 钩子返回类型 */
export type UseDescReturnType = [Register, DescInstance];
