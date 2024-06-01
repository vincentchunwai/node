const escpos = require('escpos');
escpos.USB = require('escpos-usb');

const options = { encoding: "GB18030" /* default */ };

function printBarcode(code) {
  return new Promise((resolve, reject) => {
    const device = new escpos.USB();
    const printer = new escpos.Printer(device, options);

    device.open((error) => {
      if (error) {
        reject(error);
        return;
      }

      printer
        .font('a')
        .align('ct')
        .style('bu')
        .size(1, 1)
        .barcode(code, 'UPC-A', 4, 80, "BLW", "A", false)
        .text("G4S")
        .cut()
        .close();

      resolve("Barcode printed successfully");
    });
  });
}

module.exports = {
  printBarcode
};
