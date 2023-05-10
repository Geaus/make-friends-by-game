import React,{Component} from "react";
import "../../css/report.css";

const Button1=(props)=>{
    const {children,loading,submit}=props
    return(
        <button className={'report-button'} onClick={submit} disabled={loading?"disabled":null}>
            {loading&&<i className="loading"></i>}
            {children}
        </button>
    )
}

export default Button1;