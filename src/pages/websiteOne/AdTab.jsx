import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, List, Skeleton, Avatar, Button, Modal, Tag, message } from 'antd';
import AdConfig from '@/components/adConfig/index';
import { deleteAd } from '@/services/websiteOne';


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
        let { modelVisable, confirmLoading, nowSelect, adlist } = this.state;
        return (
            <div>
                <Row type="flex" justify="end">
                    <Col>
                        <Button onClick={() => this.editItem(-1)} type="dashed">+ 添加广告</Button>
                    </Col>
                </Row>
                <List
                    itemLayout='horizontal'
                    dataSource={adlist}
                    renderItem={(item, index) => (
                        <List.Item actions={[<a onClick={() => this.editItem(index)}>edit</a>, <a style={{ color: '#f5222d' }} onClick={() => this.deleteitem(index)}>delete</a>]}>
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
                    <AdConfig nowSelect={nowSelect} data={adlist} ref={(ref) => this.AdConfig = ref} />
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
        let id = this.state.adlist[index].id;
        message.loading('正在删除ing...', 0);
        deleteAd(id, () => {
            message.destroy();
            message.success('删除成功，正在更新数据...');
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
}

export default connect(({ websiteOne }) => ({
    adlist: websiteOne.adlist
}))(AdTab);