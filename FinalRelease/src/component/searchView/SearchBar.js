import React from 'react';
import {  Button, Input, AutoComplete } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {getTag} from "../../service/UserService";
const { Option } = AutoComplete;


function onSelect(value) {
    console.log('onSelect', value);
}

function getRandomInt(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min; // eslint-disable-line no-mixed-operators
}

function searchResult(query) {
    return new Array(getRandomInt(5))
        .join('.')
        .split('.')
        .map((item, idx) => ({
            query,
            category: `${query}${idx}`,
            count: getRandomInt(200, 100),
        }));
}

function renderOption(item) {
    return (
        <Option key={item.category} text={item.category}>
            <div className="global-search-item">
                <span className="global-search-item-desc">
                      Found {item.query} on
                     <a
                         href={`https://s.taobao.com/search?q=${item.query}`}
                         target="_blank"
                         rel="noopener noreferrer"
                     >
                         {item.category}
                     </a>
                </span>
                <span className="global-search-item-count">{item.count} results</span>
            </div>
        </Option>
    );
}

export class SearchBar extends React.Component {

    handleSearch = value => {
        this.setState({
            dataSource: value ? searchResult(value) : [],
        });
    };

    componentDidMount() {
        const callback = (data) => {
            let tags = []
            for(let i = 0; i < data.length; i++) {
                let tag = {id: 0, text: "", clicked: false};
                tag.id = data[i].tagid;
                tag.text = data[i].tagname;
                tags.push(tag);
            }
            this.setState({buttons: tags, dataSource: []})
        }
        getTag(callback)
    }

    handleClick = (id) => {
        this.setState((state) => ({
            buttons: state.buttons.map((button) =>
                button.id === id ? { ...button, clicked: !button.clicked } : button
            ),
        }));
    };

    render() {
        if(this.state == null)return null;
        const { dataSource } = this.state;
        return (
            <div className="global-search-wrapper" style={{ width: "100vw" }}>
                <AutoComplete
                    className="global-search"
                    size="large"
                    style={{ width: '100%',height:'100%'}}
                    dataSource={dataSource.map(renderOption)}
                    onSelect={onSelect}
                    onSearch={this.handleSearch}
                    placeholder="输入ID，昵称，标签来搜索好友"
                    optionLabelProp="text"
                >
                    <Input
                        suffix={
                            <Button
                                className="search-btn"
                                style={{ marginRight: -12 }}
                                size="large"
                                type="primary"
                            >
                                <SearchOutlined/>
                            </Button>
                        }
                    />
                </AutoComplete>

                <div>
                    {this.state.buttons.map((button) => (
                        <Button
                            type="dashed"
                            shape="round"
                            style={{marginRight:20 ,marginBottom:40}}
                            key={button.id}
                            onClick={() => this.handleClick(button.id)}
                        >
                            {button.text} - {button.clicked ? "已添加" : "未添加"}
                        </Button>
                    ))}
                </div>
            </div>
        );
    }
}