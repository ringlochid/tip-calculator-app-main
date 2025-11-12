const formTip = document.getElementById('operation-form');
const billInput = document.getElementById('bill');
const tipRadios = Array.from(document.querySelectorAll('input[name="tip"]'));
const customTipInput = document.getElementById('operation-card-custom-tip');
const peopleInput = document.getElementById('number-of-people');
const tipPanel = document.querySelector('.operation-card-tip-panels');

const billError = document.getElementById('bill-error');
const tipError = document.getElementById('tip-error');
const peopleError = document.getElementById('people-error');

const tipAmount = document.getElementById('tip-amount');
const totalAmount = document.getElementById('total-amount');
const resetButton = document.getElementById('reset');

const formatCurrency = (value) => `$${value.toFixed(2)}`;

const MAX_VAL = 9999;

const message_for_bill = (billVal) => {
  if (billVal === '') return '';
  const numeric = Number(billVal);
  if (!Number.isFinite(numeric)) return 'Invalid value';
  if (numeric < 0) return "Can't be negative";
  if (numeric === 0) return "Can't be zero";
  if (numeric > MAX_VAL) return `Max ${MAX_VAL}`;
  return '';
};

const message_for_tip = (tipVal) => {
  if (tipVal === '') return 'Select a tip';
  const numeric = Number(tipVal);
  if (!Number.isFinite(numeric)) return 'Invalid value';
  if (numeric === 0) return "Can't be zero";
  if (numeric < 0) return "Can't be negative";
  if (numeric > 100) return 'Max 100%';
  return '';
};

const message_for_np = (peopleVal) => {
  if (peopleVal === '') return '';
  const numeric = Number(peopleVal);
  if (!Number.isFinite(numeric)) return 'Invalid value';
  if (numeric === 0) return "Can't be zero";
  if (numeric < 0) return "Can't be negative";
  if (numeric > MAX_VAL) return `Max ${MAX_VAL}`;
  return '';
};

const show_msg = (bmsg, tmsg, npmsg) => {
  billError.textContent = bmsg;
  tipError.textContent = tmsg;
  peopleError.textContent = npmsg;

  billInput.classList.toggle('has-error', Boolean(bmsg));
  peopleInput.classList.toggle('has-error', Boolean(npmsg));
  if (tipPanel) {
    tipPanel.classList.toggle('has-error', Boolean(tmsg));
  }
};

const reset_to_zero = () => {
  tipAmount.textContent = '$0.00';
  totalAmount.textContent = '$0.00';
};

const tip_cal = (billVal, tipVal, peopleVal) => {
  const tipTotal = billVal * (tipVal / 100);
  const tipPerPerson = tipTotal / peopleVal;
  const totalPerPerson = billVal / peopleVal + tipPerPerson;
  return [tipPerPerson, totalPerPerson];
};

const getTipSelection = () => {
  const selectedRadio = tipRadios.find((radio) => radio.checked);
  if (selectedRadio) {
    return selectedRadio.value;
  }
  return customTipInput.value.trim();
};

const valueCheckers = {
  bill: () => billInput.value.trim() !== '',
  tip: () => getTipSelection() !== '',
  people: () => peopleInput.value.trim() !== '',
};

const dependenciesReady = {
  bill: () => valueCheckers.tip() && valueCheckers.people(),
  tip: () => valueCheckers.bill() && valueCheckers.people(),
  people: () => valueCheckers.bill() && valueCheckers.tip(),
};

const canUpdate = (key) => valueCheckers[key]() && dependenciesReady[key]();

const toggleResetState = () => {
  const hasAnyValue =
    valueCheckers.bill() || valueCheckers.tip() || valueCheckers.people();
  if (resetButton) {
    resetButton.disabled = !hasAnyValue;
  }
};

const handleFieldChange = (key) => {
  toggleResetState();
  if (canUpdate(key)) {
    update_res();
  } else {
    show_msg('', '', '');
    reset_to_zero();
  }
};

const update_res = () => {
  const billValRaw = billInput.value.trim();
  const peopleValRaw = peopleInput.value.trim();
  const tipValRaw = getTipSelection();

  const hasBill = billValRaw !== '';
  const hasPeople = peopleValRaw !== '';
  const hasTip = tipValRaw !== '';

  if (!hasBill || !hasPeople) {
    show_msg('', '', '');
    reset_to_zero();
    return;
  }

  if (!hasTip) {
    show_msg('', 'Select a tip', '');
    reset_to_zero();
    return;
  }

  const billMsg = message_for_bill(billValRaw);
  const tipMsg = message_for_tip(tipValRaw);
  const peopleMsg = message_for_np(peopleValRaw);

  show_msg(billMsg, tipMsg, peopleMsg);

  if (billMsg || tipMsg || peopleMsg) {
    reset_to_zero();
    return;
  }

  const billVal = Number(billValRaw);
  const tipVal = Number(tipValRaw);
  const peopleVal = Number(peopleValRaw);

  const [tipPerPerson, totalPerPerson] = tip_cal(billVal, tipVal, peopleVal);
  tipAmount.textContent = formatCurrency(tipPerPerson);
  totalAmount.textContent = formatCurrency(totalPerPerson);
};

const clearRadios = () => {
  tipRadios.forEach((radio) => {
    radio.checked = false;
  });
};

customTipInput.addEventListener('input', () => {
  if (customTipInput.value.trim() !== '') {
    clearRadios();
  }
  handleFieldChange('tip');
});

tipRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    customTipInput.value = '';
    handleFieldChange('tip');
  });
});

billInput.addEventListener('input', () => handleFieldChange('bill'));
peopleInput.addEventListener('input', () => handleFieldChange('people'));

resetButton?.addEventListener('click', () => {
  formTip.reset();
  show_msg('', '', '');
  reset_to_zero();
  toggleResetState();
});

toggleResetState();
