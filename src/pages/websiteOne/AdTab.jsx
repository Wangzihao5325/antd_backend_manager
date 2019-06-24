import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, List, Skeleton, Avatar, Button, Modal } from 'antd';
import AdConfig from '@/components/adConfig/index';


class AdTab extends Component {
    state = {
        data: [{ name: { last: '111' } }, { name: { last: '222' } }, { name: { last: '222' } }],
        modelVisable: false,
        confirmLoading: false,
        nowSelect: -1,
    }

    render() {
        let { modelVisable, confirmLoading } = this.state;
        return (
            <div>
                <Row>
                    <Col>
                        <Button onClick={() => this.editItem(-1)} type="dashed">+ 添加广告</Button>
                        <Button style={{ marginLeft: 10 }} onClick={() => this.editItem(-1)} type="primary">提交修改</Button>
                        <Button style={{ marginLeft: 10 }} onClick={() => this.editItem(-1)} type="danger">放弃修改</Button>
                    </Col>
                </Row>
                <List
                    itemLayout='horizontal'
                    dataSource={this.state.data}
                    renderItem={(item, index) => (
                        <List.Item actions={[<a onClick={() => this.editItem(index)}>edit</a>, <a onClick={() => this.deleteitem(index)}>delete</a>]}>
                            <Skeleton avatar title={false} loading={item.loading} active>
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                                    }
                                    title={<div >{item.name.last}</div>}
                                    description="Ant Design, a design language for background applications, is refined by Ant UED Team"
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
                    <AdConfig />
                </Modal>
            </div>
        );
    }

    handleOk = () => {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                modelVisable: false,
                confirmLoading: false,
                nowSelect: -1
            });
        }, 2000);
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
    webSiteGlobalConfig: websiteOne.webSiteGlobalConfig
}))(AdTab);