class Node {
  constructor(value) {
    this.value = value
    this.left = null
    this.right = null
  }
}

// 先序遍历
function preorderTraversal(node) {
  if (node) {
    console.log(node.value)
    preorderTraversal(node.left)
    preorderTraversal(node.right)
  }
}

// 中序遍历
function middleOrderTraversal(node) {
  if (node) {
    preorderTraversal(node.left)
    console.log(node.value)
    preorderTraversal(node.right)
  }
}

// 后序遍历
function postorderTraversal(node) {
  if (node) {
    preorderTraversal(node.left)
    preorderTraversal(node.right)
    console.log(node.value)
  }
}

// 广度优先遍历
function breadthTraversa (node) {
  const queen = []
  if (node) {
    queen.push(node)
  }
  while (queen.length) {
    const n = queen.shift()
    console.log(n.value)
    if (n.left) queen.push(n.left)
    if (n.right) queen.push(n.right)
  }
}

const root = new Node(1)

root.left = new Node(2)
root.left.left = new Node(4)
root.left.left.right = new Node(6)
root.left.left.right.left = new Node(7)
root.left.left.right.right = new Node(8)

root.right = new Node(3)
root.right.left = new Node(5)
