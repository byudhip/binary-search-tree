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

  deleteItem(value) {
    const [newRoot, deleted] = this._deleteRecursively(this.root, value);
    this.root = newRoot;
    return deleted;
  }

  _deleteRecursively(node, value) {
    if (node === null) return [null, false];

    if (value < node.data) {
      const [newLeft, deleted] = this._deleteRecursively(node.left, value);
      node.left = newLeft;
      return [node, deleted];
    } else if (value > node.data) {
      const [newRight, deleted] = this._deleteRecursively(node.right, value);
      node.right = newRight;
      return [node, deleted];
    } else {
      if (!node.left && !node.right) {
        return [null, true]; // no children
      } else if (!node.left) {
        return [node.right, true]; // only right child
      } else if (!node.right) {
        return [node.left, true]; // only left child
      } else {
        // two children, find in-order successor
        let successor = node.right;
        while (successor.left !== null) {
          successor = successor.left;
        }
        node.data = successor.data;
        const [newRight, _] = this._deleteRecursively(
          node.right,
          successor.data
        );
        node.right = newRight;
        return [node, true];
      }
    }
  }

  find(value) {
    return this._findRecursively(this.root, value);
  }
  _findRecursively(node, value) {
    if (node === null) return null;
    if (node.data === value) return node;

    if (value < node.data) {
      return this._findRecursively(node.left, value);
    } else {
      return this._findRecursively(node.right, value);
    }
  }

  levelOrder(callback) {
    const root = this.root;
    if (typeof callback !== "function") {
      throw new Error("Please provide a valid callback function");
    }
    if (!root) return;
    let q = [];
    let levelOrderArr = [];
    q.push(root);

    while (q.length > 0) {
      const current = q.shift();
      levelOrderArr.push(current.data);
      callback(current.data);

      if (current.left) q.push(current.left);
      if (current.right) q.push(current.right);
    }
    return levelOrderArr;
  }

  inOrder(callback) {
    const inOrderArr = [];
    if (typeof callback !== "function") {
      throw new Error("Please provide a valid callback function");
    }
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      callback(node.data);
      inOrderArr.push(node.data);
      traverse(node.right);
    }

    traverse(this.root);
    return inOrderArr;
  }

  preOrder(callback) {
    const preOrderArr = [];
    if (typeof callback !== "function") {
      throw new Error("Please provide a valid callback function");
    }
    function traverse(node) {
      if (!node) return;
      callback(node.data);
      preOrderArr.push(node.data);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
    return preOrderArr;
  }

  postOrder(callback) {
    const postOrderArr = [];
    if (typeof callback !== "function") {
      throw new Error("Please provide a valid callback function");
    }
    function traverse(node) {
      if (!node) return;
      traverse(node.left);
      traverse(node.right);
      callback(node.data);
      postOrderArr.push(node.data);
    }

    traverse(this.root);
    return postOrderArr;
  }

  height(value) {
    let targetNode = this.find(value);
    if (!targetNode) return null;

    function calcHeight(node) {
      if (!node) return -1;
      return 1 + Math.max(calcHeight(node.left), calcHeight(node.right));
    }

    return calcHeight(targetNode);
  }

  depth(value) {
    function findDepth(node, value, currentDepth) {
      if (!node) return null;
      if (node.data === value) return currentDepth;

      if (value < node.data) {
        return findDepth(node.left, value, currentDepth + 1);
      } else {
        return findDepth(node.right, value, currentDepth + 1);
      }
    }
    return findDepth(this.root, value, 0);
  }

  checkForBalance(node) {
    if (node === null) return 0;
    const left = this.checkForBalance(node.left);
    if (left === -1) return -1;

    const right = this.checkForBalance(node.right);
    if (right === -1) return -1;

    if (Math.abs(left - right) > 1) return -1;

    return 1 + Math.max(left, right);
  }

  isBalanced() {
    return this.checkForBalance(this.root) !== -1;
  }

  rebalance() {
    let sortedArray = this.inOrder(() => {});
    this.root = this.buildTree(sortedArray);
    console.log("tree rebalanced");
  }

  traverseAndPrint(node) {
    console.log(node);
  }
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
