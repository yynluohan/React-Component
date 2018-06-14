import React,{ PropTypes } from 'react';
import { connect } from 'dva';
import { FormattedMessage } from 'react-intl';
import ReactEcharts from 'echarts-for-react';
import { query } from '../../../framework/service/index';

class ShowPieChart extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'showPieChart/index',
      payload: {
        api: this.props.api,
      }
    })
  }


  render(){
  const { list,title } = this.props.showPieChart;

  var getOption = () => {
    return {
      title: {
                text: this.props.showPieChart.title,    //设置标题
                // left: 'center',  //标题居中
                textStyle: {     //设置标题的颜色
                  // fontSize: '24px'
                }
      },

     tooltip : {
      trigger: 'item',
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },

    series: [{
       type: 'pie',
       radius: '80%',
       center: ['50%', '50%'],   //设置饼图的中心
       data: this.props.showPieChart.list
     }],

     itemStyle: {
       normal: {      //设置阴影
          shadowBlur: 1000,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
     },
    }
  }

  return (
    <div  style={{marginTop: '50px'}}>
      <ReactEcharts option={getOption()}/>
    </div>
  )
 }
}

function mapStateToProps(state, ownProps) {
  return {
    showPieChart: state.showPieChart
  }
}

export default connect(mapStateToProps)(ShowPieChart);
