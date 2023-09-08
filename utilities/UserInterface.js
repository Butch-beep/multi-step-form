let activeStep = 1;

export function setStep(operation) {
  activeStep = operation;
}

export function getStep() {
  return activeStep;
}

export function changeContent(id) {
  let elements = Object.values(
    document.getElementsByClassName("content__container")
  );

  elements.map((elem) => {
    elem.style.display = elements.indexOf(elem) === id - 1 ? "flex" : "none";
  });

  return this;
}

export function toggleFreeMonths(element) {
  let isYearly = element;
  let containerFree = document.querySelectorAll(".main.free");
  let containerPrice = document.querySelectorAll(".main.price");
  let yearlyPrice = {
    arcade__price: "$90/yr",
    advanced__price: "$120/yr",
    pro__price: "$150/yr",
  };

  let monthlyPrice = {
    arcade__price: "$9/mo",
    advanced__price: "$12/mo",
    pro__price: "$15/mo",
  };

  containerFree.forEach((elem) => {
    if (isYearly) {
      elem.classList.remove("hidden");
    } else {
      elem.classList.add("hidden");
    }
  });

  containerPrice.forEach((elem, index) => {
    if (isYearly) {
      elem.innerHTML = `${Object.values(yearlyPrice)[index]}`;
    } else {
      elem.innerHTML = `${Object.values(monthlyPrice)[index]}`;
    }
  });
}

export function toggleNavigation(activeStep) {
  const lastStep = 5;
  const isLastStep = activeStep === lastStep;
  const navigation = document.querySelector(".content__navigation");
  if (isLastStep) {
    navigation.style.display = "none";
  } else {
    navigation.style.display = "flex";
  }
}

export function redirectToStepTwo() {
  let secondStep = 2;

  this.changeBackgroundColor(secondStep);
  this.changeContent(secondStep);
  this.changeTextofNext(secondStep);
}

export function changeTextOfNext(step) {
  let finalStep = 4;
  let isFinalStep = step === finalStep;
  let element = document.getElementsByClassName("navigation__next")[0];

  if (isFinalStep) {
    element.innerHTML = "Confirm";
  } else {
    element.innerHTML = "Next";
  }
}

export function toggleBack() {
  let firstStep = 1;
  let isNotFirstStep = activeStep !== firstStep;

  if (isNotFirstStep) {
    document.querySelector(".navigation__back").classList.remove("invisible");
  } else {
    document.querySelector(".navigation__back").classList.add("invisible");
  }
}

export function changePlanBorder(plan) {
  let elements = document.querySelectorAll(".main.plan");

  elements.forEach((elem) => {
    if (elem === plan) {
      elem.classList.add("border-blue-900");
    } else {
      elem.classList.remove("border-blue-900");
    }
  });
}

export function changeAddOnsBorder(addOns) {
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
}

export function changeBackgroundColor(step) {
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
}

export function updateTermSummary(term) {
  const pascal = term[0].toUpperCase() + term.substring(1);

  document.querySelector(".breakdown__term").innerHTML = `(${pascal})`;
}

export function updatePlanSummary(plan) {
  const pascal = plan[0].toUpperCase() + plan.substring(1);

  document.querySelector(".breakdown__plan").innerHTML = pascal;
}

export function updatePlanPriceSummary(price, term) {
  const element = document.querySelector(".breakdown__price");

  if (term === "yearly") {
    element.innerHTML = `$${price / 12}/mo`;
  } else {
    element.innerHTML = `$${price}/mo`;
  }
}

export function updateAddOnsSummary(addOns) {
  const list = ["online-service", "larger-storage", "customizable-profile"];

  list.forEach((value) => {
    const element = document.querySelector(`.summary__${value}`);
    if (addOns.includes(value)) {
      element.classList.remove("hidden");
      element.classList.add("flex");
    } else {
      element.classList.remove("flex");
      element.classList.add("hidden");
    }
  });
}

export function updateGrandTotal(total) {
  document.querySelector(
    ".main.step-four__total-amount"
  ).innerHTML = `$${total}/mo`;
}

export function toggleDisplayPlanError(hasNoPlan) {
  const message = document.querySelector(".error__empty-plan");
  if (hasNoPlan) {
    message.classList.remove("hidden");
  } else {
    message.classList.add("hidden");
  }
}

export function toggleDisplayEmptyName(isEmpty) {
  const element = document.querySelector(".error__empty-name");
  if (isEmpty) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
}

export function toggleDisplayEmptyEmail(isEmpty) {
  const element = document.querySelector(".error__empty-email");
  if (isEmpty) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
}

export function toggleDisplayEmptyNumber(isEmpty) {
  const element = document.querySelector(".error__empty-number");
  if (isEmpty) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
}

export function toggleDisplayInvalidName(isInvalidName) {
  const element = document.querySelector(".error__invalid-name");
  if (isInvalidName) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
}

export function toggleDisplayInvalidEmail(isInvalidEmail) {
  const element = document.querySelector(".error__invalid-email");
  if (isInvalidEmail) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
}

export function toggleDisplayInvalidNumber(isInvalidNumber) {
  const element = document.querySelector(".error__invalid-number");

  if (isInvalidNumber) {
    element.classList.remove("hidden");
  } else {
    element.classList.add("hidden");
  }
}

function next() {
  // Increment step
  const finalStep = 5;
  const isNotFinalStep = activeStep !== finalStep;
  const isNotStepFour = activeStep !== 4;
  if (isNotFinalStep) {
    setStep(activeStep + 1);
  }

  // Change background color of sidebar
  if (isNotStepFour) {
    changeBackgroundColor(activeStep);
  }

  // Change content
  changeContent(activeStep);

  // Toggle display of back
  toggleBack();

  // Toggle display of navigation
  toggleNavigation(activeStep);

  // Change text of next button
  changeTextOfNext(activeStep);
}

export function errorInvoker(isEmpty, isInvalid, hasNoPlan, currentStep) {
  toggleDisplayEmptyName(isEmpty.name);
  toggleDisplayEmptyEmail(isEmpty.email);
  toggleDisplayEmptyNumber(isEmpty.number);
  toggleDisplayInvalidName(isInvalid.name);
  toggleDisplayInvalidEmail(isInvalid.email);
  toggleDisplayInvalidNumber(isInvalid.number);

  if (currentStep === 2) {
    toggleDisplayPlanError(hasNoPlan);
  }
}

export function nextInvoker(currentStep, isValidInfo, hasPlan) {
  if (currentStep === 1 && isValidInfo) {
    next();
  }

  if (currentStep === 2 && hasPlan) {
    next();
  }

  if (currentStep > 2) {
    next();
  }
}
