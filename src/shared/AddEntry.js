export default function AddEntry(newEntry, entries) {
  let dataEntries = entries;
  const lastItem = dataEntries[dataEntries.length - 1];
  const previousBalance = lastItem ? lastItem.balance : 0;

  if (newEntry.category === "Income") {
    newEntry.balance = previousBalance + newEntry.value;
  } else if (newEntry.category === "Expense") {
    newEntry.balance = previousBalance - newEntry.value;
  }

  const updatedData = [...dataEntries, newEntry];

  return updatedData;
}
