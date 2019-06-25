import React, { Component } from 'react';
import { Row, Col, Input, Switch, Icon, Upload, message } from 'antd';
import SERVICES from '../../../config/serviceConfig';
import { uploadPic, addAd } from '@/services/websiteOne';

export default class AdConfig extends Component {
    state = {
        loading: false,
        linkAddress: '',
        sortNum: '',
        isAdShow: true,
        imageUrl: null,
        imageData: null,
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { linkAddress, sortNum, isAdShow, imageUrl, imageData } = this.state;
        return (
            <div>
                <Row type="flex" justify="center">
                    <Col xs={24} md={22}>
                        <p>广告跳转地址:</p>
                        <Input
                            //style={{ width: INPUT_WIDTH }}
                            value={linkAddress}
                            onChange={this.adLinkChangeHandle}
                        />
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col style={{ marginTop: 10 }} xs={24} md={10}>
                        <p>排序编号(数字越大排序越靠前):</p>
                        <Input
                            //style={{ width: INPUT_WIDTH }}
                            value={sortNum}
                            onChange={this.sortNumChangeHandel}
                        />
                    </Col>
                    <Col xs={0} md={2} />
                    <Col style={{ marginTop: 10 }} xs={24} md={10}>
                        <p>是否展示:</p>
                        <Switch checkedChildren="开" unCheckedChildren="关" checked={isAdShow} onClick={this.switchChange} />
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }} type="flex" justify="center">
                    <Col xs={24} md={22}>
                        <Upload
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            customRequest={this.customRequest}
                            onRemove={this.handleRemove}
                        >
                            {imageData ? <img style={{ height: 102, width: 102 }} className='uploadImage' src={imageData} alt="avatar" /> : uploadButton}
                        </Upload>
                    </Col>
                </Row>
            </div>
        );
    }

    submit = (callback) => {
        let { imageUrl, linkAddress, sortNum, isAdShow } = this.state;
        let payload = {
            sortNum,
            imageUrl: imageUrl,
            adLink: linkAddress,
            status: isAdShow ? 1 : 0
        };
        addAd(payload, (result, code, message) => {
            if (code === 1 && callback) {
                callback();
            }
        });
    }

    customRequest = (files) => {
        message.loading('正在上传图片请稍后', 0);
        const { file } = files;
        uploadPic(file, (imageRef) => {
            console.log(imageRef);
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (e) => {
                this.setState({
                    imageData: e.target.result,
                    imageUrl: imageRef
                }, () => {
                    message.destroy();
                    message.success('上传成功');
                });
            }
        });
    }

    switchChange = () => {
        this.setState((preState) => {
            return {
                isAdShow: !preState.isAdShow
            }
        });
    }

    adLinkChangeHandle = (e) => {
        let { value } = e.target;
        this.setState({
            linkAddress: value
        })
    }

    sortNumChangeHandel = (e) => {
        let { value } = e.target;
        this.setState({
            sortNum: value
        })
    }

}