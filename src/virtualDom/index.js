import Node from "./node";
import diff from "./diff";
import patch from "./patch";
// demo1
// const elements = {
//   tagName: "ul",
//   props: {
//     id: "list"
//   },
//   children: [
//     {
//       tagName: "li",
//       props: {
//         class: "item"
//       },
//       children: ["Item 1"]
//     },
//     {
//       tagName: "li",
//       props: {
//         class: "item"
//       },
//       children: ["Item 2"]
//     },
//     {
//       tagName: "li",
//       props: {
//         class: "item"
//       },
//       children: ["Item 3"]
//     }
//   ]
// };
// const node = new Node(elements);
// const element = node.render();
// document.querySelector("#app").appendChild(element);

// demo2 diff
const oldElements = {
  tagName: "div",
  props: { id: "container" },
  children: [
    // {
    //   tagName: "h1",
    //   props: { style: "color: blue" },
    //   children: ["simple virtal dom"]
    // },
    // {
    //   tagName: "p",
    //   children: ["Hello, virtual-dom"]
    // }
    {
      tagName: "ul",
      children: [
        { tagName: "li", children: ["li1"], key: 1 },
        { tagName: "li", children: ["li2"], key: 2 },
        { tagName: "li", children: ["li3"], key: 3 },
        { tagName: "li", children: ["li4"], key: 4 }
        // { tagName: "li", children: ["li5"], key: 5 },
        // { tagName: "li", children: ["li6"], key: 6 },
        // { tagName: "li", children: ["li7"], key: 7 }
      ]
    }
  ]
};
const node = new Node(oldElements);
const el = node.render();
document.querySelector("#app").appendChild(el);
const newElements = {
  tagName: "div",
  props: { id: "container" },
  children: [
    // {
    //   tagName: "h1",
    //   props: { style: "color: red" },
    //   children: ["simple virtal dom"]
    // },
    // {
    //   tagName: "b",
    //   children: ["Hello, virtual-dom"]
    // }
    {
      tagName: "ul",
      children: [
        { tagName: "li", children: ["li2"], key: 2 },
        { tagName: "li", children: ["li1"], key: 1 },
        { tagName: "li", children: ["li3"], key: 3 },
        { tagName: "li", children: ["li4"], key: 4 }
        // { tagName: "li", children: ["li7"], key: 7 }
      ]
    }
  ]
};
try {
  const newNode = new Node(newElements);
  const patches = diff(node, newNode);
  console.log(`patches = ${JSON.stringify(patches)}`);
  patch(el, patches);
} catch (error) {
  console.error(error);
}
