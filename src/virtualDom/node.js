function Node({ tagName, props, key, children }) {
  this.tagName = tagName;
  this.props = props;
  this.children = children || [];
  this.key = key || null;
  if (children && children.length) {
    for (let i = 0; i < children.length; i++) {
      let child = children[i];
      if (typeof child !== "string") {
        this.children[i] = new Node(child);
      } else {
        this.children[i] = child;
      }
    }
  }
}

Node.prototype.render = function() {
  const el = document.createElement(this.tagName); // 根据tagName构建
  const props = this.props;
  for (const propName in props) {
    // 设置节点的DOM属性
    const propValue = props[propName];
    el.setAttribute(propName, propValue);
  }

  const children = this.children || [];

  children.forEach(function(child) {
    if (child) {
      const childEl =
        child instanceof Node
          ? child.render() // 如果子节点也是虚拟DOM，递归构建DOM节点
          : document.createTextNode(child); // 如果字符串，只构建文本节点
      el.appendChild(childEl);
    }
  });
  return el;
};

export default Node;
