import * as UserInterface from "../utilities/UserInterface.js";
import * as TransactionService from "../utilities/TransactionService.js";
import * as Validation from "../utilities/Validation.js";

// Event: Change step using the sidebar
let sidebarButtonElements = document.querySelectorAll("button.sidebar");

sidebarButtonElements.forEach((elem) => {
  elem.addEventListener("click", () => {
    const convert = {
      "step-one": 1,
      "step-two": 2,
      "step-three": 3,
      "step-four": 4,
    };
    UserInterface.setStep(convert[elem.id]);

    const currentStep = UserInterface.getStep();

    // Change background color of sidebar
    UserInterface.changeBackgroundColor(currentStep);

    // Change content
    UserInterface.changeContent(currentStep);

    // Change text of next button
    UserInterface.changeTextOfNext(currentStep);

    // Toggle display of back
    UserInterface.toggleBack();
  });
});

// Event: Next
document.querySelector(".navigation__next").addEventListener("click", () => {
  const info = {
    name: TransactionService.getName(),
    email: TransactionService.getEmail(),
    number: TransactionService.getPhoneNumber(),
  };

  const isEmpty = {
    name: Validation.isEmpty(info.name),
    email: Validation.isEmpty(info.email),
    number: Validation.isEmpty(info.number),
  };

  const isInvalid = {
    name: Validation.isInvalidName(info.name),
    email: Validation.isInvalidEmail(info.email),
    number: Validation.isInvalidNumber(info.number),
  };

  // Toggle display of error messages
  const plan = TransactionService.getPlan();
  const hasPlan = Validation.hasPlan(plan);
  const hasNoPlan = hasPlan === false;
  const currentStep = UserInterface.getStep();
  UserInterface.errorInvoker(isEmpty, isInvalid, hasNoPlan, currentStep);

  // Proceed to next step
  const isValidInfo = Validation.shouldProceed(isEmpty, isInvalid);
  UserInterface.nextInvoker(currentStep, isValidInfo, hasPlan);
});

// Event: Back
document.querySelector(".navigation__back").addEventListener("click", () => {
  // Decrement step
  const firstStep = 1;
  const currentStep = UserInterface.getStep();
  const isNotFirstStep = currentStep !== firstStep;

  if (isNotFirstStep) {
    UserInterface.setStep(currentStep - 1);
  }

  // Toggle display of back
  UserInterface.toggleBack();

  // Change text of next button
  UserInterface.changeTextOfNext(UserInterface.getStep());

  // Change background color of sidebar
  UserInterface.changeBackgroundColor(UserInterface.getStep());

  // Change content
  UserInterface.changeContent(UserInterface.getStep());
});

// Event: Update summary
document
  .querySelector(".breakdown__change-plan")
  .addEventListener("click", () => {
    // Redirect to step two
    UserInterface.setStep(2);

    // Change background color of sidebar
    UserInterface.changeBackgroundColor(UserInterface.getStep());

    // Change content
    UserInterface.changeContent(UserInterface.getStep());

    // Change text of next button
    UserInterface.changeTextOfNext(UserInterface.getStep());

    // Toggle display of back
    UserInterface.toggleBack();
  });

// Event: Choose plan
let plansButton = document.querySelectorAll(".main.plan");

plansButton.forEach((elem) => {
  elem.addEventListener("click", () => {
    // Set plan
    TransactionService.setPlan(elem.id);

    // Set total
    const plan = TransactionService.getPlan();
    const term = TransactionService.getTerm();
    TransactionService.setTotalPlan(plan, term);
    TransactionService.setGrandTotal();

    // Change plan border
    UserInterface.changePlanBorder(elem);

    // Update plan summary
    UserInterface.updatePlanSummary(plan);

    // Update price summary
    const totalPlan = TransactionService.getTotalPlan();
    UserInterface.updatePlanPriceSummary(totalPlan, term);

    // Update total
    const grandTotal = TransactionService.getGrandTotal();
    UserInterface.updateGrandTotal(grandTotal);
  });
});

// Event: Change terms
const inputTerms = document.querySelector("#terms");

inputTerms.addEventListener("change", () => {
  // Set terms
  TransactionService.setTerm(inputTerms.checked);

  // Set totalPlan
  const plan = TransactionService.getPlan();
  const term = TransactionService.getTerm();
  TransactionService.setTotalPlan(plan, term);
  TransactionService.setGrandTotal();

  // Toggle display of free months;
  const shouldDisplayFreeMonths = inputTerms.checked;
  UserInterface.toggleFreeMonths(shouldDisplayFreeMonths);

  // Update term summary
  UserInterface.updateTermSummary(term);

  // Update price summary
  const totalPlan = TransactionService.getTotalPlan();
  UserInterface.updatePlanPriceSummary(totalPlan, term);

  // Update total
  const grandTotal = TransactionService.getGrandTotal();
  UserInterface.updateGrandTotal(grandTotal);
});

// Event: Add-ons
let onlineService = document.querySelectorAll("#online-service")[0];
let largerStorage = document.querySelectorAll("#larger-storage")[0];
let customizableProfile = document.querySelectorAll("#customizable-profile")[0];
let addOnsElement = [onlineService, largerStorage, customizableProfile];

addOnsElement.forEach((elem) => {
  elem.addEventListener("change", () => {
    // Add or delete add-ons
    TransactionService.setAddOns(elem.id);

    // Update add-ons summary
    const addOns = TransactionService.getAddOns();
    UserInterface.updateAddOnsSummary(addOns);

    // Update total add ons
    TransactionService.setTotalAddOns(addOns);
    TransactionService.setGrandTotal();

    // Update total
    const grandTotal = TransactionService.getGrandTotal();
    UserInterface.updateGrandTotal(grandTotal);

    // ChangeAddOnsBorder
    UserInterface.changeAddOnsBorder(addOns);
  });
});

// Event: Personal-info
let inputs = document.querySelectorAll(".step-one__content > label > input");

inputs.forEach((elem) => {
  elem.addEventListener("input", () => {
    // Set name
    if (elem.id === "name") {
      TransactionService.setName(elem.value);
    }

    // Set email
    if (elem.id === "email") {
      TransactionService.setEmail(elem.value);
    }

    // Set phone number
    if (elem.id === "phoneNumber") {
      TransactionService.setPhoneNumber(elem.value);
    }
  });
});

// Event: Confirm TransactionService
const data = {
  name: TransactionService.getName(),
  email: TransactionService.getEmail(),
  phoneNumber: TransactionService.getPhoneNumber(),
  plan: TransactionService.getPlan(),
  addOns: TransactionService.getAddOns(),
  total: TransactionService.getGrandTotal(),
};

// Submit data

// Event: setTotalPlan, setTotalAddOns, setTerm
// Observable:
