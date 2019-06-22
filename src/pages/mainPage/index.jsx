import React, { Component } from 'react';
import { connect } from 'dva';

export default class Main extends Component {

    render() {
        return (
            <p>this is a main page</p>
        );
    }
}

// export default connect(({ websiteOne }) => ({
//     websiteOne,
// }))(Website);