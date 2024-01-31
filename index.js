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
    item: "Operations fee",
    description: "",
    quantity: 1,
    amount: getAmount(65.96)
  },
  {
    item: "Micro-services repo management (Full-stack)",
    description: "",
    quantity: 1,
    amount: getAmount(403.58)
  },
]

const invoice = {
  shipping: {
    name: 'Akub AB (556933-3023)',
    address: 'Box 7720',
    city: 'SE-103 95 Stockholm city',
    state: 'Stockholm',
    country: 'Sweden',
    postal_code: 48015,
    phone: "admin@boka.direct",
    email: "VAT- SE556933302301"
  },
  items: items,
  subtotal: total(items), // vat
  // subtotal: total(items) + (total(items) * 20) / 100, // vat
  paid: getAmount(469.54),
  date: "20th November 2023",
  due: "1st December 2023",
  invoice_nr: id
};

createInvoice(invoice, `invoice_${id}-${generateRandomAlphaNumeric(6)}.pdf`);


// var items = [
//   {
//     item: "Eden AI services for api consumption",
//     description: "",
//     quantity: 1,
//     amount: getAmount(100)
//   },
//   {
//     item: "Sub-Cloud infrastructure - proxy services",
//     description: "",
//     quantity: 1,
//     amount: getAmount(60)
//   },
//   {
//     item: "Api documentations",
//     description: "",
//     quantity: 1,
//     amount: getAmount(40)
//   },
//   {
//     item: "IP lookup api access",
//     description: "",
//     quantity: 1,
//     amount: getAmount(16.4)
//   },
//   {
//     item: "PDF Kit manipulation services",
//     description: "",
//     quantity: 1,
//     amount: getAmount(12)
//   },
//   {
//     item: "Micro-services repo management (Full-stack)",
//     description: "",
//     quantity: 1,
//     amount: getAmount(80)
//   },
// ]