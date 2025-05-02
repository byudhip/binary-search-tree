import { Tree, prettyPrint } from "./bst.js";

const tree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

// console.log(tree.root);
console.log(tree.insert(12));
prettyPrint(tree.root);
tree.levelOrder(tree.traverseAndPrint);
