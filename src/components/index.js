// 将Tab模块，当Tab导出去
export { default as Table } from "./Table";
export { default as Tab } from "./Tab";
// 将other_module模块，当default导出去
export { default } from "./other_module";

// 将other_module里的除了default的所有模块导出
export * from "./other_module";
