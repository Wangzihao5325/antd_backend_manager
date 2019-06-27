import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Form, Card } from 'antd';
import TableForm from '@/pages/form/advanced-form/components/TableForm';

const tableData = [
    {
        key: '1',
        status: '1',
        name: '百度',
        sort: '10',
        href: 'http://www.baidu.com'
    },
    {
        key: '2',
        status: '0',
        name: 'google',
        sort: '1',
        href: 'http://www.google.com'
    },
    {
        key: '3',
        status: '1',
        name: 'youtube',
        sort: '7',
        href: 'http://www.youtube.com'
    },
];

class FormWithWrapper extends Component {
    render() {
        const {
            form: { getFieldDecorator }
        } = this.props;
        let cardArr = this.props.initData.map((item, index) => {
            return (
                <Card style={{ marginTop: 20 }} key={item.id} title={item.title} bordered={false}>
                    {getFieldDecorator(`${item.id}`, {
                        initialValue: item.websites,
                    })(<TableForm />)}
                </Card>
            );
        });
        return (
            cardArr
        );
    }
}

const MyForm = Form.create({ name: 'dynamic_form_item' })(FormWithWrapper);

class ModuleTab extends Component {

    componentDidMount() {
        let { dispatch } = this.props;
        dispatch({
            type: 'websiteOne/getModuleList'
        });
    }

    render() {
        let { modulelist = [] } = this.props;
        return (
            <div>
                <Row style={{ marginBottom: 15 }} type="flex" justify="end">
                    <Col>
                        <Button onClick={this.handleSth} type="dashed">+ 添加模块</Button>
                        <Button style={{ marginLeft: 10 }} onClick={this.handleSth} type="primary">提交修改</Button>
                        <Button style={{ marginLeft: 10 }} onClick={this.handleSth} type="danger">放弃修改</Button>
                    </Col>
                </Row>

                <MyForm initData={modulelist} />
            </div>
        );
    }

    handleSth = () => {
        this.form.submit1();
    }
}

export default connect(({ websiteOne }) => ({
    modulelist: websiteOne.modulelist
}))(ModuleTab);