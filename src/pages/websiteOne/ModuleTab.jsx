import React, { Component } from 'react';
import { Row, Col, Button } from 'antd';
import TableForm from '@/components/TableForm/index';

export default class ModuleTab extends Component {
    render() {
        return (
            <div>
                <Row style={{ marginBottom: 15 }} type="flex" justify="end">
                    <Col>
                        <Button onClick={this.handleSth} type="dashed">+ 添加模块</Button>
                        <Button style={{ marginLeft: 10 }} onClick={this.handleSth} type="primary">提交修改</Button>
                        <Button style={{ marginLeft: 10 }} onClick={this.handleSth} type="danger">放弃修改</Button>
                    </Col>
                </Row>
                <TableForm />
            </div>
        );
    }

    handleSth = () => {

    }
}