// UI Class: Handles UI Tasks

class UI {
  constructor() {
    this.activeStep = 1;
  }

  static convertIdToNumber(id) {
    const isString = typeof id === "string";

    if (isString && id === "step-one") {
      return 1;
    } else if (isString && id === "step-two") {
      return 2;
    } else if (isString && id === "step-three") {
      return 3;
    } else if (isString && id === "step-four") {
      return 4;
    } else {
      return id;
    }
  }

  static setStep(step) {
    this.activeStep = step;

    return this;
  }

  static getStep() {
    return this.activeStep;
  }

  static changeBackgroundColor(id) {
    let step = this.convertIdToNumber(id);
    let elements = Object.values(document.getElementsByClassName("circle"));
    let elementToGreenYellow = elements.find(
      (element) => element === elements[step - 1]
    );
    let elementsToTransparent = elements.filter(
      (element) => element !== elements[step - 1]
    );

    // Change background color to green
    elementToGreenYellow.style.backgroundColor = "var(--light-blue)";
    elementToGreenYellow.style.color = "black";
    elementToGreenYellow.style.borderColor = "transparent";

    // Change background color to transparent;
    elementsToTransparent.forEach((element) => {
      element.style.backgroundColor = "transparent";
      element.style.color = "white";
      element.style.borderColor = "white";
    });

    return this;
  }

  static changeContent(id) {
    let elements = Object.values(
      document.getElementsByClassName("content__container")
    );

    elements.map((elem) => {
      elem.style.display = elements.indexOf(elem) === id - 1 ? "flex" : "none";
    });

    return this;
  }

  static highlightPlan(element) {
    let plans = Object.values(
      element.parentElement.getElementsByTagName("button")
    );

    // Change border of plan
    plans.map((plan) => {
      plan.style.border = plan === element ? "red solid" : "";
    });

    return this;
  }

  static toggleDisplayFreeMonths(element) {
    let isYearly = element;
    let elementsFree = document.querySelectorAll(".main.free");
    let elementsPrice = document.querySelectorAll(".main.price");
    let plansYearlyPrice = {
      arcade__price: "$90/yr",
      advanced__price: "$120/yr",
      pro__price: "$150/yr",
    };

    let plansMonthlyPrice = {
      arcade__price: "$9/mo",
      advanced__price: "$12/mo",
      pro__price: "$15/mo",
    };

    elementsFree.forEach((elem, index) => {
      if (isYearly) {
        elem.style.display = "block";
      } else {
        elem.style.display = "none";
      }
    });

    elementsPrice.forEach((elem, index) => {
      if (isYearly) {
        elem.innerHTML = `${Object.values(plansYearlyPrice)[index]}`;
      } else {
        elem.innerHTML = `${Object.values(plansMonthlyPrice)[index]}`;
      }
    });

    return this;
  }

  static toggleDisplayNavigation(activeStep) {
    const lastStep = 5;
    const isLastStep = activeStep === lastStep;
    const navigation = document.querySelector(".content__navigation");
    if (isLastStep) {
      navigation.style.display = "none";
    } else {
      navigation.style.display = "flex";
    }
  }

  static redirectToStepTwo() {
    let secondStep = 2;

    this.changeBackgroundColor(secondStep);
    this.changeContent(secondStep);
    this.changeTextofNext(2);

    return this;
  }

  static changeTextOfNext(id) {
    let step = this.convertIdToNumber(id);
    let finalStep = 4;
    let isFinalStep = step === finalStep;
    let element = document.getElementsByClassName("navigation__next")[0];

    if (isFinalStep) {
      element.innerHTML = "Confirm";
    } else {
      element.innerHTML = "Next";
    }

    return this;
  }

  static toggleDisplayOfBack() {
    let firstStep = 1;
    let isNotFirstStep = UI.activeStep !== firstStep;

    if (isNotFirstStep) {
      document.querySelector(".navigation__back").style.display = "block";
    } else {
      document.querySelector(".navigation__back").style.display = "none";
    }

    return this;
  }

