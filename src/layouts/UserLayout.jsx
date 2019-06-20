import { DefaultFooter, getMenuData, getPageTitle } from '@ant-design/pro-layout';
import DocumentTitle from 'react-document-title';
import Link from 'umi/link';
import React from 'react';
import SelectLang from '@/components/SelectLang';
import { connect } from 'dva';
import { formatMessage } from 'umi-plugin-react/locale';
import logo from '../assets/logo.svg';
import styles from './UserLayout.less';

const UserLayout = props => {
  const {
    route = {
      routes: [],
    },
  } = props;
  const { routes = [] } = route;
  const {
    children,
    location = {
      pathname: '',
    },
  } = props;
  const { breadcrumb } = getMenuData(routes, props);
  return (
    <DocumentTitle
      title={getPageTitle({
        pathname: location.pathname,
        breadcrumb,
        formatMessage,
        ...props,
      })}
    >
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo} />
                <span className={styles.title}>后台管理</span>
              </Link>
            </div>
            <div className={styles.desc}>东半球最牛逼之没有第二 专用后台管理系统</div>
          </div>
          {children}
        </div>
        <div style={{ alignSelf: 'center', color: 'rgb(0,0,0,0.45)', marginBottom: 30 }}>Copyright © 2019 站群二组出品  ( Based on Antd Pro )</div>
      </div>
    </DocumentTitle>
  );
};

export default connect(({ settings }) => ({ ...settings }))(UserLayout);
