import React from 'react';
import {PropTypes} from "prop-types";
import "../../css/Emoji.css"

//https://github.com/junhaideng/github-icons
class Emoji extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
        this.handleEmojiClick = this.handleEmojiClick.bind(this)
    }

    // 点击表情之后应该添加到输入框中
    handleEmojiClick(emoji) {
        this.props.handleEmojiClick(emoji)
    }

    render() {
        const emojis = ["😊", "😃", "😏", "😍", "😘", "😚", "😳", "😌", "😆", "😁", "😉", "😜", "😝", "😀", "😗", "😙", "😛", "😴", "😟", "😦", "😧", "😮", "😬", "😕", "😯", "😑", "😒", "😅", "😓", "😥", "😩", "😔", "😞", "😖", "😨", "😰", "😣", "😢", "😭", "😂", "😲", "😱", "😫", "😠", "😤", "😪", "😋", "😷", "😎", "😵", "👿", "😈", "😐", "😶", "👍", "👍", "👎", "👎", "👌", "👊", "👊", "✊", "✌", "👋", "✋", "✋", "👐", "☝", "👇", "👈", "👉", "🙌", "🙏", "👆", "👏", "💪", "🤘"]
        const items = emojis.map((value, index) => <li key={index} onClick={this.handleEmojiClick.bind(this, value)}
                                                       className={"chat-room-emoji-list-item"}>{value}</li>)
        return <>
            <div className="chat-room-emoji-list">
                {items}
            </div>
        </>
    }


}

Emoji.propTyps = {
    handleEmojiClick: PropTypes.func.isRequired
}

export default Emoji