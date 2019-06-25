import React, { Component } from 'react';
import { Row, Col, Input, Switch, Icon, Upload, message } from 'antd';
import SERVICES from '../../../config/serviceConfig';
import { uploadPic, addAd, modifyAd } from '@/services/websiteOne';

export default class AdConfig extends Component {
    state = {
        dataReg: [],
        nowSelectReg: -1,
        loading: false,
        linkAddress: '',
        sortNum: '',
        isAdShow: true,
        imageUrl: null,
        imageData: null,
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.data !== prevState.dataReg || nextProps.nowSelect !== prevState.nowSelectReg) {
            if (nextProps.nowSelect === -1) {
                return {
                    dataReg: nextProps.data,
                    nowSelectReg: nextProps.nowSelect,
                    linkAddress: '',
                    sortNum: '',
                    isAdShow: true,
                    imageUrl: null,
                    imageData: null,
                }
            } else {
                let indexData = nextProps.data[nextProps.nowSelect];
                return {
                    dataReg: nextProps.data,
                    nowSelectReg: nextProps.nowSelect,
                    linkAddress: indexData.href,
                    sortNum: indexData.sort,
                    isAdShow: indexData.status === 1 ? true : false,
                    imageUrl: indexData.ad_image_path,
                    imageData: indexData.ad_image_path,
                }
            }
        }
        return null;
    }

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
        let { imageUrl, linkAddress, sortNum, isAdShow, nowSelectReg } = this.state;
        let payload = {
            sortNum,
            imageUrl: imageUrl,
            adLink: linkAddress,
            status: isAdShow ? 1 : 0,
        };
        if (nowSelectReg == -1) {
            message.loading('正在添加...!', 0);
            addAd(payload, (result, code) => {
                if (code === 1 && callback) {
                    message.destroy();
                    message.success('添加成功,正在更新数据...');
                    callback();
                }
            });
        } else {
            message.loading('正在进行修改...!', 0);
            payload.Id = this.state.dataReg[nowSelectReg].id;
            modifyAd(payload, (result, code, message) => {
                if (code === 1 && callback) {
                    message.destroy();
                    message.success('修改成功,正在更新数据...');
                    callback();
                }
            });
        }
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