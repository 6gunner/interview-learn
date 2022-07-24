import _ from "underscore";
import listDiff from "./listDiff";
import { PATCH_TYPES } from "./patch";

// diff算法
function diff(oldNode, newNode) {
  const index = 0; // 用来标记当前的node的序号？
  const patches = {}; // 用来记录不同的节点

  dfsWalk(oldNode, newNode, index, patches);
  return patches;
}

// 深度优先遍历
function dfsWalk(oldNode, newNode, index, patches) {
  patches[index] = [];
  if (!oldNode) {
    patches[index].push({
      type: PATCH_TYPES.INSERT,
      obj: newNode
    });
  } else if (!newNode) {
    // 如果newNode是空的，也是删除
    // 不需要做什么
    // patches[index].push({
    //   type: PATCH_TYPES.REPLACE,
    //   obj: null
    // });
  } else if (_.isString(oldNode) && _.isString(newNode)) {
    // 如果是一个字符串，那么代表是text
    patches[index].push({
      type: PATCH_TYPES.TEXT,
      obj: newNode
    });
  } else if (
    oldNode.tagName === newNode.tagName &&
    oldNode.key === newNode.key
  ) {
    // 如果tag和key都一样，代表只是需要修改prop;
    const propsPatches = diffProps(oldNode, newNode);
    if (propsPatches) {
      patches[index].push({ type: PATCH_TYPES.PROPS, obj: propsPatches });
    }
    // 递归处理children
    diffChildren(oldNode.children, newNode.children, index, patches);
  } else {
    patches[index].push({
      type: PATCH_TYPES.REPLACE,
      obj: newNode
    });
  }

  // 对children进行diff比较
  function diffChildren(oldNodeChildren, newNodeChildren, index, patches) {
    // 列表diff算法
    const diffs = listDiff(oldNodeChildren, newNodeChildren, "key");
    debugger;
    newNodeChildren = diffs.keeps;
    if (diffs.moves.length) {
      const reorderPatch = { type: PATCH_TYPES.REORDER, obj: diffs.moves };
      patches[index].push(reorderPatch);
    }
    oldNodeChildren.forEach((child, i) => {
      let newChild = newNodeChildren[i];
      let currentIndex = index + i + 1;
      dfsWalk(child, newChild, currentIndex, patches);
    });
  }
}

function diffProps(oldNode, newNode) {
  const propsPatches = {
    newProps: [],
    deletedProps: []
  };

  let count = 0;
  // 遍历新节点的属性，如果不相同，那么就是新增的
  for (let key in newNode.props) {
    if (newNode.props[key] !== oldNode.props[key]) {
      count++;
      propsPatches.newProps.push({
        [key]: newNode.props[key]
      });
    }
  }
  for (let key in oldNode.props) {
    if (!newNode.props.hasOwnProperty(key)) {
      count++;
      propsPatches.deletedProps.push(key);
    }
  }
  if (count > 0) {
    return propsPatches;
  }
  return null;
}

export default diff;
