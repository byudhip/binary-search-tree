class Node {
  constructor(data, left = null, right = null) {
    (this.data = data), (this._left = left), (this._right = right);
  }
  /**
   * @param {Node|null} node
   */
  set left(node) {
    return (this._left = node);
  }
  /**
   * @param {Node|null} node
   */
  set right(node) {
    return (this._right = node);
  }

  get left() {
    return this._left;
  }

  get right() {
    return this._right;
  }
}

class Tree {
  constructor(array) {
    (this.array = array),
      (this.root = this.buildTree(
        [...new Set(this.array)].sort((a, b) => a - b)
      ));
  }
  buildTree(sortedArray) {
    if (sortedArray.length === 0) return null;
    const midIndex = Math.floor(sortedArray.length / 2);
    const node = new Node(sortedArray[midIndex]);

    node.left = this.buildTree(sortedArray.slice(0, midIndex));
    node.right = this.buildTree(sortedArray.slice(midIndex + 1));

    return node;
  }

  insert(value) {
    const [newRoot, inserted] = this._insertRecursively(this.root, value);
    this.root = newRoot;
    return inserted;
  }

  _insertRecursively(node, value) {
    if (node === null) {
      return [new Node(value), true];
    }

    if (value < node.data) {
      const [newLeft, inserted] = this._insertRecursively(node.left, value);
      node.left = newLeft;
      return [node, inserted];
    } else if (value > node.data) {
      const [newRight, inserted] = this._insertRecursively(node.right, value);
      node.right = newRight;
      return [node, inserted];
    } else {
      return [node, false];
    }
  }

  deleteItem(value) {}
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

export { Tree, prettyPrint };
