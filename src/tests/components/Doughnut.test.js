import React from "react";
import { render } from "@testing-library/react";
import DoughnutChart from "../../components/DoughnutChart";
import { Doughnut } from "react-chartjs-2";

jest.mock("react-chartjs-2", () => ({
  Doughnut: jest.fn(),
}));

describe("DoughnutChart", () => {
  beforeEach(() => {
    Doughnut.mockImplementation(() => <div>Doughnut Component</div>);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Doughnut component with the correct data and options", () => {
    const incomeLabel = "Income";
    const expenseLabel = "Expense";
    const incomeTotal = 1000;
    const expenseTotal = 500;

    render(
      <DoughnutChart
        incomeLabel={incomeLabel}
        expenseLabel={expenseLabel}
        incomeTotal={incomeTotal}
        expenseTotal={expenseTotal}
      />
    );

    expect(Doughnut).toHaveBeenCalledTimes(1);
    expect(Doughnut).toHaveBeenCalledWith(
      expect.objectContaining({
        data: {
          labels: [incomeLabel, expenseLabel],
          datasets: [
            {
              data: [incomeTotal, expenseTotal],
              backgroundColor: ["#10B981", "#EF4444"],
              hoverBackgroundColor: ["#10B981", "#EF4444"],
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          title: {
            display: false,
            text: "Transaction Pie Chart",
          },
        },
      }),
      {}
    );
  });
});
