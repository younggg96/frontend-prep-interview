// Requirements
// The component should be reusable
//  show hierarchy
//  Expand/Collapase items
//  Expand/Collapase all
//  highlight Search result
//  clear the search result
//  support a11ly

import React, { createContext, useContext, useEffect, useReducer } from "react";
import "./styles.css";

interface TreeNode {
  id: string;
  label: string;
  children?: TreeNode[];
  isExpanded?: boolean;
}

const treeData = [
  {
    id: 1,
    label: "1",
    children: [
      { id: 2, label: "1.1" },
      {
        id: 3,
        label: "1.2",
        children: [{ id: 4, label: "1.2.1" }],
      },
    ],
  },
  {
    id: 5,
    label: "2",
    children: [
      {
        id: 6,
        label: "2.1",
        children: [{ id: 7, label: "2.1.1" }],
      },
      {
        id: 8,
        label: "3.1",
        children: [
          { id: 9, label: "3.1.1" },
          { id: 10, label: "3.1.2" },
        ],
      },
    ],
  },
];

const TreeStateContext = createContext(null);

const toggleNode = (
  nodes: TreeNode[],
  id: string,
  isExpanded: boolean
): TreeNode[] => {
  return nodes.map((node) => {
    if (node.id === id) {
      return { ...node, isExpanded };
    }
    if (node.children) {
      return { ...node, children: toggleNode(node.children, id, isExpanded) };
    }
    return node;
  });
};

const toggleAllNodes = (nodes: TreeNode[], isExpanded: boolean): TreeNode[] => {
  return nodes.map((node) => ({
    ...node,
    isExpanded,
    children: node.children ? toggleAllNodes(node.children, isExpanded) : [],
  }));
};

const TreeProvider = ({ children }: any) => {
  const [state, dispatch] = useReducer((state: TreeNode[], action: any) => {
    switch (action.type) {
      case "INIT_DATA":
        return action.data;
      case "TOGGLE_NODE":
        return toggleNode(state, action.id, action.isExpanded);
      case "EXPAND_ALL":
        return toggleAllNodes(state, true);
      case "COLLAPSE_ALL":
        return toggleAllNodes(state, false);
      default:
        return state;
    }
  }, treeData);

  return (
    <TreeStateContext.Provider value={{ state, dispatch }}>
      {children}
    </TreeStateContext.Provider>
  );
};

const useTreeState = () => {
  const context = useContext(TreeStateContext);
  if (!context) {
    throw new Error("useTreeState must be used within a TreeProvider");
  }
  return context;
};

const TreeNodeComponent = ({
  node,
  searchTerm,
}: {
  node: TreeNode;
  searchTerm: string;
}) => {
  const { dispatch } = useTreeState();

  const onToggle = () => {
    dispatch({
      type: "TOGGLE_NODE",
      id: node.id,
      isExpanded: !node.isExpanded,
    });
  };

  // 高亮文本
  const highlightText = (text: string, highlight: string) => {
    if (!highlight) return text;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return parts.map((part, i) => (
      <span
        key={i}
        style={
          part.toLowerCase() === highlight.toLowerCase()
            ? { backgroundColor: "yellow" }
            : {}
        }
      >
        {part}
      </span>
    ));
  };

  return (
    <div key={node.id} style={{ marginLeft: 20 }}>
      {node.children && (
        <button onClick={onToggle}>{node.isExpanded ? "close" : "open"}</button>
      )}
      <span>{highlightText(node.label, searchTerm)}</span>
      {node.isExpanded && node.children && (
        <div>
          {node.children.map((childNode) => (
            <TreeNodeComponent
              key={childNode.id}
              node={childNode}
              searchTerm={searchTerm}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const TreeView = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const { state, dispatch } = useTreeState();

  const handleExpandAll = () => {
    dispatch({ type: "EXPAND_ALL" });
  };

  const handleCollapseAll = () => {
    dispatch({ type: "COLLAPSE_ALL" });
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={onChangeHandler}
      />
      <div>
        <button onClick={handleExpandAll}>Expand All</button>
        <button onClick={handleCollapseAll}>Collapse All</button>
      </div>
      <div>
        {state.map((node: TreeNode) => (
          <TreeNodeComponent
            key={node.id}
            node={node}
            searchTerm={searchTerm}
          />
        ))}
      </div>
    </>
  );
};

export default function App() {
  return (
    <TreeProvider>
      <div className="App">
        <TreeView />
      </div>
    </TreeProvider>
  );
}

