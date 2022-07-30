const billInput = document.getElementById("bill-input");
const tipSelect = document.getElementsByClassName("tip-percent");
const customTip = document.getElementById("custom-tip");
const peopleCount = document.getElementById("people-input");
const totalTip = document.getElementById("tip__result--tip");
const totalBill = document.getElementById("tip__result--bill");
const reset = document.getElementById("reset");

let billValue = 0;
let peopleVal = 1;
let tipVal = 0.15;

const validateBill = () => {
  billValue = parseFloat(billInput.value);
  calculate();
};

const customTipValue = () => {
  for (let tipBtn of tipSelect) {
    tipBtn.classList.remove("active");
  }

  if (customTip.value >= 0) {
    tipVal = customTip.value / 100;
    calculate();
  }
};

const setPeopleValue = () => {
  peopleCount.classList.remove("error");
  peopleVal = parseFloat(peopleCount.value);

  if (peopleVal <= 0) {
    const errorLabel = document.querySelector("p.error");

    peopleCount.classList.add("error");
    errorLabel.style.visibility = "visible";

    setTimeout(() => {
      errorLabel.style.visibility = "hidden";
      peopleCount.classList.remove("error");

      peopleCount.value = "";
    }, 2000);
  }

  calculate();
};

const handleReset = () => {
  billInput.value = 0;
  validateBill();

  tipSelect[2].click();
  customTip.value = "";

  peopleCount.value = 1;
  setPeopleValue();
};

const handleClick = (event) => {
  for (let tipBtn of tipSelect) {
    tipBtn.classList.remove("active");

    if (event.target === tipBtn) {
      tipBtn.classList.add("active");

      tipVal = parseFloat(tipBtn.innerHTML.replace("%", "")) / 100;
    }
  }

  calculate();
};

const calculate = () => {
  if (peopleVal >= 1) {
    let tip = (billValue * tipVal) / peopleVal;
    let totalAmount = (billValue * (tipVal + 1)) / peopleVal;

    totalTip.innerHTML = "$" + tip.toFixed(2);
    totalBill.innerHTML = "$" + totalAmount.toFixed(2);
  }
};

billInput.addEventListener("input", validateBill);
customTip.addEventListener("input", customTipValue);
peopleCount.addEventListener("input", setPeopleValue);
reset.addEventListener("click", handleReset);
for (let tip of tipSelect) {
  tip.addEventListener("click", handleClick);
}

// Reset values on reload;
window.onload = handleReset;
