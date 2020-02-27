# Node SiTef

Biblioteca Node.js para interação com o **SiTef** através de sua DLL, utilizando [C++ Addons](https://nodejs.org/api/addons.html).

Todas as regras informadas na documentação do SiTef se mantém. O pacote é apenas um intermediário para a DLL, facilitando seu uso em **projetos Node.js**.

## Documentação

- [Node SiTef](#node-sitef)
  - [Documentação](#documenta%c3%a7%c3%a3o)
  - [Importante!](#importante)
  - [Configuração](#configura%c3%a7%c3%a3o)
  - [Utilização](#utiliza%c3%a7%c3%a3o)
    - [Configuração](#configura%c3%a7%c3%a3o-1)
    - [Verificação de presença](#verifica%c3%a7%c3%a3o-de-presen%c3%a7a)
    - [Escrever mensagem](#escrever-mensagem)
    - [Iniciar função](#iniciar-fun%c3%a7%c3%a3o)
    - [Continuar função](#continuar-fun%c3%a7%c3%a3o)
    - [Finalizar função](#finalizar-fun%c3%a7%c3%a3o)
    - [Confirmação do usuário](#confirma%c3%a7%c3%a3o-do-usu%c3%a1rio)
  - [Contribuidores](#contribuidores)
  - [Licença](#licen%c3%a7a)

## Importante!

O pacote está em fase de **desenvolvimento** e por enquanto só foi testado utilizando Linux x64. Em outros sistemas, como o Windows, ele pode não funcionar devido o mapeamento em C++.

## Configuração

Após adicionar o pacote, no root do seu projeto, adicione o arquivo `CliSiTef.ini` para configurar o SiTef. Ele deve ser adicionado no root para que a biblioteca possa encontrá-lo.

Por fim, crie uma pasta `bin` na sua aplicação (ou algum outro nome de sua preferência) e adicione as DLLs do SiTef. Elas serão referenciadas posteriormente.

## Utilização

O pacote possui apenas uma única classe a qual irá representar o SiTef. Através dela que serão realizadas todas as operações. Para utilizar o pacote, basta importá-lo e instanciar um novo SiTef passando como parâmetro o caminho para a DLL:

```javascript
const path = require("path");

const CliSiTef = require("node-sitef");

// Caminho absoluto para a DLL do SiTef
const dllPath = path.resolve(__dirname, "..", "bin/libclisitef.so");
const sitef = new CliSiTef(dllPath);
```

### Configuração

Para configurar o PinPad basta chamar o método `configurar`, mapeamento da função `ConfiguraIntSiTefInterativo`. O método recebe um objeto possuindo os parâmetros de configuração, como no seguinte exemplo:

```javascript
// Parâmetro obrigatórios
const parametros = {
  ip: "0.0.0.0",
  loja: "00000000",
  terminal: "00000000",
  reservado: ""
};

const retorno = await sitef.configurar(parametros);
```

Seu retorno é uma `Promise`, que quando concluída irá retornar o código de retorno da função. Os códigos de retorno deste e dos demais métodos são os mesmos da documentação do SiTef.

### Verificação de presença

A função `VerificaPresencaPinPad` está mapeada como `verificarPresenca`. Ela também retorna uma `Promise`, e quando concluída irá retornar o código de retorno da verificação.

```javascript
const retorno = await sitef.verificarPresenca();
```

### Escrever mensagem

A função `EscreveMensagemPermanentePinPad` está mapeada como `escreverMensagem`. Ela recebe apenas um parâmetro que é a mensagem que deve ser uma `String` e retorna uma `Promise`, que quando concluída irá retornar o código de retorno da escrita da mensagem.

```javascript
const retorno = await sitef.escreverMensagem("Lorem ipsum");
```

### Iniciar função

A função `IniciaFuncaoSiTefInterativo` está mapeada como `iniciarFuncao`. Ela possui o mesmo funcionamento da função padrão, porém recebe os parâmetros em um objeto e retorna uma `Promise`, que quando concluída irá retornar o código de retorno.

```javascript
const parametros = {
  funcao: 0,
  valor: "100,00",
  cupomFiscal: "",
  dataFiscal: "",
  horaFiscal: "",
  operador: "",
  parametros: ""
};

const retorno = await sitef.iniciarFuncao(parametros);
```

As regras de negócio da documentação do SiTef se mantém, portanto os dados devem ser informados no mesmo formato requisitado.

### Continuar função

A função `ContinuaFuncaoSiTefInterativo` está mapeada como `continuarFuncao`. O funcionamento do método é o mesmo da função mapeada. Entretanto, existem duas diferenças importantes.

A primeira é que o método recebe os parâmetros como um objeto da mesma forma como os demais métodos. A segunda é que o retorno da `Promise` desta vez não é um literal e sim um objeto.

O motivo de retornar um objeto é porque a função possui parâmetros que são alterados por referência (citados na documentação). Por esse motivo, é retornado um objeto contendo esses valores alterados e o código de retorno da função.

```javascript
const parametros = {
  comando = 0,
  tipoCampo = 0,
  tamMinimo = 0,
  tamMaximo = 0,
  buffer = "",
  tamBuffer = 0,
  continua = 0
};

// Campos retornados no objeto, referentes os parâmetros alterados por referência
const {
  retorno,
  comando,
  tipoCampo,
  tamMinimo,
  tamMaximo,
  buffer
} = await sitef.continuarFuncao(parametros);
```

### Finalizar função

A função `FinalizaFuncaoSiTefInterativo` está mapeada como `finalizarFuncao`. Da mesma maneira que o método `iniciarFuncao`, suas únicas diferenças são os parâmetros informados como objeto e o seu retorno encapsulado em uma `Promise`.

```javascript
const parametros = {
  confirma: "",
  cupomFiscal: "",
  dataFiscal: "",
  horaFiscal: "",
  parametros: ""
};

const retorno = await sitef.finalizarFuncao(parametros);
```

### Confirmação do usuário

A função `LeSimNaoPinPad` está mapeada como `leSimNaoPinPad`. Sua única diferença é que ela é assíncrona e retorna uma `Promise` contendo o resultado da operação.

```javascript
const resposta = await sitef.leSimNaoPinPad("Lorem ipsum?");
```

## Contribuidores

<table>
  <tr>
    <td align="center"><a href="https://github.com/danielccunha"><img src="https://avatars2.githubusercontent.com/u/32555455?s=460&v=4" width="100px;" alt="Daniel Cunha"/><br /><sub><b>Daniel Cunha</b></sub></a></td>
    <td align="center"><a href="https://github.com/fefurst"><img src="https://avatars.githubusercontent.com/u/16591705?v=4" width="100px;" alt="Felipe Furst"/><br /><sub><b>Felipe Furst</b></sub></a></td>    
  </tr>
</table>

## Licença

GNU General Public License v3.0.
