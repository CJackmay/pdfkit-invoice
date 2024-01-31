const { getRandomInteger, generateRandomAlphaNumeric } = require("labs-sharable");
const { createInvoice } = require("./createInvoice.js");

// amount x 100
const getAmount = (amount) => {
  return amount * 100
}

const total = (items) => {
  let sum = 0;
  for (let i = 0; i < items.length; i++){
    var item = items[i];
    if (item.amount === undefined) continue;
    sum = (item.amount) + sum;
  }
  return sum;
}

const getData = () => Array.from(new Array(4), () => (getRandomInteger(9))).join("");
const id = Number.parseInt(getData());

var items = [
  {
    item: "Legal Consultation",
    description: "",
    quantity: 1,
    amount: getAmount(2500)
  },
]

const invoice = {
  shipping: {
    name: 'Confidence Jackmay - Akub AB',
    address: 'Box 7720',
    city: 'Stockholm',
    state: 'Stockholm lan, SE- 103 95',
    country: 'Sweden',
    postal_code: 48015,
    phone: "",
    email: "VAT- SE556933302301"
  },
  items: items,
  subtotal: total(items),
  paid: total(items),
  date: "14th Oct 2023",
  invoice_nr: id
};

createInvoice(invoice, `invoice_${id}-${generateRandomAlphaNumeric(6)}.pdf`);