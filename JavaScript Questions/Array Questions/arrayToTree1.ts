interface Item {
  id: string;
  parentId: string | null;
  name: string;
}

interface TreeNode extends Item {
  children: TreeNode[];
}

const items: Item[] = [
  {
    id: '1', parentId: null, name: 'root',
  },
  {
    id: '2', parentId: '1', name: 'node1',
  },
  {
    id: '3', parentId: '1', name: 'node2',
  }
]

function buildTree(items: Item[]) {
  const nodeMap = new Map<string, TreeNode>();
  const roots: TreeNode[] = [];

  for(const item of items) {
    nodeMap.set(item.id, {
      ...item,
      children: [],
    })
  }

  for(const item of items) {
    const node = nodeMap.get(item.id)!;

    if (item.parentId == null) {
      roots.push(node);
    } else {
      const parent = nodeMap.get(item.parentId);
      if (parent) {
        parent.children.push(node);
      } else {
        roots.push(node);
      }
    }
  }

  return roots;

}

function flattenTree(roots: TreeNode[]): Item[] {
  const result: Item[] = [];
  const stack: TreeNode[] = [...roots];

  while(stack.length > 0) {
    const node = stack.pop();
    if (!node) continue;
    const {id, parentId, name} = node;
    result.push({id, parentId, name})

    for(let i = node.children.length - 1; i >= 0; i--) {
      stack.push(node.children[i]);
    }
  }

  return result;

}
const tree = buildTree(items);

// const res = flattenTree(tree);

console.log(tree);
// console.log(res);


