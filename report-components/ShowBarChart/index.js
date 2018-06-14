import React,{PropTypes} from 'react';
import {connect} from 'dva';
import ReactEcharts from 'echarts-for-react';
import { query } from '../../../framework/service/index';

class ShowBarChart extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'showBarChart/index',
      payload: {
        api: this.props.api,
      }
    })
    console.log('111');
  }


  render(){
  const { list,monthData,lastMonthData,xAxis,title } = this.props.showBarChart;

  var getOption = () => {
    return {
      title: {
                text: this.props.showBarChart.title,
                // left: 'center'  //标题居中
             },

      tooltip: {
        trigger: 'axis'
      },
      toolbox: {     //展示保存为图片
          feature: {
              saveAsImage: {}
          }
      },
      grid: {      //设置图表的样式
          left: '8%',
          right: '12%',
          bottom: '3%',
          containLabel: true
      },

      xAxis: {
              data: this.props.showBarChart.xAxis
          },

      yAxis: {
        splitLine: {
          show: false
        }
      },

      series: [{
         name: '本月',
         type: 'bar',
        data: this.props.showBarChart.monthData
      },
      {
         name: '上月',
         type: 'bar',
         data: this.props.showBarChart.lastMonthData
      }
    ],
    }
  }


  return (
    <div>
      <ReactEcharts option={getOption()}/>
    </div>
  )
 }

}


function mapStateToProps(state, ownProps) {
  return {
    loading: state.loading.global,
    showBarChart: state.showBarChart
  }
}

export default connect(mapStateToProps)(ShowBarChart);
