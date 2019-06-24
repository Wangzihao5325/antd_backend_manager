import React, { Component } from 'react';
import { Row, Col, Input, Switch, Icon, Upload, message } from 'antd';

function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
        message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
}

export default class AdConfig extends Component {
    state = {
        loading: false,
    };

    render() {
        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;
        return (
            <div>
                <Row type="flex" justify="center">
                    <Col xs={24} md={22}>
                        <p>广告跳转地址:</p>
                        <Input
                            //style={{ width: INPUT_WIDTH }}
                            value={'12345'}
                            onChange={this.adLinkChangeHandle}
                        />
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col style={{ marginTop: 10 }} xs={24} md={10}>
                        <p>排序编号(数字越大排序越靠前):</p>
                        <Input
                            //style={{ width: INPUT_WIDTH }}
                            value={'12345'}
                            onChange={this.adLinkChangeHandle}
                        />
                    </Col>
                    <Col xs={0} md={2} />
                    <Col style={{ marginTop: 10 }} xs={24} md={10}>
                        <p>是否展示:</p>
                        <Switch checkedChildren="开" unCheckedChildren="关" defaultChecked />
                    </Col>
                </Row>
                <Row style={{ marginTop: 20 }} type="flex" justify="center">
                    <Col xs={24} md={22}>
                        <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                            beforeUpload={beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                        </Upload>
                    </Col>
                </Row>
            </div>
        );
    }

    adLinkChangeHandle = () => {

    }

    handleImageChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
}