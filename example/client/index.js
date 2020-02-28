const chalk = require("chalk");

const { askQuestion } = require("../shared/utils");
const client = require("./client");

const createOption = (title, handler) => ({ title, handler });

// Cria as opções do client
const options = {
  C: createOption("Configurar", client.configurar),
  V: createOption("Verificar presença", client.verificarPresenca),
  E: createOption("Escrever mensagem", client.escreverMensagem),
  F: createOption("Simular função", client.simularFuncao),
  L: createOption("Limpar console", console.clear),
  M: createOption("Mostrar menu", showMenu),
  S: createOption("Sair", () => console.log("Encerrando o processo..."))
};

const keys = Object.keys(options);

function showMenu() {
  console.log(chalk.green("\n\n\t\tSiTef Interativo\n\n"));

  for (const key in options) {
    console.log(`- ${chalk.green(key + ":")} ${options[key].title}`);
  }

  console.log();
}

// Cria a função principal. Necessário criar neste formato para poder utilizar async await
const main = async () => {
  showMenu();

  do {
    let option = await askQuestion("Opção: ");
    option = option ? option.toUpperCase() : "";

    if (!keys.includes(option)) {
      console.log(chalk.red("Opção inválida! Digite novamente.\n"));
    } else {
      await options[option].handler();
      if (option == "S") break;
    }
  } while (true);
};

// Por fim, finaliza o processo quando terminado a função
main().then(process.exit);
