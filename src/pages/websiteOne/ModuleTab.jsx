import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Form, Card, List, Icon, Typography, Modal, Input, message as Message } from 'antd';
import TableForm from '@/pages/form/advanced-form/components/TableForm';
import styles from './style.less';
import { submitModuleInfo } from '@/services/websiteOne';

const { Paragraph } = Typography;

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

class ModuleInfoConfig extends Component {
    constructor(props) {
        super(props);
        this.titleChange = this.handleInputChangeGen('title');
        this.introChange = this.handleInputChangeGen('intro');
        this.sortChange = this.handleInputChangeGen('sort');
        this.statusChange = this.handleInputChangeGen('status');
    }

    state = {
        data: {},
        dataReg: {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.dataReg) {
            return {
                data: nextProps.data,
                dataReg: nextProps.data
            }
        }
        return null;
    }

    handleInputChangeGen = (key) => {
        return (e) => {
            let { value } = e.target;
            let { data } = this.state;
            let newData = { ...data };
            newData[key] = value;
            this.setState({
                data: newData
            });
        }
    }

    addSubmit = (callback) => {
        let params = {
            title: this.state.data.title,
            intro: this.state.data.intro,
            status: parseInt(this.state.data.status),
            sort: parseInt(this.state.data.sort)
        };
        let { dispatch } = this.props;
        dispatch({
            type: 'websiteOne/addModule',
            payload: params
        });
        if (callback) {
            callback();
        }
    }

    submit = (callback) => {
        let id = this.state.data.id;
        let params = {
            title: this.state.data.title,
            intro: this.state.data.intro,
            status: parseInt(this.state.data.status),
            sort: parseInt(this.state.data.sort)
        };

        submitModuleInfo(id, params, (e, code, message) => {
            if (callback) {
                callback();
            }
            let { dispatch } = this.props;
            dispatch({
                type: 'websiteOne/getModuleList'
            });
        });

    }

    render() {
        const { title = '', intro = '', sort = 0, status = 0 } = this.state.data;
        return (
            <div>
                <p>模块标题:</p>
                <Input
                    //style={{ width: INPUT_WIDTH }}
                    value={title}
                    onChange={this.titleChange}
                />
                <p style={{ marginTop: 20 }}>模块简介:</p>
                <Input
                    //style={{ width: INPUT_WIDTH }}
                    value={intro}
                    onChange={this.introChange}
                />
                <p style={{ marginTop: 20 }}>排序编码:(越大越靠前)</p>
                <Input
                    //style={{ width: INPUT_WIDTH }}
                    value={sort}
                    onChange={this.sortChange}
                />
                <p style={{ marginTop: 20 }}>是否开启:(1开启0关闭)</p>
                <Input
                    //style={{ width: INPUT_WIDTH }}
                    value={status}
                    onChange={this.statusChange}
                />
            </div>
        );
    }
}

class ModuleTab extends Component {

    state = {
        moduleInfoVisable: false,
        websiteInfoVisable: false,
        confirmLoading: false,
        selectItem: { intro: '', sort: 0, status: 0, title: '' },
        modelType: 'new'
    }

    componentDidMount() {
        let { dispatch } = this.props;
        dispatch({
            type: 'websiteOne/getModuleList'
        });
    }

    render() {
        let { modulelist = [], dispatch } = this.props;
        const nullData = {};
        return (
            <div>
                {/* <Row style={{ marginBottom: 15 }} type="flex" justify="end">
                    <Col>
                        <Button onClick={this.handleSth} type="dashed">+ 添加模块</Button>
                        <Button style={{ marginLeft: 10 }} onClick={this.handleSth} type="primary">提交修改</Button>
                        <Button style={{ marginLeft: 10 }} onClick={this.handleSth} type="danger">放弃修改</Button>
                    </Col>
                </Row>

                <MyForm initData={modulelist} /> */}
                <List
                    grid={{
                        gutter: 16,
                        xs: 1,
                        sm: 2,
                        md: 4,
                        lg: 4,
                        xl: 6,
                        xxl: 3,
                    }}
                    dataSource={[nullData, ...modulelist]}
                    renderItem={(item, index) => {
                        if (item && item.id) {
                            return (
                                <List.Item key={item.id}>
                                    <Card
                                        title={item.title}
                                        hoverable
                                        className={styles.card}
                                        actions={[<a onClick={() => this.itemModifyClick(item)} key="option1">修改</a>, <a key="option1">配置</a>, <a onClick={() => this.itemDeleteClick(item)} key="option2">删除</a>]}
                                    >
                                        <div>{item.intro ? item.intro : '暂无简介'}</div>
                                        <div style={{ height: 1, margin: 24, backgroundColor: 'rgb(0,0,0,0.1)' }} />
                                        <div>{`已配置 ${item.websites.length} 个站`}</div>
                                    </Card>
                                </List.Item>
                            );
                        } else {
                            return (
                                <List.Item>
                                    <Button onClick={this.addNewModule} type="dashed" className={styles.newButton}>
                                        <Icon type="plus" /> 新增模块
                                </Button>
                                </List.Item>
                            );
                        }
                    }}
                />
                <Modal
                    title={this.state.modelType === 'new' ? '新增模块' : "模块信息修改"}
                    visible={this.state.moduleInfoVisable}
                    onOk={this.moduleInfoOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.moduleInfoCancel}
                >
                    <ModuleInfoConfig dispatch={dispatch} ref={ref => this.moduleInfoConfig = ref} data={this.state.selectItem} />
                </Modal>
            </div >
        );
    }

    itemDeleteClick = (item) => {
        Message.loading('正在删除...', 0);
        let id = item.id;
        const { dispatch } = this.props;
        dispatch({
            type: 'websiteOne/deleteModuleById',
            payload: { id }
        });
    }

    itemModifyClick = (item) => {
        this.setState({
            moduleInfoVisable: true,
            selectItem: item,
            modelType: 'modify'
        });
    }

    moduleInfoOk = () => {
        if (this.state.modelType === 'new') {
            if (this.moduleInfoConfig) {
                this.setState({
                    confirmLoading: true
                });
                this.moduleInfoConfig.addSubmit(() => {
                    this.setState({
                        moduleInfoVisable: false,
                        confirmLoading: false,
                    });
                });
            }
        } else {
            if (this.moduleInfoConfig) {
                this.setState({
                    confirmLoading: true
                });
                this.moduleInfoConfig.submit(() => {
                    this.setState({
                        moduleInfoVisable: false,
                        confirmLoading: false,
                    });
                    Message.success('修改成功，正在更新数据...');
                });
            }
        }
    }

    moduleInfoCancel = () => {
        this.setState({
            moduleInfoVisable: false
        });
    }

    addNewModule = () => {
        this.setState({
            moduleInfoVisable: true,
            selectItem: { intro: '', sort: 0, status: 0, title: '' },
            modelType: 'new'
        });
    }

    handleSth = () => {
        this.form.submit1();
    }
}

export default connect(({ websiteOne }) => ({
    modulelist: websiteOne.modulelist
}))(ModuleTab);