import React from 'react';
import FlowItem from '../flowItem/FlowItem';
import FlowItemLayout from '../flowItemLayout/FlowItemLayout'

const ActionFlowItem = ({
  config,

}) => {

  const flowItemLayoutProps = {
    style:{
      margin: '0em 1em',
      padding: '0.2em 0',
    }
  }

  return (
    <div style={{backgroundColor:'#fff',padding: '0.5em 0'}}>
      {
        config.list && config.list.length > 0 && config.list.map((item,index) =>(
          <div key={index} style={{ marginBottom: config.groupSpan }}>
            {
              item.items.length > 0 && item.items.map((items,index1) =>(
                <div  key={index1}>
                  <FlowItemLayout { ...flowItemLayoutProps }>
                    <FlowItem {...items}/>
                  </FlowItemLayout>
               </div>
              ))
            }
          </div>
        ))
      }
    </div>
  )
}

export default ActionFlowItem
