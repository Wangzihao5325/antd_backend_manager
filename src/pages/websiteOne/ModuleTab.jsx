import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Button, Form, Card, List, Icon, Typography, Modal, Input, Table, Divider, Popconfirm, message as Message } from 'antd';
import TableForm from '@/pages/form/advanced-form/components/TableForm';
import styles from './style.less';
import { submitModuleInfo } from '@/services/websiteOne';
import _ from 'lodash';

const { Paragraph } = Typography;

class ModuleInfoConfig extends Component {
    constructor(props) {
        super(props);
        this.titleChange = this.handleInputChangeGen('title');
        this.introChange = this.handleInputChangeGen('intro');
        this.sortChange = this.handleInputChangeGen('sort');
        this.statusChange = this.handleInputChangeGen('status');
    }

    state = {
        data: { intro: '', sort: 0, status: 0, title: '', websites: [] },
        dataReg: { intro: '', sort: 0, status: 0, title: '', websites: [] }
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

class FormWithWrapper extends Component {

    cacheOriginData = {};

    columns = [
        {
            title: '网站名称',
            dataIndex: 'title',
            key: 'title',
            render: (text, record, index) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            autoFocus
                            onChange={e => this.handleFieldChange(e, 'title', record)}
                            //onKeyPress={e => this.handleKeyPress(e, record.key)}
                            placeholder="网站名称"
                        />
                    );
                }
                return text;
            },
        },
        {
            title: '网站链接',
            dataIndex: 'href',
            key: 'href',
            render: (text, record, index) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            autoFocus
                            onChange={e => this.handleFieldChange(e, 'href', record)}
                            //onKeyPress={e => this.handleKeyPress(e, record.key)}
                            placeholder="网站名称"
                        />
                    );
                }
                return text;
            },
        },
        {
            title: '是否开启(1:开启 0:关闭)',
            dataIndex: 'status',
            key: 'status',
            render: (text, record, index) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            autoFocus
                            onChange={e => this.handleFieldChange(e, 'status', record)}
                            //onKeyPress={e => this.handleKeyPress(e, record.key)}
                            placeholder="网站名称"
                        />
                    );
                }
                return text;
            },
        },
        {
            title: '排序号',
            dataIndex: 'sort',
            key: 'sort',
            render: (text, record, index) => {
                if (record.editable) {
                    return (
                        <Input
                            value={text}
                            autoFocus
                            onChange={e => this.handleFieldChange(e, 'sort', record)}
                            //onKeyPress={e => this.handleKeyPress(e, record.key)}
                            placeholder="网站名称"
                        />
                    );
                }
                return text;
            },
        }, {
            title: '操作',
            key: 'action',
            render: (text, record, index) => {
                const { loading } = this.state;
                if (!!record.editable && loading) {
                    return null;
                }
                if (record.editable) {
                    if (record.isNew) {
                        return (
                            <span>
                                <a onClick={e => this.saveRow(e, record)}>添加</a>
                                <Divider type="vertical" />
                                <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record)}>
                                    <a>删除</a>
                                </Popconfirm>
                            </span>
                        );
                    }
                    return (
                        <span>
                            <a onClick={e => this.saveRow(e, record)}>保存</a>
                            <Divider type="vertical" />
                            <a onClick={e => this.cancelNew(e, record)}>取消</a>
                        </span>
                    );
                }
                return (
                    <span>
                        <a onClick={e => this.toggleEditable(e, record, index)}>编辑</a>
                        <Divider type="vertical" />
                        <Popconfirm title="是否要删除此行？" onConfirm={() => this.remove(record)}>
                            <a>删除</a>
                        </Popconfirm>
                    </span>
                );
            },
        },
    ];

    handleFieldChange = (e, key, item) => {
        e.preventDefault();
        let { value } = e.target;

        let idReg = item.id;
        let { websites } = this.state;
        let newWebsites = websites.map(item => ({ ...item }));
        let originItem = newWebsites.filter((item) => { return item.id === idReg })[0];
        if (originItem) {
            originItem[key] = value;
            this.setState({ websites: newWebsites });
        }

    }

    remove = (item) => {
        let id = item.id;
        let { dispatch } = this.props;
        dispatch({
            type: 'websiteOne/removeWebsite',
            payload: { id }
        });
    }

    toggleEditable = (e, item, index) => {
        e.preventDefault();
        this.cacheOriginData = item;
        let idReg = item.id;
        let { websites } = this.state;
        let newWebsites = websites.map(item => ({ ...item }));
        let originItem = newWebsites.filter((item) => { return item.id === idReg })[0];
        if (originItem) {
            originItem.editable = !originItem.editable;
            let str = JSON.stringify(newWebsites);
            this.setState({ websites: JSON.parse(str) });
            this.forceUpdate();
        }
    }

    state = {
        selectItem: { intro: '', sort: 0, status: 0, title: '', websites: [] },
        selectItemReg: { intro: '', sort: 0, status: 0, title: '', websites: [] },
        websites: [],
        websitesReg: [],
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.selectItem !== prevState.selectItem) {
            return {
                selectItem: nextProps.selectItem,
                selectItemReg: nextProps.selectItem,
                websites: [...nextProps.selectItem.websites],
                websitesReg: [...nextProps.selectItem.websites],
            }
        }
        return null;
    }

    render() {
        let { websites } = this.state;
        return (
            <div>
                <Table
                    columns={this.columns}
                    dataSource={websites}
                    pagination={false}
                />
                <Button
                    style={{ width: '100%', marginTop: 16, marginBottom: 8 }}
                    type="dashed"
                    onClick={this.newMember}
                    icon="plus"
                >
                    新增成员
                </Button>
            </div>
        );
    }

    newMember = () => {
        let { websites } = this.state;
        let newWebsite = [...websites];
        newWebsite.push({ type_id: this.state.selectItem.type_id, href: '', title: '', status: 0, sort: 0, editable: true });
        this.setState({
            websites: newWebsite,
        });
    }

    cancelNew = (e, item) => {
        if (item.id) {
            let idReg = item.id;
            let { websites, websitesReg } = this.state;
            let newWebsites = websites.map(item => ({ ...item }));
            let originItem = newWebsites.filter((item) => { return item.id === idReg })[0];
            let originItemReg = websitesReg.filter((item) => { return item.id === idReg })[0];
            if (originItem && originItemReg) {
                originItem.title = originItemReg.title;
                originItem.href = originItemReg.href;
                originItem.status = originItemReg.status;
                originItem.sort = originItemReg.sort;
                originItem.editable = false;
                this.setState({ websites: newWebsites });
            }
        } else {
            let { websites } = this.state;
            let newWebsite = [...websites];
            newWebsite.pop();
            this.setState({
                websites: newWebsite,
            });
        }
    }
}

