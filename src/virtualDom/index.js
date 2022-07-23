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
    {
      tagName: "h1",
      props: { style: "color: blue" },
      children: ["simple virtal dom"]
    },
    {
      tagName: "p",
      children: ["Hello, virtual-dom"]
    },
    { tagName: "ul", children: [{ tagName: "li", children: ["li1"] }] }
  ]
};
const node = new Node(oldElements);
const el = node.render();
document.querySelector("#app").appendChild(el);
const newElements = {
  tagName: "div",
  props: { id: "container" },
  children: [
    {
      tagName: "h1",
      props: { style: "color: red" },
      children: ["simple virtal dom"]
    },
    {
      tagName: "b",
      children: ["Hello, virtual-dom"]
    },
    {
      tagName: "ul",
      children: [
        { tagName: "li", children: ["li1"] },
        { tagName: "li", children: ["li2"] }
      ]
    }
  ]
};
try {
  const newNode = new Node(newElements);
  const patches = diff(node, newNode);
  patch(el, patches);
} catch (error) {
  console.error(error);
}
