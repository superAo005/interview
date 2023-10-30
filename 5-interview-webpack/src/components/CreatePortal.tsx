import { createPortal } from "react-dom";

function Index() {
  return (
    <div className="App">
      <p>bbbb</p>
      {createPortal(<p>aaaa</p>, document.body)}
    </div>
  );
}

export default Index;