  static changePlanBorder(plan) {
    let elements = document.querySelectorAll(".main.plan");

    elements.forEach((elem) => {
      if (elem === plan) {
        elem.style.border = "red solid";
      } else {
        elem.style.border = "";
      }
    });
  }

  static changeAddOnsBorder(addOns) {
    const addOnElements = Array.from(
      document.querySelectorAll(".main.step-three__add-ons input")
    );

    addOnElements.forEach((element) => {
      const toChange = document.querySelector(`.add-ons__${element.id}`);
      if (addOns.includes(element.id)) {
        toChange.classList.add("border-blue-900");
      } else {
        toChange.classList.remove("border-blue-900");
      }
    });

    console.log(addOnElements);
  }

  static updateTermSummary(term) {
    const pascal = term[0].toUpperCase() + term.substring(1);

    document.querySelector(".breakdown__term").innerHTML = `(${pascal})`;
  }

  static updatePlanSummary(plan) {
    const pascal = plan[0].toUpperCase() + plan.substring(1);

    document.querySelector(".breakdown__plan").innerHTML = pascal;
  }

  static updatePlanPriceSummary(price, term) {
    document.querySelector(".breakdown__price").innerHTML = `$${
      term === "monthly" ? price : parseInt(price / 12)
    }/mo`;
  }

  static updateAddOnsSummary(prices, addOns) {
    const renderedElements = Array.from(
      document.querySelectorAll(".main.step-four__breakdown > .addOns")
    );

    const renderedElementsId = Array.from(
      document.querySelectorAll(".main.step-four__breakdown > .addOns")
    ).map((elem) => {
      return elem.id;
    });

    addOns.forEach((value, index) => {
      if (renderedElementsId.includes(value) === false) {
        const container = document.createElement("div");
        const addOns = document.createElement("p");
        const price = document.createElement("p");
        const classNames = [
          `breakdown__${value}`,
          "addOns",
          "flex",
          "justify-between",
          "align-items",
          "text-gray-400",
        ];

        const pascal = value[0].toUpperCase() + value.substring(1);
        const addOnsText = pascal.replace("-", " ");
        addOns.innerText = addOnsText;
        price.innerText = `+$${prices[index]}/mo`;

        classNames.forEach((className) => {
          container.classList.add(className);
        });

        container.id = `${value}`;
        container.appendChild(addOns);
        container.appendChild(price);
        document
          .querySelector(".main.step-four__breakdown")
          .appendChild(container);
      }
    });

    renderedElements.forEach((value, index) => {
      if (addOns.includes(value.id) === false) {
        value.remove();
      }
    });
  }

  static updateTotalSummary(total) {
    document.querySelector(
      ".main.step-four__total-amount"
    ).innerHTML = `$${total}/mo`;
  }
}

// Transaction Class: Represents a transaction
class Transactions {
  static mainServicePrices = [
    { arcade: [{ monthly: "$9/mo" }, { yearly: "$90/yr" }] },
    { advanced: [{ monthly: "$12/mo" }, { yearly: "$120/yr" }] },
    { pro: [{ monthly: "$15/mo" }, { yearly: "$150/yr" }] },
  ];

  static addOnsPrices = [
    { "online-service": "$1/mo" },
    { "larger-storage": "$2/mo" },
    { "customizable-profile": "$2/mo" },
  ];

  static addOns = [];

  static term = "monthly";

  static setName(name) {
    this.name = name;

    return this;
  }

  static setEmail(email) {
    this.email = email;

    return this;
  }

  static setPhoneNumber(phoneNumber) {
    this.phoneNumber = phoneNumber;

    return this;
  }

  static setPlan(plan) {
    this.plan = plan;

    return this;
  }

  static setTerm(term) {
    if (term) {
      this.term = "yearly";
    } else {
      this.term = "monthly";
    }

    return this;
  }

