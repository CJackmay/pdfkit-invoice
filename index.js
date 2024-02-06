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
    item: "Onsite service charge for beauty reservation",
    description: "",
    quantity: 1,
    amount: getAmount(3500)
  },
]

const invoice = {
  shipping: {
    name: 'Anna Sise',
    address: 'Gotlandsgatan 56',
    city: '',
    state: 'SE-116 65 Stockholm SE',
    country: 'Sweden',
    postal_code: 48015,
    phone: "",
    email: "sisemiusicprod@gmail.com"
  },
  items: items,
  subtotal: total(items),
  paid: total(items),
  date: "1st November 2023",
  invoice_nr: id
};

createInvoice(invoice, `receipt_${id}-${generateRandomAlphaNumeric(6)}.pdf`);