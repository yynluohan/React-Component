import React, { PureComponent, Fragment } from 'react';
import { FormattedMessage } from 'react-intl';

import { query, get, create, remove, update, patch, createRaw } from 'kqd-utils/lib/services';
import TagItem from './TagItem';
import './style.css';

export default class TagsCheckbox extends PureComponent {
  constructor(props){
    super(props);
    this.state = {
      API: props.API || '/api/product/productTags',
      checkedList: props.value || [],
      tagList: [],
    }
  }

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const { API } = this.state;
    if(this.props.isfirsttimeinit === 'true'){
      query(API).then(({ code, data }) => {
        if( code === 200 ){
          this.setState({
            tagList: data.records || data
          });
          // this.props.onChange(data);
        }
      });
    }
  }

  handleChange(tag, checked) {
    const { checkedList } = this.state;
    const nextCheckedList = checked
      ? [...checkedList, tag]
      : checkedList.filter(t => t.id !== tag.id);

    this.setState({ checkedList: nextCheckedList },() => {
      this.props.onChange(this.state.checkedList);
    });
  }

  render() {
    const { checkedList, tagList } = this.state;
    return (
      <div className="tagListBox">
        { tagList.map( ( tag => {
          return  <TagItem
                    key={ tag.id }
                    checked={ !checkedList.every( v => v.id !== tag.id ) }
                    data={ tag }
                    onChange= { this.handleChange.bind(this) }
                    >
                  </TagItem>;
        }) ) }
      </div>
    )
  }
}
