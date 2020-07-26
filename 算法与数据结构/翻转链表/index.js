var reverseList = function (head) {
  let parent = null
  let current = head
  while (current) {
    const next = current.next
    current.next = parent
    parent = current
    current = next
  }
  return parent
}

function ListNode(val) {
  this.val = val
  this.next = null
}
const a = new ListNode(1)
a.next = new ListNode(2)
a.next.next = new ListNode(3)
console.log(JSON.stringify(a, null, 2))
console.log(JSON.stringify(reverseList(a), null, 2))
