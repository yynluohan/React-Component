import React from 'react';

class Scroll extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      scrollHeight: 0,     //实时滚动的高度
      height: this.props.height ? this.props.height : 305,     //传入高度，进行定位
    }
  }

  componentDidMount() {
    window.onscroll = () => {
      const scrollHeight =  document.documentElement.scrollTop || document.body.scrollTop;
      this.setState({
        scrollHeight: scrollHeight
      })
      this.props.getBrowserScrollHeight(scrollHeight)    //外部需要
    }
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

    return (
      <div style={scrollHeight > height  ? styles : {}}>
        {children}
      </div>
    )
  }

}

export default Scroll;
