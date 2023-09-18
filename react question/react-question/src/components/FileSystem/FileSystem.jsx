// {
//   list: [
//     {
//       id: "1",
//       name: "folder1",
//       children: [
//         {
//           id: "11",
//           name: "file1",
//         },
//         {
//           id: "12",
//           name: "file2",
//         },
//       ],
//     },
//     {
//       id: "2",
//       name: "folder2",
//       children: [
//         {
//           id: "21",
//           name: "folder3",
//           children: [
//             {
//               id: "211",
//               name: "file3",
//             },
//           ],
//         },
//       ],
//     },
//     {
//       id: "3",
//       name: "file4",
//     },
//   ];
// }
import React from "react";

const treeData = [
  {
    id: "1",
    name: "folder1",
    children: [
      {
        id: "11",
        name: "file1",
      },
      {
        id: "12",
        name: "file2",
      },
    ],
  },
  {
    id: "2",
    name: "folder2",
    children: [
      {
        id: "21",
        name: "folder3",
        children: [
          {
            id: "211",
            name: "file3",
          },
        ],
      },
    ],
  },
  {
    id: "3",
    name: "file4",
  },
];

const TreeView = ({ data = treeData, level = 0 }) => {
  return (
    <>
      {treeData.map((item, index) => {
        const level = item.id.length;
        return (
          <div key={index}>
            <span>{"-".repeat(level)}</span>
            <span>{item.name}</span>
            {item.children && item.children ? (
              <TreeView data={item.child} level={level + 1}></TreeView>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </>
  );
};

export default TreeView;
