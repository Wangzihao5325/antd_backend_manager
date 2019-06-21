import React, { Component } from 'react';
import { connect } from 'dva';

class Website extends Component {

    componentDidMount() {
        let { dispatch, websiteOne } = this.props;
        dispatch({
            type: 'websiteOne/getGlobalConfig'
        });
    }

    render() {
        return (
            <p>this is a test p label</p>
        );
    }
}

export default connect(({ websiteOne }) => ({
    websiteOne,
}))(Website);