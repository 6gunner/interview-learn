// import listDiff from "list-diff2";
// export default function myListDiff(oldList, newList, key) {
//   const { moves, children } = listDiff(oldList, newList, key);
//   return {
//     moves,
//     keeps: children
//   };
// }

/**
 * Diff two list in O(N).
 * @param {Array} oldList - Original List
 * @param {Array} newList - List After certain insertions, removes, or moves
 * @return {Object} - {
 *                    moves: <Array>,
 *                    children: Array // 保持不变的部分
 *                  }
 *                  - moves is a list of actions that telling how to remove and insert
 */
export default function listDiff(oldList, newList, key) {
  // 思路： 我们用贪心算法的思路，尽可能的减少步骤。一个位置上的元素尽可能保持0步或者1步操作；
  // 1步操作指的是删除或者增加；
  // 0步操作指的是保持不动；
  // 然后我们按这个思路去遍历、比较oldList和newList；
  // 最终返回结果
  const moves = [];
  const keeps = [];

  // 1.将oldList和newList的key遍历出来，生成一个key-index的对象
  const oldListKeyMap = getListKeyMap(oldList, key);
  const newListKeyMap = getListKeyMap(newList, key);

  const noKeyItems = newListKeyMap.noKeyItems;
  let noKeyItemsIndex = 0;

  const oldIndexMap = oldListKeyMap.keyIndexMap;
  const newIndexMap = newListKeyMap.keyIndexMap;

  // 2.遍历oldList, 删除在newList里不存在的item；
  for (let i = 0; i < oldList.length; i++) {
    let oldItem = oldList[i];
    let oldItemKey = getItemKey(oldItem, key);

    if (oldItemKey) {
      // 看看newIndexMap里是否存在，
      if (newIndexMap.hasOwnProperty(oldItemKey)) {
        // 如果存在的话，说明可以复用
        let newItem = newList[newIndexMap[oldItemKey]];
        keeps.push(newItem);
      } else {
        // 不存在，那么代表需要删除掉
        keeps.push(null);
        // keeps.push(newItem);
      }
    } else {
      // 将那些旧列表里不存在key，在newFree里找到对应的item，添加进来；
      keeps.push(noKeyItems[noKeyItemsIndex]);
      noKeyItemsIndex++;
    }
  }
  const keepsCopy = keeps.slice(0);

  let curosr = 0;
  while (curosr < keepsCopy.length) {
    if (keepsCopy[curosr] === null) {
      remove(curosr);
      keepsCopy.splice(curosr, 1);
    } else {
      curosr++;
    }
  }

  // 3. 遍历newList和上面删除后的list结果，该做插入的插入, 该保持不变的继续不变

  console.log(JSON.stringify(keepsCopy));
  let copyCursor = 0;
  for (let i = 0; i < newList.length; i++) {
    let newItem = newList[i];
    let newItemKey = getItemKey(newItem, key);
    const copyItem = keepsCopy[copyCursor];
    const copyItemKey = getItemKey(copyItem, key);

    if (copyItem) {
      if (newItemKey == copyItemKey) {
        // 如果完全一样，那么就保持不动, 两个指针都向后移动一位
        copyCursor++;
      } else {
        // 如果不一样，且oldIndexMap不包含此newItemKey
        if (!oldIndexMap.hasOwnProperty(newItemKey)) {
          insert(i, newItem);
        } else {
          // 如果在旧元素里存在newItem
          // 验证一下keepsCopy下一个元素是不是和这个newItem一样
          const nextCopyItem = keepsCopy[copyCursor + 1];
          let nextCopyItemKey = getItemKey(nextCopyItem, key);
          if (nextCopyItemKey === newItemKey) {
            // 如果下一个元素的key 且和newItemKey相同，删除这个位置的元素，就不用添加了
            remove(i);
            keepsCopy.splice(copyCursor, 1);
            copyCursor++; // 光标向后
          } else {
            insert(i, newItem);
          }
        }
      }
    } else {
      // 插入一个新的item，一般是newList里有，而oldList里没有
      insert(i, newItem);
    }
    console.log(`copyCursor = ${copyCursor}, i = ${i}`);
  }

  // 将keespCopy的剩余部分都删除掉;
  let k = keepsCopy.length - copyCursor;
  while (copyCursor < keepsCopy.length) {
    k--;
    remove(k + newList.length);
    copyCursor++;
  }

  function remove(index) {
    const move = { index: index, type: 0 };
    moves.push(move);
    console.log(`删除${index}`);
    // console.log(JSON.stringify(keepsCopy));
  }

  function insert(index, item) {
    const move = { index: index, item: item, type: 1 };
    moves.push(move);
    console.log(`${index}插入${item.key}`);
  }

  return {
    moves,
    keeps
  };
}

/**
 * Convert list to key-item keyIndex object.
 * 将列表转换为 key-item 的键值对象
 * [{id: "a"}, {id: "b"}, {id: "c"}, {id: "d"}, {id: "e"}] -> [a:0,b:1,c:2...]
 * @param {Array} list
 * @param {String|Function} key
 */
function getListKeyMap(list, key) {
  const keyIndexMap = {};
  let noKeyItems = [];
  if (!key) {
    noKeyItems = list;
  }
  list.forEach((item, index) => {
    let itemKey = getItemKey(item, key);
    if (itemKey) {
      keyIndexMap[itemKey] = index;
    } else {
      noKeyItems.push(item);
    }
  });

  return {
    keyIndexMap,
    noKeyItems
  };
}

function getItemKey(item, key) {
  if (!item || !key) return null;
  if (typeof key === "string") {
    let keyValue = item[key];
    return keyValue;
  } else if (typeof key === "function") {
    let keyValue = key(item);
    return keyValue;
  }
  return null;
}
