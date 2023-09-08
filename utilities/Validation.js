export function isInvalidName(name) {
  const pattern = /^\s|\d/;
  const doesContainsPattern = pattern.test(name);

  return doesContainsPattern;
}

export function isInvalidEmail(email) {
  const pattern = /@/;
  const isNotEmpty = email.length !== 0;
  const doesNotContainsPattern = pattern.test(email) === false;

  return doesNotContainsPattern && isNotEmpty;
}

export function isInvalidNumber(phoneNumber) {
  const isNotElevenDigits = phoneNumber.length !== 11;
  const isNotEmpty = phoneNumber.length !== 0;

  return isNotElevenDigits && isNotEmpty;
}

export function shouldProceed(isEmpty, isInvalid) {
  const isEmptyValues = Object.values(isEmpty);
  const isInvalidValues = Object.values(isInvalid);
  let shouldProceed = true;

  if (isEmptyValues.includes(true)) {
    shouldProceed = false;
  }

  if (isInvalidValues.includes(true)) {
    shouldProceed = false;
  }

  return shouldProceed;
}

export function isEmpty(value) {
  return value.length === 0;
}

export function hasPlan(plan) {
  return plan !== "";
}
