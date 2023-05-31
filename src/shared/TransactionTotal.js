export default function TransactionTotal(transactionData, transactionCategory) {
  const transactions = transactionData;
  let transactionTotal = 0;

  transactions.forEach((transaction) => {
    if (transaction.category === `${transactionCategory}`) {
      transactionTotal += transaction.value;
    }
  });

  return transactionTotal;
}
