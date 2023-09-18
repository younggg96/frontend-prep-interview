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

const TreeView = ({ data, level = 0 }) => {
  return (
    <>
      {data.map((item, index) => {
        const level = item.id.length;
        console.log()
        return (
          <div key={item.id}>
            <span>{"-".repeat(level)}</span>
            <span>{item.name}</span>
            {item.children && item.children ? (
              <TreeView data={item.children} level={level + 1}></TreeView>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </>
  );
};

export default function FileSystem() {
  return (
    <div>
      <TreeView data={treeData} />
    </div>
  );
}
