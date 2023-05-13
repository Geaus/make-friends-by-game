import React from 'react';
import {Menu} from 'antd';

interface Friend { id: string; name: string; }
interface FriendListState { friends: Friend[]; }


export class FriendList extends React.Component<{}, FriendListState> {
    constructor(props: {}) {
    super(props);
    this.state = { friends: [] };
    }
    async componentDidMount() {

        const uid = sessionStorage.getItem('uid');
        const params = new URLSearchParams();
        params.append('uid', uid);

        const response = await fetch('http://localhost:8080/getFriends?'+params.toString());
        const data = await response.json();
        this.setState({ friends: data }); }

        handleClick = (e: any) => {
          sessionStorage.setItem('to_uid', e.key);
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