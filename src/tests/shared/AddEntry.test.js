import AddEntry from "../../shared/AddEntry";

describe("AddEntry", () => {
  test("adds a new entry with income category", () => {
    const newEntry = {
      entry: "Sold pancakes",
      category: "Income",
      value: 100,
    };
    const entries = [
      { entry: "Bought jeans", category: "Expense", value: 50, balance: 0 },
      { entry: "Bought pens", category: "Expense", value: 30, balance: -20 },
    ];

    const result = AddEntry(newEntry, entries);

    expect(result).toEqual([
      { entry: "Bought jeans", category: "Expense", value: 50, balance: 0 },
      { entry: "Bought pens", category: "Expense", value: 30, balance: -20 },
      { entry: "Sold pancakes", category: "Income", value: 100, balance: 80 },
    ]);
  });

  test("adds a new entry with expense category", () => {
    const newEntry = {
      entry: "Bought comic books",
      category: "Expense",
      value: 50,
    };
    const entries = [
      { entry: "Sold movies",  category: "Income", value: 100, balance: 200 },
      { entry: "Sold ticket", category: "Income", value: 30, balance: 230 },
    ];

    const result = AddEntry(newEntry, entries);

    expect(result).toEqual([
      { entry: "Sold movies", category: "Income", value: 100, balance: 200 },
      { entry: "Sold ticket", category: "Income", value: 30, balance: 230 },
      { entry: "Bought comic books", category: "Expense", value: 50, balance: 180 },
    ]);
  });

  test("adds a new entry when entries array is empty", () => {
    const newEntry = {
      entry: "Sold NFT",
      category: "Income",
      value: 100,
    };
    const entries = [];

    const result = AddEntry(newEntry, entries);

    expect(result).toEqual([{ entry: "Sold NFT", category: "Income", value: 100, balance: 100 }]);
  });
});
