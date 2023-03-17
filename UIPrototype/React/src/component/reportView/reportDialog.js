import { Content } from "antd/es/layout/layout";
import React,{Input} from "antd";
import "../../css/report.css";
const {TextArea} = Input

const Dialog=(props)=>{
    const {message,close}=props;

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        console.log(e);
      };

    return(
        <div className="dialog-backdrop">
            <div className="dialog-container">
            <div className="dialog-header"></div>
                <div className="dialog-body">被举报用户：</div>
                <Content className="inputBox">
                   <TextArea className="inputBox" 
                   allowClear onChange={onChange}
                   showCount 
                   maxLength={20}></TextArea>
                </Content>
                <div className="dialog-body">被举报原因：</div>
                <Content className="inputBox">
                <TextArea className="inputBox" 
                   allowClear onChange={onChange}
                   showCount 
                   maxLength={200}></TextArea>
                </Content>
                <div className="dialog-body">证据描述：</div>
                <Content className="inputBox">
                <TextArea className="inputBox" 
                   allowClear onChange={onChange} ></TextArea>
                </Content>
                <div className="dialog-footer">
                    <button className="btn" onClick={close}>提交</button>
                    <button className="btn" onClick={close}>退出</button>
                </div>
            </div>
        </div>
    )

}
export default Dialog;