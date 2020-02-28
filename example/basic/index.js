const path = require("path");

const CliSiTef = require("../../src/cli-sitef");
const config = require("../shared/config");
const { messages } = require("../shared/utils");

// Cria o objeto do SiTef
const dllPath = path.resolve(
  __dirname,
  "..",
  "shared",
  "bin",
  "libclisitef.so"
);
const sitef = new CliSiTef(dllPath);

const main = async () => {
  // Configura o SiTef. Em caso de sucesso deve ser retornado zero
  //let pinh = sitef.configurar(config)
  let pinh = sitef.teste(config)
    .then((response)=>{
      let message = messages.configuracao[response];
      console.log(`ConfiguraIntSiTefInterativo: ${message}`);

      // Não continua caso tenha ocorrido algum erro durante a configuração
      if (response !== 0) {
        throw "Response != 0";
      }
      else {
        // Verifica a presença do PinPad
        console.log(`Verificando presença`);
        return sitef.verificarPresenca();
      }
    }).then((response) => {
        message = messages.verificacaoPresenca[response];
        console.log(`VerificaPresencaPinPad: ${message}`);
        return sitef.escreverMensagem("Lorem Ipsum");
    }).then((response) => {
        // Por fim, escreve uma mensagem no PinPad
        message =
          response === 0
            ? "Mensagem escrita com sucesso."
            : "Não foi possível escrever a mensagem.";
        console.log(`EscreveMensagemPermanentePinPad: ${message}`); 
    })
    .catch((message)=>{
      console.log(`Erro ----> ${message} `)
    });

    console.log("I'm a scatman!!!");
    return pinh;
};

main().then(process.exit)
