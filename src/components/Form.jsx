import React, { useContext, useState, useRef } from "react";
import { stepContext } from "./MultistepForm";
import './form.css';

const Form = ({ setForm }) => {
  const form = useContext(stepContext);
  return (
    <div>
      {form.step === "info" && <Info setForm={setForm} />}
      {form.step === "plan" && <Plan setForm={setForm} />}
      {form.step === "addons" && <Addons setForm={setForm} />}
      {form.step === "summary" && <Summary setForm={setForm} />}
      {form.step === "orderPlaced" && <OrderPlaced />}

    </div>
  );
};

const Info = ({ setForm }) => {

  const [next, setNext] = useState(false);

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const handleInfo = (e) => {
    e.preventDefault();

    console.log("Acá", nameRef.current.value)
    setForm({
      step: "plan",
      name: nameRef.current.value,
      email: emailRef.current.value,
      phone: phoneRef.current.value,
    });
  };
  return (
    <>
      <h1 className="formTitle">Personal info</h1>
      <p className="formDescription">
        Please provide your name, email adress and phone number.
      </p>
      <form className="formDescription" onSubmit={handleInfo}>
        <div className="formGroup">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" ref={nameRef}  required placeholder="e.g. Stephen King"/>
        </div>
        <div className="formGroup">
          <label htmlFor="email">Email Adress</label>
          <input type="email" id="email" ref={emailRef} required placeholder="e.g. stephenking@lorem.com"/>
        </div>
        <div className="formGroup">
          <label htmlFor="phone">Phone Number</label>
          <input type="phone" id="phone" ref={phoneRef} required placeholder="e.g. +123 45 6789"/>
        </div>
        <div className="formFooter">
        <button>Next step</button>
        </div>
      </form>
    </>
  );
};
const Plan = ({ setForm }) => {
  const [monthly, setMonthly] = useState(true);
  const [planName, setPlan] = useState('Arcade');


  const form = useContext(stepContext);
  const planRef = useRef();

  const plans = [
    { name: "Arcade", decription: "", price: { monthly: "$9", yearly: "$90" } },
    { name: "Advanced", price: { monthly: "$12", yearly: "$120" } },
    { name: "Pro", price: { monthly: "$15", yearly: "$150" } },
  ];

  const handlePlan = (e) => {
    e.preventDefault();
  console.log("Valor input", planRef.current)

    setForm({
      ...form,
      plan: planName,
      step: "addons",
      time: monthly ? "Monthley" : "Yearly",
      price: monthly
        ? plans.filter((plan) => plan.name === planName)[0].price
            .monthly
        : plans.filter((plan) => plan.name === planName)[0].price
            .yearly,
    });
  };

  const handleyMonthley = () => {
    setMonthly(!monthly);
  };


  const handlePlanName = (e) => {
    setPlan(e.target.value)
  }
  return (
    <>
      <h1 className="formTitle">Select your plan</h1>
      <p className="formDescription">
        You have the option of monthly of yearly billing.
      </p>
      <form>
        {plans.map((plan) => {
          return (
            <div key={plan.name} className={`plan ${plan.name}`} >
              <input
                type="radio"
                name="option"
                value={plan.name}
                ref={planRef}
                onChange={handlePlanName}
                id={plan.name}
              />
              <span className="planInfo">

              <label htmlFor={plan.name}>
              {plan.name}

              {monthly === true ? (
                <span className="price">{plan.price.monthly}/mo</span>
              ) : (
                <div className="yearlyPrice">
                <span className="price">{plan.price.yearly}/yr</span>
                <span className="free">2 months free</span>
                </div>
              )}
              </label>

              </span>
            </div>
          );
        })}

        {/* <button onClick={handleyMonthley} className="toggleButton">
          {monthly === true ? "Yearly" : "Monthley"}
        </button> */}
        <div className="switcherContainer">
          <p className={monthly === false ? 'switchText': 'switchText active' }>Monthley</p>
          <label class="switch">
            <input type="checkbox" onChange={handleyMonthley} />
            <span class="slider round"></span>
          </label>
          <p className={monthly === true ? 'switchText': 'switchText active' }>Yearly</p>

        </div>

        <div className="buttonsContainer">
          <button className="backButton" onClick={() => setForm({ ...form, step: "info" })}>
            Go Back
          </button>
          <button onClick={handlePlan}>Next</button>
        </div>
      </form>
    </>
  );
};

