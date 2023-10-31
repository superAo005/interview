/**
   给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。
   你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。
   返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。
 */
const maxProfit = (prices) => {
  let res = 0;
  let min = prices[0];
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] < min) {
      min = prices[i];
    } else {
      res = Math.max(res, prices[i] - min);
    }
  }
  return res;
};
console.log(maxProfit([7, 1, 5, 3, 6, 4]));
/**
 * 给定一个数组 prices ，其中 prices[i] 是一支给定股票第 i 天的价格。
   设计一个算法来计算你所能获取的最大利润。你可以尽可能地完成更多的交易（多次买卖一支股票）。
   注意：你不能同时参与多笔交易（你必须在再次购买前出售掉之前的股票）。
 */
const maxProfit2 = (prices) => {
  let result = 0;
  for (let i = 1; i < prices.length; i++) {
    if (prices[i] > prices[i - 1]) {
      result += prices[i] - prices[i - 1];
    }
  }
  return result;
};
console.log(maxProfit2([7, 1, 5, 3, 6, 4]));
