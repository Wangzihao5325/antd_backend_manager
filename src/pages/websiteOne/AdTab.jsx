import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, List, Skeleton, Avatar, Button, Modal, Tag } from 'antd';
import AdConfig from '@/components/adConfig/index';


class AdTab extends Component {
    state = {
        adlist: [],
        adlistStoreReg: [],
        modelVisable: false,
        confirmLoading: false,
        nowSelect: -1,
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.adlist !== prevState.adlistStoreReg) {
            return {
                adlistStoreReg: nextProps.adlist,
                adlist: nextProps.adlist
            }
        }
        return null;
    }

    render() {
        let { modelVisable, confirmLoading } = this.state;
        return (
            <div>
                <Row type="flex" justify="end">
                    <Col>
                        <Button onClick={() => this.editItem(-1)} type="dashed">+ 添加广告</Button>
                        <Button style={{ marginLeft: 10 }} onClick={() => this.editItem(-1)} type="primary">提交修改</Button>
                        <Button style={{ marginLeft: 10 }} onClick={() => this.editItem(-1)} type="danger">放弃修改</Button>
                    </Col>
                </Row>
                <List
                    itemLayout='horizontal'
                    dataSource={this.state.adlist}
                    renderItem={(item, index) => (
                        <List.Item actions={[<a onClick={() => this.editItem(index)}>edit</a>, <a onClick={() => this.deleteitem(index)}>delete</a>]}>
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src={item.ad_image_path} />
                                    }
                                    title={<div ><Tag color='blue'>{`id: ${item.id}`}</Tag> <Tag color='geekblue'>{`sort: ${item.sort}`}</Tag><Tag color={item.status ? 'green' : 'orange'}>{item.status ? '展示中' : '隐藏中'}</Tag></div>}
                                    description={item.href}
                                />
                            </Skeleton>
                        </List.Item>
                    )}
                />
                <Modal
                    title="广告项配置"
                    visible={modelVisable}
                    onOk={this.handleOk}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <AdConfig ref={(ref) => this.AdConfig = ref} />
                </Modal>
            </div>
        );
    }

    handleOkCallback = () => {
        this.setState({
            modelVisable: false,
            confirmLoading: false,
            nowSelect: -1
        }, () => {
            let { dispatch } = this.props;
            dispatch({
                type: 'websiteOne/getAdList',
                payload: {
                    Page: 1,
                    Limit: 15
                }
            });
        });
    }

    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        if (this.AdConfig) {
            this.AdConfig.submit(this.handleOkCallback);
        }
    };

    handleCancel = () => {
        this.setState({
            modelVisable: false,
            nowSelect: -1
        });
    };

    editItem = (index) => {
        this.setState({
            modelVisable: true,
            nowSelect: index
        });
    }

    deleteitem = (index) => {
        console.log(index);
    }
}

export default connect(({ websiteOne }) => ({
    adlist: websiteOne.adlist
}))(AdTab);