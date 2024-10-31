import React, { createContext, useContext } from 'react';

// 创建 UserContext
const UserContext = createContext(null);

// 创建一个 UserProvider 组件，用于提供上下文值
const UserProvider = ({ children }) => {
  const user = { name: 'John Doe', age: 30 }; // 假设这是要共享的用户数据

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
};

// 在 UserProfile 组件中使用 useContext 来获取 UserContext 的值
const UserProfile = () => {
  const user = useContext(UserContext);

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
};

// 主应用组件
const UserContextExample = () => {
  return (
    <UserProvider>
      <UserProfile />
    </UserProvider>
  );
};

export default UserContextExample;
