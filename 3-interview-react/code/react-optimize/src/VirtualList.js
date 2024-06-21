import React from "react";
export default class VirtualList extends React.Component {
  state = { start: 0 }; //起始索引
  scrollBox = React.createRef();
  handleScroll = () => {
    const { itemSize } = this.props;
    const { scrollTop } = this.scrollBox.current;
    const start = Math.floor(scrollTop / itemSize);
    this.setState({ start });
  };
  render() {
    //height容器的高度 width容器的宽度 itemCount多少个条目 itemSize每个条目有多高
    const { height, width, itemCount, itemSize, renderItem } = this.props;
    const { start } = this.state; //start=0
    let end = start + Math.floor(height / itemSize) + 1; //11
    end = end > itemCount ? itemCount : end; //如果结束的索引已经越界了，到结束为止
    //visibleList=[{index:0},.....{index:10}]
    const visibleList = new Array(end - start)
      .fill(0)
      .map((item, index) => ({ index: start + index }));
    let itemStyle = {
      position: "absolute",
      left: 0,
      width: "100%",
      height: 50,
    };
    return (
      <div
        style={{ overflow: "auto", willChange: "transform", height, width }}
        ref={this.scrollBox}
        onScroll={this.handleScroll}
      >
        <div
          style={{
            position: "relative",
            width: "100%",
            height: `${itemCount * itemSize}px`,
          }}
        >
          {visibleList.map(({ index }) =>
            renderItem({
              index,
              style: { ...itemStyle, top: itemSize * index },
            })
          )}
        </div>
      </div>
    );
  }
}
