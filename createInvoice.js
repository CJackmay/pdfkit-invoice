const fs = require("fs");
const PDFDocument = require("pdfkit");

function createInvoice(invoice, path) {
  let doc = new PDFDocument({ size: "A4", margin: 50 });

  // generateCompanyHeader(doc);
  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  // generateFooter(doc);

  doc.end();
  doc.pipe(fs.createWriteStream(path));
}

function generateCompanyHeader(doc) {
  const alignment = "left";
  doc
    .image("buka.png", 50, 45, { width: 50 })
    .fillColor("#444444")
    // .fontSize(20)
    // .text("(Buka App) - Buka Drect AB", 110, 57)
    .fontSize(10)
    .text("Buka Drect AB (556933-3023)", 50, 100, { align: alignment })
    .text("Box 7720, 103 95 Stockholm, Sweden", 50, 114, { align: alignment })
    .text("VAT- SE556933302301", 50, 128, { align: alignment })
    .moveDown();
}

function generateHeader(doc) {
  doc
    .fontSize(14)
    .text('African Magic Salon', 200, 48, { align: 'right' })
    .fontSize(8)
    .text('Ölandsgatan 48', 200, 65, { align: 'right' })
    .text('Stockholm, Stockholm lan, 11663 Sweden', 200, 80, { align: 'right' })
    .text('VAT- SE 720325182701', 200, 95, { align: 'right' })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Receipt", 50, 160);

  generateHr(doc, 185);

  const customerInformationTop = 200;

  doc
    .fontSize(10)
    .text("Receipt Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Date:", 50, customerInformationTop + 15)
    .text(invoice.date, 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.subtotal - invoice.paid),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text("Bill to", 300, customerInformationTop- 25)
    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      `${invoice.shipping.city.length > 1 ?
        `${invoice.shipping.city},` : ""}${invoice.shipping.state.length > 1 ?
        `${invoice.shipping.state},` : ""}${invoice.shipping.country.length > 1 ?
          `${invoice.shipping.country}` : ""}`,
      300,
      customerInformationTop + 30
  )
    .text(invoice.shipping.email, 300,
      customerInformationTop + 45)
    .moveDown();

  generateHr(doc, 260);

  // invoice.shipping.city +
  //   ", " +
  //   invoice.shipping.state +
  //   ", " +
  //   invoice.shipping.country
}

function generateInvoiceTable(doc, invoice) {
  let i;
  const invoiceTableTop = 330;

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "Item",
    "Description",
    "Unit Cost",
    "Quantity",
    "Line Total"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    const position = invoiceTableTop + (i + 1) * 30;
    generateTableRow(
      doc,
      position,
      item.item,
      item.description,
      formatCurrency(item.amount / item.quantity),
      item.quantity,
      formatCurrency(item.amount)
    );

    generateHr(doc, position + 20);
  }

  const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );
  const vatToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    vatToDatePosition,
    "",
    "",
    "VAT(25%)",
    "",
    formatCurrency((invoice.subtotal * 25)/100)
  );

  const paidToDatePosition = vatToDatePosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
  doc.font("Helvetica");
}

function generateFooter(doc) {
  doc
    .fontSize(10)
    .text(
      "This purchase is subject to the international market rate of exchange 1 Euro to 5.57 Swedish Krone",
      50,
      780,
      { align: "center", width: 500 }
    );
}

function generateTableRow(
  doc,
  y,
  item,
  description,
  unitCost,
  quantity,
  lineTotal
) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(unitCost, 280, y, { width: 90, align: "right" })
    .text(quantity, 370, y, { width: 90, align: "right" })
    .text(lineTotal, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(50, y)
    .lineTo(550, y)
    .stroke();
}

function formatCurrency(cents) {
  //.toFixed(2)
  return "kr" +((cents / 100)).toLocaleString("en-US");
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice
};
