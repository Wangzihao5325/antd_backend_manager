import React, { Component } from 'react';
import { connect } from 'dva';
import { Tabs, Card } from 'antd';
import MainTab from './MainTab';
import AdTab from './AdTab';
import ModuleTab from './ModuleTab';

const { TabPane } = Tabs;

class Website extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: '全局配置', content: <MainTab />, key: '1', closable: false },
            { title: '广告配置', content: <AdTab />, key: '2', closable: false },
            { title: '模块配置', content: <ModuleTab />, key: '3' },
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
    }

    componentDidMount() {
        let { dispatch, websiteOne } = this.props;
        dispatch({
            type: 'websiteOne/getGlobalConfig'
        });
        dispatch({
            type: 'websiteOne/getAdList',
            payload: {
                Page: 1,
                Limit: 15
            }
        });
    }

    render() {
        return (
            <Card title='网站配置' bordered={false}>
                <Tabs
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="card"
                //onEdit={this.onEdit}
                >
                    {this.state.panes.map(pane => (
                        <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>
                            {pane.content}
                        </TabPane>
                    ))}
                </Tabs>
            </Card>
        );
    }

    onChange = activeKey => {
        this.setState({ activeKey });
    };

    // onEdit = (targetKey, action) => {
    //     this[action](targetKey);
    // };

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    };

    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    };
}

export default connect(({ websiteOne }) => ({
    websiteOne,
}))(Website);