
import React,{Component} from "react";
import {NavBar,List,WingBlank,WhiteSpace,InputItem,Radio,Button} from "antd-mobile"
import {reqLogin} from "../../api/index"
import Logo from "../../components/logo/logo"
/*
*注册路由的组件
*
* */
export default class Register extends Component {
  state={
    username:"",
    password:"",
  }


  toRegister =() =>{
    this.props.history.replace("/register")
  };

  Login =()=>{
    reqLogin(this.state)
  }

  handleChange =(name,val)=>{
    this.setState({
      [name]:val
    })
  }
  render(){
    return (
      <div>
        <NavBar>用户登录</NavBar>
        <Logo/>
        <WingBlank>
          <List>
            <InputItem type="text" placeholder="请输入用户名"
                       onChange={(val)=>this.handleChange("username",val)}>用户名：</InputItem>
            <WhiteSpace/>
            <InputItem type="password" placeholder="请输入密码"
                       onChange={(val)=>this.handleChange("password",val)}>密码：</InputItem>
            <WhiteSpace/>
            <Button type="primary" onClick={this.Login}>登&nbsp;&nbsp;&nbsp;录</Button>
            <WhiteSpace/>
            <Button onClick={this.toRegister}>没有用户</Button>
          </List>
        </WingBlank>
      </div>
    )
  }
}