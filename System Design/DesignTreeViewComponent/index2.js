const treeData = [
  {
    id: 1,
    label: "Node 1",
    children: [
      { id: 2, label: "Node 1.1" },
      {
        id: 3,
        label: "Node 1.2",
        children: [{ id: 4, label: "Node 1.2.1" }],
      },
    ],
  },
  {
    id: 5,
    label: "Node 2",
    children: [
      {
        id: 6,
        label: "Node 2.1",
        children: [{ id: 7, label: "Node 2.1.1" }],
      },
    ],
  },
];

// interface treeNode {
//     id: string;
//     label: string;
//     isExpanded: boolean;
//     children: treeNode;
// }

const TreeNode = (node) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <p>{node.label}</p>
      <button onClick={() => setOpen(!open)}>{!open ? "open" : "close"}</button>
      {node.children && open && <TreeView nodes={node.children} />}
    </div>
  );
};

const TreeView = (nodes) => {
  return (
    <div>
      {nodes.map((node) => {
        return (
          <>
            <TreeNode node={node} key={node.id} />
          </>
        );
      })}
    </div>
  );
};

const App = () => {
  return <div class="app">
    <TreeView  nodes={treeData}/>
  </div>;
};
