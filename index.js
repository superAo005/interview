const name = "123";

const obj = {
  name: "456",
  getName: function () {
    console.log("getName", this.name);
    function printName() {
      console.log("printName", this.name);
    }
    // const printName = () => {
    //   console.log("printName", this.name);
    // };
    printName();
  },
};
obj.getName();
