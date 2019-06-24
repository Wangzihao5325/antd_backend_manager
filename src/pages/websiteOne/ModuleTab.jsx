import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';

export default class ModuleTab extends Component {
    render() {
        return (
            <div>
                <Row type="flex" justify="end">
                    <Col>
                        <Button onClick={this.handleSth} type="dashed">+ 添加模块</Button>
                        <Button style={{ marginLeft: 10 }} onClick={this.handleSth} type="primary">提交修改</Button>
                        <Button style={{ marginLeft: 10 }} onClick={this.handleSth} type="danger">放弃修改</Button>
                    </Col>
                </Row>
            </div>
        );
    }

    handleSth = () => {

    }
}