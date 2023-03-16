import React from "react";
import { Menu } from "antd";
function getItem(label, key, children) {
    return {
        key,
        children,
        label
    };
}

const items = [
    getItem('预览个人主页','1'),
    getItem('设置', '2', [
        getItem('修改个人主页','3'),
        getItem('账户信息', '4'),
        getItem('隐私', '5'),
    ])
]

export class ProfileMenu extends React.Component {
    render() {
        return (
            <div>
                <Menu
                    mode={'inline'}
                    theme={"dark"}
                    defaultSelectedKeys={['sub1']}
                    items={items}
                />
            </div>
        )
    }
}