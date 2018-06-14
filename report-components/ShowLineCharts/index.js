import React,{PropTypes} from 'react';
import ReactEcharts from 'echarts-for-react';
import { query } from '../../../framework/service/index';

class ShowLineCharts extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      title: '',
      name: [],
      value: []
    };
  }

  componentDidMount() {
    query(this.props.api).then(({ code, data }) => {
      console.log(data);
      const nameData = data.dataAxis;
      var x = [];
      var y = [];
      for(var i = 0; i < nameData.length; i++){
        x = nameData[i].split("-");
        y.push(x[1]);
      }
      if(data.title == 'equipmentFailureRate'){
        data.title = '设备故障率';
      }
      if(data.title == 'planFinishRate'){
        data.title = '计划完成率';
      }


      this.setState({
        title: data.title,
        name: y,
        value: data.data,
      })
    })
  }


  render(){
  const { name,value,title } = this.state;

  var getOption = {
      title: {
                text: title,
             },

      lineStyle: {
        color: '#999'
      },

      tooltip: {
        trigger: 'axis'
      },
      toolbox: {     //保存为图片
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
              // data: ["1月", "2月", "3月", "4月", "5月", "6月","7月"]
              data: name
            },

      yAxis: {
        splitLine: {
          show: false
        }
      },

      series: [
        {
         name: title,
         type: 'line',

        //  itemStyle : {
        //          normal : {     //设置转折点颜色
        //           color:'#00FF00'
        //     }
        //   },

         lineStyle: {
             normal: {
                 width: 2,  //连线粗细
                 color: "#278BDD"  //连线颜色
               }
         },
        //  data: [5, 20, 36, 10, 10, 50,65]
        data: value
     }],

      text: 'text'

  }


  return (
    <div>
      <ReactEcharts option={getOption}/>
    </div>
  )
 }

}


export default ShowLineCharts;
