import React, { useState } from 'react';

// 定义一个模拟的用户数据数组
const mockUsers = [
    { id: 1, name: 'Alice', email: 'alice@example.com', status: 'active' },
    { id: 2, name: 'Bob', email: 'bob@example.com', status: 'active' },
    { id: 3, name: 'Charlie', email: 'charlie@example.com', status: 'banned' },
];

// 定义一个 UserList 组件，用来显示用户列表和操作按钮
const UserList = () => {
    // 定义一个 state 来存储用户数据
    const [users, setUsers] = useState(mockUsers);

    // 定义一个函数来处理添加用户的操作
    const handleAddUser = () => {
        // 创建一个新的用户对象，使用随机数作为 id 和姓名
        const newUser = {
            id: Math.floor(Math.random() * 1000),
            name: `User${Math.floor(Math.random() * 1000)}`,
            email: `user${Math.floor(Math.random() * 1000)}@example.com`,
            status: 'active',
        };
        // 更新 state，将新的用户对象添加到数组中
        setUsers([...users, newUser]);
    }
    // 定义一个函数来处理删除用户的操作
    const handleDeleteUser = (id) => {
        // 更新 state，过滤掉要删除的用户对象
        setUsers(users.filter((user) => user.id !== id));
    };

    // 定义一个函数来处理封禁用户的操作
    const handleBanUser = (id) => {
        // 更新 state，将要封禁的用户对象的 status 属性改为 'banned'
        setUsers(
            users.map((user) =>
                user.id === id ? { ...user, status: 'banned' } : user
            )
        );
    };

    return (
        <div>
            <h1>用户列表</h1>
            <button onClick={handleAddUser}>添加用户</button>
            <table>
                <thead>
                <tr>
                    <th>姓名</th>
                    <th>邮箱</th>
                    <th>状态</th>
                    <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.status}</td>
                        <td>
                            {user.status === 'active' && (
                                <button onClick={() => handleBanUser(user.id)}>
                                    封禁
                                </button>
                            )}
                            {user.status === 'banned' && (
                                <span style={{ color: 'red' }}>已封禁</span>
                            )}
                            <button onClick={() => handleDeleteUser(user.id)}>
                                删除
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

// 导出 UserList 组件
export default UserList;