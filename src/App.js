import { useState, useEffect } from "react";
import { RiDeleteBin4Fill } from "react-icons/ri";

function App() {
  let getLocalStorage = JSON.parse(localStorage.getItem("list"));

  const [textInp, setTextInp] = useState("");
  const [amountInp, setAmountInp] = useState("");

  const [total, setTotal] = useState(0.0);
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);

  const [history, setHistory] = useState(getLocalStorage ? getLocalStorage : []);
  
  const [resExpense, setResExpense] = useState(expense);

  useEffect(() => {
    if (history.length > 0) {

      let income = history
        .filter((his) => his.price > 0 && his.price)
        .map((his) => his.price);

      let expense = history
        .filter((his) => his.price < 0 && his.price)
        .map((his) => his.price);

      setIncome(income.reduce((a, b) => a + b, 0));
      setExpense(expense.reduce((a, b) => a + b, 0));
    }

    if (history.length === 0) {
      setResExpense(0);
      setTotal(0);
      setIncome(0);
    }
    
    localStorage.setItem("list", JSON.stringify(history));
  }, [history]);


  useEffect(() => {
    if (expense.length === undefined) {
      setResExpense(String(expense).substring(1, expense.length));
    }
    
    setTotal(income + expense);
  }, [income, expense]);

  function addTrack() {
    if (!(textInp && amountInp)) return;
    setHistory([
      ...history,
      {
        text: textInp,
        price: Number(amountInp),
      },
    ]);
    setTextInp("");
    setAmountInp("");
  }

  function delet(i) {
    history.splice(i, 1);
    setHistory([...history]);
  }

  return (
    <div className="App">
      <div className="card">
        <h1>Expense Tracker</h1>
        <div className="balance">
          <h2>your balance</h2>
          <p>${total}</p>
        </div>
        <div className="income">
          <div>
            <h4>Income</h4>
            <p className="incomeballance">${income}</p>
          </div>
          <div className="wr"></div>
          <div>
            <h4>Expense</h4>
            <p>${resExpense}</p>
          </div>
        </div>
        <div className="history">
          <h3>History</h3>
          <hr />
          <div className="cash">
            <div className="cashing">
              {history.map((histor, index) => (
                <div
                  style={{ borderRight: `4px solid ${histor.price < 0 ? "red" : "springgreen"}` }}
                  className="cashHistory"
                  key={index}
                >
                  <div className="aa">
                    <div onClick={() => delet(index)} className="icon">
                      <RiDeleteBin4Fill />
                    </div>
                    <span>{histor.text}</span>
                  </div>
                  <p className="price">{histor.price}$</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="transaction">
          <h3>Add New transaction</h3>
          <hr />
          <p>Text</p>
          <input
            onChange={(e) => setTextInp(e.target.value)}
            placeholder="Enter text..."
            value={textInp}
            type="text"
          />
          <p>Amount</p>
          <input
            onChange={(e) => setAmountInp(e.target.value)}
            placeholder="Enter amount..."
            value={amountInp}
            type="number"
          />
          <button onClick={addTrack}>Add transaction</button>
        </div>
      </div>
    </div>
  );
}

export default App;
