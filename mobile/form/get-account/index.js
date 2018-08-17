import React, { PureComponent } from 'react';
// import { FormattedMessage } from 'react-intl';
// import Input from 'antd/lib/input';
// import message from 'antd/lib/message';

// import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';
import { getAccount } from 'kqd-utils/lib/token';

/**
 * 暂且只是返回当前登陆用户
 */
export default class GetAccount extends PureComponent {

  render() {
    return (
      <div>{ this.props.value || getAccount() }</div>
    )
  }
}