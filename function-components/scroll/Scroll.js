import React from 'react';

class Scroll  extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      scrollHeight: 0,     //实时滚动的高度
      height: this.props.height ? this.props.height : 305,     //传入高度，进行定位
    }
    this.isUnmounted = false;
  }

  componentDidMount() {
    console.log("componentDidMount", this.isUnmounted);
    if (!this.isUnmounted) {
      window.onscroll = (e) => {
        console.log('99999 e = ',e);
        const scrollHeight =  document.body.scrollTop||document.documentElement.scrollTop||window.pageYOffset||0
        this.setState({
          scrollHeight: scrollHeight
        })
        this.props.getBrowserScrollHeight(scrollHeight)    //外部需要
      }
    }
  }

  componentWillUnmount() {
    console.log("componentWillUnmount");
    this.isUnmounted = true;
    window.onscroll = null;
  }


  render(){

    const styles = {
      position: 'fixed',
      width: '100%',
      top: '2.7em',
      zIndex: 99
    }

    const { children } = this.props;
    const { scrollHeight,height } = this.state;

    console.log('------- scrollHeight = ',scrollHeight);
    console.log('======== height = ',height);
    console.log('8888 ',scrollHeight > height);

    return (
      <div style={scrollHeight > height  ? styles : {}}>
        {children}
      </div>
    )
  }

}

export default Scroll;