  static setAddOns(addOns) {
    let index = this.addOns.indexOf(addOns);
    let doesInclude = 0 > index;

    if (doesInclude) {
      this.addOns.push(addOns);
    } else {
      this.addOns.splice(index, 1);
    }

    return this;
  }

  static getName() {
    return this.name;
  }

  static getEmail() {
    return this.email;
  }

  static getPhoneNumber() {
    return this.phoneNumber;
  }

  static getPlan() {
    return this.plan;
  }

  static getTerm() {
    return this.term;
  }

  static getAddOns() {
    return this.addOns;
  }

  static getMainServicePrice(service, term) {
    let prices = this.mainServicePrices;
    let result;

    for (const item of prices) {
      if (Object.keys(item).flat().toString() === service) {
        item[service].map((child) => {
          if (Object.keys(child).toString() === term) {
            let value = Object.values(child).toString();
            let price = value.replace(/[\D]/g, "");
            result = price;
          }
        });
      }
    }
    return result;
  }

  static getAddOnsPrice(service, prices) {
    let list = [];

    service.map((child, index) => {
      for (const item of prices) {
        if (Object.keys(item).toString() === child) {
          let value = Object.values(item).toString();
          let price = value.replace(/[\D]/g, "");
          list.push(price);
        }
      }
    });
    return list;
  }

  static getTotal(planPrice, addOnsPrice, term) {
    let total = 0;

    addOnsPrice.forEach((price) => {
      total += parseInt(price);
    });

    if (planPrice !== undefined) {
      if (term === "yearly") {
        total += parseInt(planPrice / 12);
      } else {
        total += parseInt(planPrice);
      }
    }
    return total;
  }
}

// Event: Change step using the sidebar
let sidebarButtonElements = document.querySelectorAll("button.sidebar");

sidebarButtonElements.forEach((elem) => {
  elem.addEventListener("click", () => {
    UI.setStep(UI.convertIdToNumber(elem.id));

    // Change background color of sidebar
    UI.changeBackgroundColor(UI.activeStep);

    // Change content
    UI.changeContent(UI.activeStep);

    // Change text of next button
    UI.changeTextOfNext(UI.activeStep);

    // Toggle display of back
    UI.toggleDisplayOfBack();
  });
});

// Event: On load

// Set step to first step
document.addEventListener("DOMContentLoaded", () => {
  UI.setStep(1);
});

// Event: Next
document.querySelector(".navigation__next").addEventListener("click", () => {
  // Increment step
  const finalStep = 5;
  const isNotFinalStep = UI.activeStep !== finalStep;
  const isNotStepFour = UI.activeStep !== 4;
  if (isNotFinalStep) {
    UI.activeStep += 1;
  }

  // Change text of next button
  UI.changeTextOfNext(UI.activeStep);

  // Change background color of sidebar
  if (isNotStepFour) {
    UI.changeBackgroundColor(UI.activeStep);
  }

  // Change content
  UI.changeContent(UI.activeStep);
  // Confirm transaction

  // Toggle display of back
  UI.toggleDisplayOfBack();

  // Toggle display of navigation
  UI.toggleDisplayNavigation(UI.getStep());
});

// Event: Back
document.querySelector(".navigation__back").addEventListener("click", () => {
  // Decrement step
  const firstStep = 1;
  const isNotFirstStep = UI.activeStep !== firstStep;

  if (isNotFirstStep) {
    UI.activeStep -= 1;
  }

  // Toggle display of back
  UI.toggleDisplayOfBack();

  // Change text of next button
  UI.changeTextOfNext(UI.activeStep);

  // Change background color of sidebar
  UI.changeBackgroundColor(UI.activeStep);

  // Change content
  UI.changeContent(UI.activeStep);
});

// Event: Update summary
document
  .querySelector(".breakdown__change-plan")
  .addEventListener("click", () => {
    // Redirect to step two
    UI.setStep(2);

    // Change background color of sidebar
    UI.changeBackgroundColor(UI.activeStep);

    // Change content
    UI.changeContent(UI.activeStep);

    // Change text of next button
    UI.changeTextOfNext(UI.activeStep);

    // Toggle display of back
    UI.toggleDisplayOfBack();
  });

