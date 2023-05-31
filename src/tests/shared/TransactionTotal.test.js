import TransactionTotal from "../../shared/TransactionTotal";

describe("TransactionTotal", () => {
  test("calculates the total value for a specific transaction category", () => {
    const transactionData = [
      { entry: "Paid for hair cut", category: "Expense", value: 10 },
      { entry: "Paid for taxi fare", category: "Expense", value: 20 },
      { entry: "Sold a book", category: "Income", value: 15 },
      { enry: "Bought pens", category: "Expense", value: 5 },
    ];
    const transactionCategory = "Expense";

    const result = TransactionTotal(transactionData, transactionCategory);

    expect(result).toBe(35);
  });

  test("returns 0 when no transactions match the specified category", () => {
    const transactionData = [
      { entry: "Sold sun glasses", category: "Income", value: 10 },
      { entry: "Sold old sandals", category: "Income", value: 20 },
    ];
    const transactionCategory = "Expense";

    const result = TransactionTotal(transactionData, transactionCategory);

    expect(result).toBe(0);
  });

  test("returns 0 when the transaction data is empty", () => {
    const transactionData = [];
    const transactionCategory = "Expense";

    const result = TransactionTotal(transactionData, transactionCategory);

    expect(result).toBe(0);
  });
});
