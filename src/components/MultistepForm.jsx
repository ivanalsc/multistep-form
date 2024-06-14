import React, { useState } from "react";
import "./multistep.css";
import Form from "./Form";

export const stepContext = React.createContext();

const MultistepForm = () => {

  const [form, setForm] = useState({step: 'info'});

  const handleStep = (e) => {
    setForm({...form, step: e.target.value});
  };

  console.log("Acá form", )
  return (
    <stepContext.Provider value={form}>
      <div className="formContainer">
        <main className="container">
          <aside className="steps">
            <ol>
              <li>
                <button onClick={handleStep} value="info" className={form.step === 'info' ? 'activeButton': 'inactiveButton'}>
                  <span className="buttonNumber">1</span>
                  <span className="buttonText"><span className="stepDescription">STEP 1</span>YOUR INFO</span>
                  
                </button>
              </li>
              <li>
                <button onClick={handleStep} value="plan" className={form.step === 'plan' ? 'activeButton': 'inactiveButton'}>
                <span className="buttonNumber">2</span>

                <span className="buttonText"><span className="stepDescription">STEP 2</span>SELECT PLAN</span>
                </button>
              </li>
              <li>
                <button onClick={handleStep} value="addons" className={form.step === 'addons' ? 'activeButton': 'inactiveButton'}>
                <span className="buttonNumber">3</span>

                <span className="buttonText"><span className="stepDescription">STEP 3</span>ADD ONS</span>
                </button>
              </li>
              <li>
                <button onClick={handleStep} value="summary" className={form.step === 'summary' ? 'activeButton': 'inactiveButton'}>
                <span className="buttonNumber">4</span>

                <span className="buttonText"><span className="stepDescription">STEP 4</span>SUMMARY</span>
                </button>
              </li>
            </ol>
          </aside>
          <section className="form">
            <Form setForm={setForm} />
          </section>
        </main>
      </div>
    </stepContext.Provider>
  );
};

export default MultistepForm;
