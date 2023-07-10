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
    item: "Conrows",
    description: "Onsite payment",
    quantity: 1,
    amount: getAmount(2000)
  },
]

const invoice = {
  shipping: {
    name: 'Annica Soomaa',
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: 48015,
    phone: "",
    email: "annica@linkdetails.com"
  },
  items: items,
  subtotal: total(items),
  paid: total(items),
  date: "27th June 2023",
  invoice_nr: id
};

createInvoice(invoice, `receipt_${id}-${generateRandomAlphaNumeric(6)}.pdf`);