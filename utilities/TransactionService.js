let name = "";

let email = "";

let phoneNumber = "";

let addOns = [];

let plan = "";

let term = "monthly";

let totalPlan = 0;

let totalAddOns = 0;

let grandTotal = 0;

export function setName(clientName) {
  name = clientName;
}

export function setEmail(clientEmail) {
  email = clientEmail;
}

export function setPhoneNumber(clientNumber) {
  phoneNumber = clientNumber;
}

export function setPlan(selectedPlan) {
  plan = selectedPlan;
}

export function setTerm(isYearly) {
  if (isYearly) {
    term = "yearly";
  } else {
    term = "monthly";
  }
}

export function setAddOns(selectedAddOns) {
  let index = addOns.indexOf(selectedAddOns);
  let doesInclude = 0 > index;

  if (doesInclude) {
    addOns.push(selectedAddOns);
  } else {
    addOns.splice(index, 1);
  }
}

export function getName() {
  return name;
}

export function getEmail() {
  return email;
}

export function getPhoneNumber() {
  return phoneNumber;
}

export function getPlan() {
  return plan;
}

export function getTerm() {
  return term;
}

export function getAddOns() {
  return addOns;
}

export function setTotalPlan(plan, term) {
  let total = 0;

  const planPrices = {
    arcade: { monthly: 9, yearly: 90 },
    advanced: { monthly: 12, yearly: 120 },
    pro: { monthly: 15, yearly: 150 },
  };

  if (plan !== undefined) {
    total = planPrices[plan][term];
  }

  totalPlan = total;
}

export function getTotalPlan() {
  return totalPlan;
}

export function setTotalAddOns(addOns) {
  let total = 0;

  const addOnsList = [
    "online-service",
    "larger-storage",
    "customizable-profile",
  ];

  const addOnsPrices = {
    "online-service": 1,
    "larger-storage": 2,
    "customizable-profile": 2,
  };

  addOnsList.forEach((value) => {
    if (addOns.includes(value)) {
      const price = addOnsPrices[value];
      total += price;
    }
  });

  totalAddOns = total;
}

export function getTotalAddOns() {
  return totalAddOns;
}

export function setGrandTotal() {
  let total = 0;
  const term = this.getTerm();

  if (term === "yearly") {
    const totalPlan = this.getTotalPlan() / 12;
    total += totalPlan;
  } else {
    total += this.getTotalPlan();
  }

  total += this.getTotalAddOns();

  grandTotal = total;
}

export function getGrandTotal() {
  return grandTotal;
}
