import React, { Component } from 'react';
import { connect } from 'dva';
import { Row, Col, Input, Button } from 'antd';

const INPUT_WIDTH = 354;
const { TextArea } = Input;

class MainTab extends Component {
    constructor(props) {
        super(props);
        this.titleChangeHandle = this.handleInputChange('web_title');
        this.mainUrlChangeHandle = this.handleInputChange('main_url');
        this.newUrlChangeHandle = this.handleInputChange('new_url');
        this.descriptionChangeHandle = this.handleInputChange('meta_description');
        this.keyWordsChangeHandle = this.handleInputChange('meta_keywords');
    }

    state = {
        webSiteGlobalConfig: {},
        webSiteGlobalConfigStoreReg: {}
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.webSiteGlobalConfig !== prevState.webSiteGlobalConfigStoreReg) {
            return {
                webSiteGlobalConfigStoreReg: nextProps.webSiteGlobalConfig,
                webSiteGlobalConfig: nextProps.webSiteGlobalConfig
            }
        }
        return null;
    }

    render() {
        const { main_url, new_url, meta_description, meta_keywords, web_title } = this.state.webSiteGlobalConfig;
        return (
            <div>
                <Row type="flex" justify="center">
                    <Col xs={24} md={10} style={{ marginTop: 15 }}>
                        <p>网站标题:</p>
                        <Input
                            //style={{ width: INPUT_WIDTH }}
                            value={web_title ? web_title : ''}
                            onChange={this.titleChangeHandle}
                        />
                    </Col>
                    <Col xs={0} md={2} />
                    <Col xs={0} md={10} />
                </Row>
                <Row type="flex" justify="center">
                    <Col xs={24} md={10} style={{ marginTop: 15 }}>
                        <p>主站地址:</p>
                        <Input
                            //style={{ width: INPUT_WIDTH }}
                            value={main_url ? main_url : ''}
                            onChange={this.mainUrlChangeHandle}
                        />
                    </Col>
                    <Col xs={0} md={2} />
                    <Col xs={24} md={10} style={{ marginTop: 15, justifyContent: 'center' }}>
                        <p>最新地址:</p>
                        <Input
                            value={new_url ? new_url : ''}
                            onChange={this.newUrlChangeHandle}
                        />
                    </Col>
                </Row>
                <Row type="flex" justify="center">
                    <Col xs={24} md={10} style={{ marginTop: 15 }}>
                        <p>网站描述:(seo)</p>
                        <TextArea
                            value={meta_description ? meta_description : ''}
                            onChange={this.descriptionChangeHandle}
                            autosize={{ minRows: 2, maxRows: 6 }}
                        />
                    </Col>
                    <Col xs={0} md={2} />
                    <Col xs={24} md={10} style={{ marginTop: 15 }}>
                        <p>网站关键词:(seo)</p>
                        <TextArea
                            value={meta_keywords ? meta_keywords : ''}
                            onChange={this.keyWordsChangeHandle}
                            autosize={{ minRows: 2, maxRows: 6 }}
                        />
                    </Col>
                </Row>
                <Row xs={6} type="flex" justify="center">
                    <Col style={{ marginTop: 35 }}>
                        <Button onClick={this.submit} type='primary'>保存并提交</Button>
                    </Col>
                </Row>
            </div>
        );
    }

    handleInputChange = (type) => {
        return (e) => {
            let webSiteGlobalConfigReg = { ...this.state.webSiteGlobalConfig };
            webSiteGlobalConfigReg[type] = e.target.value;
            this.setState({
                webSiteGlobalConfig: webSiteGlobalConfigReg
            });
        }
    }

    submit = () => {
        const { dispatch } = this.props;
        const { main_url, new_url, meta_description, meta_keywords, web_title } = this.state.webSiteGlobalConfig;
        let payloadReg = {
            FOREVER_URL: main_url,
            NEW_WEBSITE_URL: new_url,
            META_DESCRIPTION: meta_description,
            META_KEYWORDS: meta_keywords,
            WEB_TITLE: web_title
        }
        dispatch({
            type: 'websiteOne/submitGlobalConfig',
            payload: {
                globalConfig: payloadReg
            }
        });
    }

}

export default connect(({ websiteOne }) => ({
    webSiteGlobalConfig: websiteOne.webSiteGlobalConfig
}))(MainTab);