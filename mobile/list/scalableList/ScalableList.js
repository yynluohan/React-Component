import React from 'react';
import { ListView, Icon, Badge } from 'antd-mobile';
import styles from './index.css';
import { query } from 'kqd-utils/lib/services';
import { ActionFlowItem,ContentListItem,LineContentItem,OrderListItem,
         TitledListItem,BlogListItem,CommentListItem,FlowItem,OrderCartListItem } from '../../index';

class ScalableList extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      list: props.list ? props.list : [],
    }
  }

  componentWillReceiveProps(nextProps) {
    console.log("componentWillReceiveProps===", nextProps);
    this.setState({
      list: nextProps.list,
    })
  }

  componentDidMount() {
    if(this.props.API){
      console.log('hhhgggg this.props.api = ',this.props.API);
      query(this.props.API,{}).then(({ code, data }) => {
        console.log('8888 data = ',data);
        this.props.getList(data)
        // this.setState({
        //   list: data.records
        // })
      })
    }
 }

 render(){

   const { loading,onPagination } = this.props;
   const { list } = this.state;
   const { item,pulltorefresh } = this.props;
   const typeItem = item.type || '';

   console.log('this.props.loadmore =  ',this.props.loadmore);

   const dataSource = new ListView.DataSource({
     rowHasChanged: (row1, row2) => row1 !== row2,
   });

   const separator = (sectionID, rowID) => (
       <div key={`${sectionID}-${rowID}`} className={styles.separator} style={this.props.separator || {}} />
   );

   const row = (item) => {
     console.log('typeItem',typeItem);
     if(typeItem == 'actionFlowItem') {
       return <ActionFlowItem {...item}{...this.props.actionFlowItemProps || {}}/>
     }
     if(typeItem == 'contentListItem'){
       return <ContentListItem {...item}{...this.props.contentListItemProps || {}}/>
     }
     if(typeItem == 'lineContentItem'){
       return <LineContentItem {...item}{...this.props.lineContentItemProps || {}}/>
     }
     if(typeItem == 'orderListItem'){
       return <OrderListItem {...item}{...this.props.orderListItemProps || {}}/>
     }
     if(typeItem == 'titledListItem'){
       return <TitledListItem {...item}{...this.props.titledListItemProps || {}}/>
     }
     if(typeItem == 'blogListItem'){
       return <BlogListItem {...item}{...this.props.blogListItemProps || {}}/>
     }
     if(typeItem == 'commentListItem'){
       return <CommentListItem {...item}{...this.props.commentListItemProps || {}}/>
     }
     if(typeItem == 'flowItem'){
       return <FlowItem {...item}{...this.props.flowItemProps || {}}/>
     }
     if(typeItem == 'orderCartListItem'){
       return <OrderCartListItem {...item}{...this.props.orderCartListItemProps || {}}/>
     }
   };

   const loadView = () => {
     return (
       <div style={{ padding: 6, textAlign: 'center' }}>
          {loading ? '加载中...' : loaded()}
       </div>
     )
   }

   const loaded = () =>{
     if(list && JSON.stringify(list) != '{}' && JSON.stringify(list) != '[]'){
       return '加载完成';
     }else{
       return '暂无信息';
     }
   }

   return (
     <div className={styles.normal}>
      {
        this.props.loadmore == undefined || this.props.loadmore == true ?
        <ListView
          dataSource={dataSource.cloneWithRows(list)}
          renderFooter={() => loadView()}
          renderRow={row}
          renderSeparator={separator}
          pageSize={4}
          useBodyScroll
          onScroll={() => { }}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={200}
          onEndReachedThreshold={10}
          onEndReached={() => onPagination()}
        />
        :
        <ListView
          dataSource={dataSource.cloneWithRows(list)}
          renderRow={row}
          renderSeparator={separator}
          pageSize={4}
          useBodyScroll
          onScroll={() => { }}
          scrollRenderAheadDistance={500}
          scrollEventThrottle={200}
          onEndReachedThreshold={10}
          onEndReached={() => onPagination()}
          />
      }
     </div>
   )
 }
}

export default ScalableList;
