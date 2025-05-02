import { Tree, prettyPrint } from "./bst.js";

const randomArr = (length) => {
  let arr = new Array(length);
  for (let i = 0; i < length; i++) {
    arr[i] = Math.floor(Math.random() * length);
  }
  return arr;
};

const tree = new Tree(randomArr(100));

console.log(tree.levelOrder(() => {}));
console.log(tree.preOrder(() => {}));
console.log(tree.postOrder(() => {}));
console.log(tree.inOrder(() => {}));
tree.insert(3750);
tree.insert(4500);
tree.insert(13000);
console.log(tree.isBalanced());
tree.rebalance();
console.log(tree.isBalanced());
console.log(tree.levelOrder(() => {}));
console.log(tree.preOrder(() => {}));
console.log(tree.postOrder(() => {}));
console.log(tree.inOrder(() => {}));
prettyPrint(tree.root);
