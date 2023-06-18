import React from 'react';

import {Menu} from 'antd';
import type {MenuProps} from "antd";



export class BlackList extends React.Component {
    constructor(props: {}) {
        super(props);
        this.state = { friends: [] };
    }
    async componentDidMount() {

        const uid = sessionStorage.getItem('uid');
        const params = new URLSearchParams();
        params.append('uid', uid);

        const response = await fetch('http://localhost:8080/getBlack?'+params.toString());
        const data = await response.json();
        this.setState({ friends: data }); }

    handleClick = (e: any) => {
        sessionStorage.setItem('to_uid', e.key);
        this.props.to_user_change(e.key);
    }

    render() {
        return (
            <div className={"friendList"}>
                <Menu items={
                    this.state.friends.map(friend => ({ label: friend.name, key: friend.id }))
                }
                      className={"friends"} mode={'vertical'}
                      onClick={this.handleClick}>

                </Menu>
            </div>
        )
    }
}