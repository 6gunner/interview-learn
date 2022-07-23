import _ from "underscore";
// 将diff出来的patches应用到el上
function patch(el, patches) {
  dfsWalk(
    el,
    {
      index: 0
    },
    patches
  );
}

// 深度遍历node，然后去更新；
function dfsWalk(el, walker, patches) {
  const currentPatches = patches[walker.index]; //从patches拿到当前节点的差异

  const len = el.children ? el.children.length : 0;

  // 递归：深度遍历子节点
  for (let i = 0; i < len; i++) {
    const child = el.children[i];
    walker.index++;
    dfsWalk(child, walker, patches);
  }

  // 如果有patches，那么应用patches
  if (currentPatches && currentPatches.length) {
    applyPatches(el, currentPatches);
  }
}

function applyPatches(el, patchArray) {
  patchArray.forEach(patchItem => {
    if (patchItem) {
      console.log(patchItem);
      switch (patchItem.type) {
        case PATCH_TYPES.REPLACE:
          replaceNode(el, patchItem.obj);
          break;
        case PATCH_TYPES.PROPS:
          updateProps(el, patchItem.obj);
          break;
        case PATCH_TYPES.TEXT:
          updateText(el, patchItem.obj);
          break;
        case PATCH_TYPES.REORDER:
          reorderChildren(el, patchItem.obj);
          break;
      }
    }
  });
}

function replaceNode(el, newNode) {
  if (!newNode) {
    el.parentNode.removeChild(el);
    return;
  }
  el.parentNode.replaceChild(newNode.render(), el);
}

function updateProps(el, propsPatches) {
  const { deletedProps, newProps } = propsPatches;
  deletedProps.forEach(prop => el.removeAttribute(prop));

  newProps.forEach(item => {
    for (let key in item) {
      el.setAttribute(key, item[key]);
    }
  });
}

function updateText(el, newText) {
  debugger;
  el.innerHTML = newText;
}

function reorderChildren(el, moves) {
  const nodes = _.toArray(el.childNodes);
  const map = {};
  // 将dom节点的children放到map里
  nodes.forEach(node => {
    if (node.tyoe === Node.ELEMENT_NODE) {
      const key = node.getAttribute("key");
      if (key) {
        map[key] = node;
      }
    }
  });
  moves.forEach(({ index, item, type }) => {
    if (type == MOVE_TYPES.REMOVE) {
      // if (el.childNodes[index] === nodes[index]) {
      el.removeChild(item);
      // }
    } else if (type === MOVE_TYPES.INSERT) {
      const insertedNode = map[item.key]
        ? map[item.key].cloneNode(true)
        : typeof item === "object"
        ? item.render()
        : document.createTextNode(item);
      nodes.splice(index, 0, insertedNode);
      const slbNode = el.childNodes[index] || null;
      debugger;
      el.insertBefore(insertedNode, slbNode);
    }
  });
}

export const PATCH_TYPES = {
  REPLACE: 0,
  REORDER: 1,
  PROPS: 2,
  TEXT: 3,
  INSERT: 4
};

export const MOVE_TYPES = {
  REMOVE: 0,
  INSERT: 1
};

export default patch;
