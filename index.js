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
    item: "Apple app-store publishing",
    // description: "App signing and release",
    description: "",
    quantity: 2,
    amount: getAmount(198)
  },
  {
    item: "Android play-store recurring analytics fees",
    description: "",
    // description: "Playstore release",
    quantity: 1,
    amount: getAmount(62)
  },
  {
    item: "Frontend Repo/code management",
    // description: "Continuous CI/CD",
    description: "",
    quantity: 1,
    amount: getAmount(130.4)
  },
  {
    item: "Cloud functions management and continuous deployment",
    description: "",
    quantity: 1,
    amount: getAmount(218.4)
  },
]

const invoice = {
  shipping: {
    name: 'Buka Drect AB (556933-3023)',
    address: 'Box 7720',
    city: 'SE-103 95 Stockholm city',
    state: 'Stockholm',
    country: 'Sweden',
    postal_code: 48015,
    phone: "admin@boka.direct",
    email: "VAT- SE556933302301"
  },
  items: items,
  subtotal: total(items) + (total(items) * 20) / 100, // vat
  paid: 0,
  date: "2nd October 2023",
  due: "12th October 2023",
  invoice_nr: id
};

createInvoice(invoice, `invoice_${id}-${generateRandomAlphaNumeric(6)}.pdf`);