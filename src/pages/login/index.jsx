import React, { Component } from 'react';
import { Row, Col, Input, Icon, Button, message } from 'antd';
import { setAuthority } from '../../utils/authority';
import { reloadAuthorized } from '../../utils/Authorized';
import router from 'umi/router';
import { connect } from 'dva';


const USER_ICON = <Icon type="user" />;
const PASSWORD_ICON = <Icon type="lock" />;

const InputReg = { userName: '', password: '' };

class Login extends Component {
    render() {
        return (
            <div>
                <Row style={{ marginTop: 50 }}>
                    <Col md={7} />
                    <Col xs={24} md={10}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Input
                                style={{ width: 354 }}
                                allowClear
                                addonBefore={USER_ICON}
                                placeholder='请输入用户名'
                                onChange={this.handleUserNameChange}
                            />
                        </div>
                    </Col>
                    <Col md={7} />
                </Row>
                <Row style={{ marginTop: 15 }}>
                    <Col md={7} />
                    <Col xs={24} md={10}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Input
                                type='password'
                                style={{ width: 354 }}
                                allowClear
                                addonBefore={PASSWORD_ICON}
                                placeholder='请输入密码'
                                onChange={this.handlePasswordChange}
                            />
                        </div>
                    </Col>
                    <Col md={7} />
                </Row>
                <Row style={{ marginTop: 30 }}>
                    <Col md={7} />
                    <Col xs={24} md={10}>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Button onClick={this.login} style={{ width: 354 }} type='primary'>登 陆</Button>
                        </div>
                    </Col>
                    <Col md={7} />
                </Row>
            </div>
        );
    }

    handleUserNameChange = (e) => {
        const { value } = e.target;
        InputReg.userName = value;
    }

    handlePasswordChange = (e) => {
        const { value } = e.target;
        InputReg.password = value;
    }

    login = () => {
        const { dispatch } = this.props;
        dispatch({
            type: 'login/login',
            payload: {
                name: InputReg.userName,
                password: InputReg.password
            }
        });
    }
}

export default connect(({ login }) => ({
    login,
}))(Login);