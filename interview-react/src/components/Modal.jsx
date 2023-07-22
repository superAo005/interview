import React, { useState, useRef, useEffect } from "react";

function Modal() {
  const [isShow, setIsShow] = useState(false);
  const ref = useRef(null); //通过ref获取需要关闭的组件
  const ref1 = useRef(null);
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []); //首次渲染的时候给document添加一个事件，组件卸载移除组件

  //点击按钮渲染出要显示的内容
  const handleClick = () => {
    setIsShow(true);
  };

  const handleClickOutside = (event) => {
    //该组件存在  点击区域不是按钮区域 并且点击的区域不被包含在组件的区域内
    if (
      ref.current &&
      !ref.current.contains(event.target) &&
      !ref1.current.contains(event.target)
    ) {
      setIsShow(false);
    }
  };

  return (
    <div>
      <button ref={ref1} onClick={handleClick}>
        Show/Hide
      </button>
      {isShow ? (
        <div ref={ref}>
          <p style={{ color: "black" }}>Content goes here...</p>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Modal;
