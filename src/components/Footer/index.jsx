import React from 'react';
import { Row, Col } from 'antd';
export default () => (
    <Row>
        <Col xs={24} md={0} >
            <div style={{ color: 'rgb(0,0,0,0.45)', textAlign: 'center', marginBottom: 5 }}>Copyright © 2019</div>
        </Col>
        <Col xs={24} md={0} >
            <div style={{ color: 'rgb(0,0,0,0.45)', textAlign: 'center', marginBottom: 30 }}>站群三部出品  ( Based on Antd Pro )</div>
        </Col>
        <Col xs={0} md={24} >
            <div style={{ color: 'rgb(0,0,0,0.45)', textAlign: 'center', marginBottom: 30 }}>Copyright © 2019 站群三部出品  ( Based on Antd Pro )</div>
        </Col>
    </Row>
);