var coins = [
  { name: "ONE HUNDRED", value: 100 },
  { name: "TWENTY", value: 20 },
  { name: "TEN", value: 10 },
  { name: "FIVE", value: 5 },
  { name: "ONE", value: 1 },
  { name: "QUARTER", value: 0.25 },
  { name: "DIME", value: 0.1 },
  { name: "NICKEL", value: 0.05 },
  { name: "PENNY", value: 0.01 },
];

const getChObj = (change, cid) => {
  const result = {};
  // console.log("cid", cid);
  for (let i = 0; i < coins.length; i++) {
    result[coins[i].name] = 0;
    if (change >= coins[i].value) {
      // console.log("change", change);
      // console.log("coins[i].value", coins[i].value);
      if (cid[i].value !== 0) {
        // while (change >= 0 && cid[i].value >= 0) {
        while (change >= coins[i].value && cid[i].value > 0) {
          result[coins[i].name] += coins[i].value;
          change -= coins[i].value;
          change = Number(change.toFixed(2));
          // console.log("change", change);
          cid[i].value -= coins[i].value;
        }
      }
    }
  }
  if (change > 0) return -1;
  return result;
};

function checkCashRegister(price, cash, cid) {
  const change = Number((cash - price).toFixed(2));
  const sum = cid.reduce((acc, val) => acc + val[1], 0);
  // console.log("sum", sum);
  const result = {
    status: "",
    change: [],
  };
  if (sum === change) {
    result.status = "CLOSED";
    result.change = cid;
    return result;
  } else if (sum < change) {
    result.status = "INSUFFICIENT_FUNDS";
    return result;
  } else {
    const myCid = cid
      .map((item) => ({ name: item[0], value: item[1] }))
      .reverse();
    const chObj = getChObj(change, myCid);
    // console.log(chObj);
    if (chObj === -1) {
      result.status = "INSUFFICIENT_FUNDS";
      return result;
    }
    console.log("chObj", chObj);
    const chArr = Object.entries(chObj).filter((item) => item[1] !== 0);
    // console.log("chArr", chArr);
    result.status = "OPEN";
    result.change = chArr;
    return result;
  }
}

console.log(
  checkCashRegister(3.26, 100, [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100],
  ])
);
// {status: "OPEN", change: [["TWENTY", 60], ["TEN", 20], ["FIVE", 15], ["ONE", 1], ["QUARTER", 0.5], ["DIME", 0.2], ["PENNY", 0.04]]}
// console.log(
//   checkCashRegister(19.5, 20, [
//     ["PENNY", 1.01],
//     ["NICKEL", 2.05],
//     ["DIME", 3.1],
//     ["QUARTER", 4.25],
//     ["ONE", 90],
//     ["FIVE", 55],
//     ["TEN", 20],
//     ["TWENTY", 60],
//     ["ONE HUNDRED", 100],
//   ])
// );
// {status: "OPEN", change: [["QUARTER", 0.5]]}
// console.log(
//   checkCashRegister(19.5, 20, [
//     ["PENNY", 0.5],
//     ["NICKEL", 0],
//     ["DIME", 0],
//     ["QUARTER", 0],
//     ["ONE", 0],
//     ["FIVE", 0],
//     ["TEN", 0],
//     ["TWENTY", 0],
//     ["ONE HUNDRED", 0],
//   ])
// );
// {status: "CLOSED", change: [["PENNY", 0.5], ["NICKEL", 0], ["DIME", 0], ["QUARTER", 0], ["ONE", 0], ["FIVE", 0], ["TEN", 0], ["TWENTY", 0], ["ONE HUNDRED", 0]]}
// console.log(
//   checkCashRegister(19.5, 20, [
//     ["PENNY", 0.01],
//     ["NICKEL", 0],
//     ["DIME", 0],
//     ["QUARTER", 0],
//     ["ONE", 1],
//     ["FIVE", 0],
//     ["TEN", 0],
//     ["TWENTY", 0],
//     ["ONE HUNDRED", 0],
//   ])
// );
// {status: "INSUFFICIENT_FUNDS", change: []}
