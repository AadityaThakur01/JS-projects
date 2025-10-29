document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalExpense = document.getElementById("total-amount");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if (name !== "" && !isNaN(amount) && amount > 0) {
      const newExpense = {
        id: Date.now(),
        name,
        amount,
      };
      expenses.push(newExpense);
      saveExpensesToLocal();
      renderExpenses();
      updateTotal();
      //   clear inputs
      expenseNameInput.value = "";
      expenseAmountInput.value = "";
    }
  });
  function calculateTotal() {
    return expenses.reduce((sum, expenses) => sum + expenses.amount, 0);
  }
  function renderExpenses() {
    expenseList.innerHTML = "";
    expenses.forEach((expense) => {
      const li = document.createElement("li");
      li.innerHTML = `
            ${expense.name} - $${expense.amount.toFixed(2)}
            <button data-id = "${expense.id}">Delete</button>
            `;
      expenseList.appendChild(li);
    });
  }
  function saveExpensesToLocal() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }
  function updateTotal() {
    totalAmount = calculateTotal();
    totalExpense.textContent = totalAmount.toFixed(2);
  }

  expenseList.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") {
      const id = parseInt(e.target.getAttribute("data-id"));
      expenses = expenses.filter((expense) => expense.id !== id);
      saveExpensesToLocal();
      renderExpenses();
      updateTotal();
    }
  });
});
