// 正则把手机号中间四位变为星号*
const replacePhoneToStar = (phone) => {
    if (phone) {
      // const p1 = phone.slice(0, 3);
      // const p2 = phone.slice(7, 11);
      // const res2 = `${p1}****${p2}`;
      let res = phone.replace(/(\d{3})\d{4}(\d{4})/, "$1****$2");
      console.log(res);
      return res;
    }
  };
  replacePhoneToStar("13122024207");