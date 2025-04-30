class Node {
  constructor(data, left, right) {
    (this.data = data), (this.left = left), (this.right = right);
  }

  setLeft(node) {
    this.left = node;
  }

  setRight(node) {
    this.right = node;
  }
}

class BinarySearchTree {}

export { BinarySearchTree };
