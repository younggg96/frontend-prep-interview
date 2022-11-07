let arr = [
  { id: 1, name: "部门1", pid: 0 },
  { id: 2, name: "部门2", pid: 1 },
  { id: 3, name: "部门3", pid: 1 },
  { id: 4, name: "部门4", pid: 3 },
  { id: 5, name: "部门5", pid: 4 },
];
let res = [
  {
    id: 1,
    name: "部门1",
    pid: 0,
    children: [
      {
        id: 2,
        name: "部门2",
        pid: 1,
        children: [],
      },
      {
        id: 3,
        name: "部门3",
        pid: 1,
        children: [
          // 结果 ,,,
        ],
      },
    ],
  },
];

const getChildren = (data, result, pid) => {
  for (const item of data) {
    if (item.pid === pid) {
      const newItem = { ...item, children: [] };
      result.push(newItem);
      getChildren(data, newItem.children, item.id);
    }
  }
};

const arrayToTree = (data, pid) => {
  const result = [];
  getChildren(data, result, pid);
  return result;
};

// [
//     {
//       id: 1,
//       name: '部门1',
//       pid: 0,
//       children: [
//         { id: 2, name: '部门2', pid: 1, children: [] },
//         {
//           id: 3,
//           name: '部门3',
//           pid: 1,
//           children: [
//             {
//               id: 4,
//               name: '部门4',
//               pid: 3,
//               children: [
//                 {
//                   id: 5,
//                   name: '部门5',
//                   pid: 4,
//                   children: []
//                 }
//               ]
//             }
//           ]
//         }
//       ]
//     }
//   ]

const arrayToTree2 = (items) => {
  const result = [];
  const itemMap = {};
  for (const item of items) {
    itemMap[item.id] = { ...item, children: [] };
  }
  for (const item of items) {
    const { id, pid } = item;
    const treeItem = itemMap[id];
    if (pid === 0) {
      result.push(treeItem);
    } else {
      if (!itemMap[pid]) {
        itemMap[pid] = {
          children: [],
        };
      }
      itemMap[pid].children.push(treeItem);
    }
  }
  return result;
};
