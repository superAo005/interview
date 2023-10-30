import React from 'react';
import ReactDOM from 'react-dom';
class App extends React.Component{
  state = {list:[]}
  handleClick = ()=>{
   this.timeSlice(531);
  }
  timeSlice = (times)=>{
    //setTimeout  不是很流畅
    //requestAnimationFrame 每次浏览器渲染前执行的
    //requestIdleCallback 在浏览器空闲的时候执行 不会阻塞你优化级比较高的工作
     requestIdleCallback(()=>{
       let minus = times>100?100:times;
       this.setState({
         list:[...this.state.list,...new Array(minus).fill(Date.now())]
       },()=>{
        times-=minus;
        if(times>0){
          this.timeSlice(times);
        }
       });
     });
  }
  render(){
    return (
      <ul>
        <button onClick={this.handleClick}>加载</button>
        <ul>
          {
            this.state.list.map((item,index)=>(
              <li key={index}>{item}</li>
            ))
          }
        </ul>
      </ul>
    )
  }
}
ReactDOM.render(
  <App/>
    ,document.getElementById('root'));