const Addons = ({ setForm }) => {
  const form = useContext(stepContext);


  const refCheckBoxOne = useRef();
  const refCheckBoxTwo = useRef();
  const refCheckBoxThree = useRef();

  const handleAddons = (e) => {
    e.preventDefault();

    setForm({
      ...form,
      step: "summary",
      addons: {
        [refCheckBoxOne.current.value]: refCheckBoxOne.current.checked,
        [refCheckBoxTwo.current.value]: refCheckBoxTwo.current.checked,
        [refCheckBoxThree.current.value]: refCheckBoxThree.current.checked,
      },
    });
  };
  if(form.time === 'Monthley') {
    return (
      <>
        <h1 className="formTitle">Pick add ons</h1>
        <p className="formDescription">
          Add-ons help enhance your gaming experience.
        </p>
  
        <form onSubmit={handleAddons}>
          <label className="addon">
            <input
              type="checkbox"
              value="online service/1"
              ref={refCheckBoxOne}
            />
            <span className="addonText">
              <p>Online service</p>
              Access to multiplayer games.
            </span>
            <span className="plus">+$1/mo</span>
          </label>
          <label className="addon">
            <input
              type="checkbox"
              value="larger storage/2"
              ref={refCheckBoxTwo}
            />
            <span className="addonText">
              <p>Larger storage</p>
              Extra 1TB of cloud save
            </span>
            <span  className="plus">+$2/mo</span>
          </label>
          <label className="addon">
            <input
              type="checkbox"
              value="customizable profile/3"
              ref={refCheckBoxThree}
            />
            <span className="addonText">
              <p>Customizable profile</p>
              Custom theme on your profile.
            </span>
            <span  className="plus">+$2/mo</span>
          </label>
          <div className="buttonsContainer">
            <button onClick={() => setForm({ ...form, step: "plan" })} className="backButton" >
              Go Back
            </button>
            <button>Next</button>
          </div>
        </form>
      </>
    );
  }
  if(form.time === 'Yearly') {
    return (
      <>
        <h1 className="formTitle">Pick add ons</h1>
        <p className="formDescription">
          Add-ons help enhance your gaming experience.
        </p>
  
        <form onSubmit={handleAddons}>
          <label>
            <input
              type="checkbox"
              value="online service/10"
              ref={refCheckBoxOne}
            />
            <span>
              <p>Online service</p>
              Access to multiplayer games.
            </span>
            <span>+$10/yr</span>
          </label>
          <label>
            <input
              type="checkbox"
              value="larger storage/20"
              ref={refCheckBoxTwo}
            />
            <span>
              <p>Larger storage</p>
              Extra 1TB of cloud save
            </span>
            <span>+$20/yr</span>
          </label>
          <label>
            <input
              type="checkbox"
              value="customizable profile/20"
              ref={refCheckBoxThree}
            />
            <span>
              <p>Customizable profile</p>
              Custom theme on your profile.
            </span>
            <span>+$20/yr</span>
          </label>
          <div className="buttonsContainer">
            <button onClick={() => setForm({ ...form, step: "plan" })}>
              Go Back
            </button>
            <button>Next</button>
          </div>
        </form>
      </>
    );
  }

};
const Summary = ({ setForm }) => {
  const form = useContext(stepContext);
  let addons = [];
  let addonsPrices = [];

  Object.entries(form.addons).forEach(([key, value]) => {
    if (value === true) {
      addons.push(key);
    }
  });
  Object.entries(form.addons).forEach(([key, value]) => {
    if (value === true) {
      addonsPrices.push(Number(key.split('/')[1]));
    }
  });
  
  const totalPlan = Number(form.price.slice(1))
  const totalAddons = addonsPrices.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0,
  );

  const total = totalPlan + totalAddons;
console.log("Acá form", form)

  return (
    <>
      <h1 className="formTitle">Finishing up</h1>
      <p className="formDescription">
        Double-check everything looks OK before confirming.
      </p>
      <div className="summaryContainer">
        <p className="summaryTitle">{`${form.plan} (${form.time})`}<span>{form.price}</span></p>
        <div className="addonsContainer">
          <div>
            <p>
              {addons.map((addon) => {
                return <li key={addon}>{addon.slice(0, -2)}</li>;
              })}
            </p>
          </div>
          <div>
            {addonsPrices.map((price) => {
              return <li className='price' key={price}>$ {price}</li>;
            })}
          </div>
        </div>
        <div className="summaryTotal">
          <span>Total</span><span>${total}</span>
        </div>
      </div>
      <div className="buttonsContainer">
            <button onClick={() => setForm({ ...form, step: "addons" })} className="backButton">
              Go Back
            </button>
            <button className="confirmButton" onClick={()=> setForm({ ...form, step: "orderPlaced" })}>Next</button>
          </div>
    </>
  );
};

const OrderPlaced = () => {
  return(
    <div className="orderPlacedContainer">
      <img src='./icon-thank-you.svg'/>
      <h1>Thank you</h1>
      <p>Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support please feel free to email us at support@loremgaming.com.</p>
    </div>
  )
}
export default Form;
