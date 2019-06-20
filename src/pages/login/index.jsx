import React, { Component } from 'react';
import { Row, Col } from 'antd';
export default class Login extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col md={7} />
                    <Col xs={24} md={10}>
                        <div style={{ flex: 1, backgroundColor: 'rgb(34,34,34)' }}>111</div>
                    </Col>
                    <Col md={7} />
                </Row>
            </div>
        );
    }
}