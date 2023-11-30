import { BALANCEARRAYS } from "../consts";

export function refactorBalances(balances) {
  let reflectuserBalances = [];
  let reflectuserWithdraws = [];
  let reflectuserDeposits = [];

  if(!balances)
    return;

  BALANCEARRAYS.map((array) => {
    let balanceTemp;
    balances.userTotalBalances.map((utb, index) => {
      if (array.currency === utb.currency) balanceTemp = utb;
    });
    if (balanceTemp)
      reflectuserBalances.push({
        availableBalance: balanceTemp.availableBalance
          ? balanceTemp.availableBalance
          : 0,
        pendingBalance: balanceTemp.pendingBalance
          ? balanceTemp.pendingBalance
          : 0,
      });
    else
      reflectuserBalances.push({
        currency: array.currency,
        availableBalance: 0,
        pendingBalance: 0,
      });
    let withdrawTemp;
    balances.userTotalWithdraws.map((utw, index) => {
      if (array.currency === utw.currency) withdrawTemp = utw;
    });
    if (withdrawTemp)
      reflectuserWithdraws.push({
        pendingWithdraw: withdrawTemp.pendingWithdraw
          ? withdrawTemp.pendingWithdraw
          : 0,
        totalWithdrawed: withdrawTemp.totalWithdrawed
          ? withdrawTemp.totalWithdrawed
          : 0,
      });
    else
      reflectuserWithdraws.push({
        currency: array.currency,
        totalWithdrawed: 0,
        pendingWithdraw: 0,
      });

    let depositTemp;
    balances.userDepositBalances.map((udb, index) => {
      if (array.currency === udb.currency) depositTemp = udb;
    });
    if (depositTemp)
      reflectuserDeposits.push({
        depositBalance: depositTemp.depositBalance
          ? depositTemp.depositBalance
          : 0,
        profitAmount: depositTemp.profitAmount ? depositTemp.profitAmount : 0,
        totalDepositAmount: depositTemp.totalDepositAmount
          ? depositTemp.totalDepositAmount
          : 0,
      });
    else
      reflectuserDeposits.push({
        currency: array.currency,
        depositBalance: 0,
        totalDepositAmount: 0,
        profitAmount: 0,
      });
  });
  return { reflectuserBalances, reflectuserWithdraws, reflectuserDeposits };
}

export function calculateRealAvailableBalance(reflectBalanceState) {
  let data = [];
  reflectBalanceState.reflectuserBalances.map((currency, index) => {
    const balance =
      reflectBalanceState.reflectuserBalances[index].availableBalance +
      reflectBalanceState.reflectuserDeposits[index].profitAmount -
      reflectBalanceState.reflectuserDeposits[index].depositBalance -
      reflectBalanceState.reflectuserWithdraws[index].totalWithdrawed -
      reflectBalanceState.reflectuserWithdraws[index].pendingWithdraw;
    data.push(balance);
  });
  return data;
}