const WebsiteInfoConfig = Form.create({ name: 'dynamic_form_item' })(FormWithWrapper);

class ModuleTab extends Component {

    state = {
        moduleInfoVisable: false,
        websiteInfoVisable: false,
        confirmLoading: false,
        selectItem: { intro: '', sort: 0, status: 0, title: '', websites: [] },
        modelType: 'new',
        modulelistReg: []
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.modulelist !== prevState.modulelistReg) {
            if (typeof prevState.selectItem.id === 'number') {
                let newSelectItem = nextProps.modulelist.filter((item) => { return item.id === prevState.selectItem.id })[0];
                return {
                    modulelistReg: nextProps.modulelist,
                    selectItem: newSelectItem
                }
            } else {
                return {
                    modulelistReg: nextProps.modulelist
                }
            }
        }
        return null;
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
                                        actions={[<a onClick={() => this.itemModifyClick(item)} key="option1">修改</a>, <a onClick={() => this.itemWebsiteClick(item)} key="option1">配置</a>, <a onClick={() => this.itemDeleteClick(item)} key="option2">删除</a>]}
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

                <Modal
                    title={this.state.selectItem.title}
                    width={1020}
                    visible={this.state.websiteInfoVisable}
                    onOk={this.webSiteConfigOk}
                    confirmLoading={this.state.confirmLoading}
                    onCancel={this.websiteConfigCancel}
                >
                    <WebsiteInfoConfig dispatch={dispatch} selectItem={this.state.selectItem} />
                </Modal>
            </div >
        );
    }

    itemWebsiteClick = (item) => {
        this.setState({
            websiteInfoVisable: true,
            selectItem: item
        });
    }

    webSiteConfigOk = () => {
        this.setState({
            websiteInfoVisable: false
        });
    }

    websiteConfigCancel = () => {
        this.setState({
            websiteInfoVisable: false
        });
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
            selectItem: { intro: '', sort: 0, status: 0, title: '', websites: [] },
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