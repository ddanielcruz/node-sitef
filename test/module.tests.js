const expect = require("expect");
const pinpad = require("../config/pinpad");
const Sitef = require("../src/sitef");

describe("Integridade do módulo", () => {
  it("Deve configurar o PinPad", async () => {
    const sitef = new Sitef(pinpad.dll);
    const status = await sitef.configurar(pinpad);

    expect(status).not.toBeNull();
    expect(status).toBe(0);
  });
});

describe("Integridade dos métodos", function() {
  this.enableTimeouts(false);
  const sitef = new Sitef(pinpad.dll);

  it("Deve verificar a presença do PinPad", async () => {
    const status = await sitef.verificarPresenca();
    expect(status).toBeTruthy();
  });

  it("Deve escrever mensagem no PinPad", async () => {
    await sitef.escreverMensagem("Lorem ipsum");
  });
});