// Event: Choose plan
let plansButton = document.querySelectorAll(".main.plan");

plansButton.forEach((elem) => {
  elem.addEventListener("click", () => {
    // Set plan
    Transactions.setPlan(elem.id);

    // Change plan border
    UI.changePlanBorder(elem);

    // Update plan summary
    let plan = Transactions.getPlan();
    UI.updatePlanSummary(plan);

    // Update price summary
    let term = Transactions.getTerm();
    let price = Transactions.getMainServicePrice(plan, term);

    UI.updatePlanPriceSummary(price, term);

    // Update total
    let addOns = Transactions.getAddOns();
    let addOnsPrices = Transactions.addOnsPrices;
    let addOnsPrice = Transactions.getAddOnsPrice(addOns, addOnsPrices);
    let mainServicePriceList = Transactions.getMainServicePrice();
    let planPrice = Transactions.getMainServicePrice(plan, term);

    let total = Transactions.getTotal(planPrice, addOnsPrice, term);

    UI.updateTotalSummary(total);
  });
});

// Event: Change terms
const inputTerms = document.querySelector("#terms");

inputTerms.addEventListener("change", () => {
  // Set terms
  Transactions.setTerm(inputTerms.checked);

  // Toggle display of free months;
  UI.toggleDisplayFreeMonths(inputTerms.checked);

  // Update term summary
  let plan = Transactions.getPlan();
  let term = Transactions.getTerm();
  UI.updateTermSummary(term);

  // Update price summary
  let price = Transactions.getMainServicePrice(plan, term);
  UI.updatePlanPriceSummary(price, term);

  // Update total
  let addOns = Transactions.getAddOns();
  let addOnsPrices = Transactions.addOnsPrices;
  let addOnsPrice = Transactions.getAddOnsPrice(addOns, addOnsPrices);
  let planPrice = Transactions.getMainServicePrice(plan, term);

  let total = Transactions.getTotal(planPrice, addOnsPrice, term);
  UI.updateTotalSummary(total);
});

// Event: Add-ons
let onlineService = document.querySelectorAll("#online-service")[0];
let largerStorage = document.querySelectorAll("#larger-storage")[0];
let customizableProfile = document.querySelectorAll("#customizable-profile")[0];
let addOns = [onlineService, largerStorage, customizableProfile];

addOns.forEach((elem) => {
  elem.addEventListener("change", () => {
    // Add or delete add-ons
    Transactions.setAddOns(elem.id);

    // Update summary
    let addOns = Transactions.getAddOns();
    let addOnsPrices = Transactions.addOnsPrices;
    let addOnsPrice = Transactions.getAddOnsPrice(addOns, addOnsPrices);
    UI.updateAddOnsSummary(addOnsPrice, addOns);

    // Update total
    let term = Transactions.getTerm();
    let plan = Transactions.getPlan();
    let planPrice = Transactions.getMainServicePrice(plan, term);
    let total = Transactions.getTotal(planPrice, addOnsPrice, term);

    UI.updateTotalSummary(total);

    // ChangeAddOnsBorder
    UI.changeAddOnsBorder(addOns);
  });
});

// Event: Personal-info
let inputs = document.querySelectorAll(".step-one__content > label > input");

inputs.forEach((elem) => {
  elem.addEventListener("input", () => {
    // Set name
    if (elem.id === "name") {
      Transactions.setName(elem.value);
    }

    // Set email
    if (elem.id === "email") {
      Transactions.setEmail(elem.value);
    }

    // Set phone number
    if (elem.id === "phoneNumber") {
      Transactions.setPhoneNumber(elem.value);
    }
  });
});

// Event: Confirm transaction

// Event: Instantiate a new transaction
let transaction = new Transactions();
