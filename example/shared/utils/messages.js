module.exports.configuracao = {
  0: "Não ocorreu erro",
  1: "Endereço IP inválido ou não resolvido",
  2: "Código da loja inválido",
  3: "Código de terminal inválido",
  6: "Erro na inicialização do Tcp/Ip",
  7: "Falta de memória",
  8: "Não encontrou a CliSiTef ou ela está com problemas",
  9: "Configuração de servidores SiTef foi excedida.",
  10: "Erro de acesso na pasta CliSiTef (possível falta de permissão para escrita)",
  11: "Dados inválidos passados pela automação.",
  12: "Modo seguro não ativo (possível falta de configuração no servidor SiTef do arquivo .cha).",
  13: "Caminho DLL inválido (o caminho completo das bibliotecas está muito grande)."
};

module.exports.verificacaoPresenca = {
  1: "Existe um PinPad operacional conectado ao micro.",
  0: "Não existe um PinPad conectado ao micro.",
  "-1": "Biblioteca de acesso ao PinPad não encontrada."
};

module.exports.funcao = {
  0: "Sucesso na execução da função.",
  10000: "Deve ser chamada a rotina de continuidade do processo.",
  "-1":
    "Módulo não inicializado. O PDV tentou chamar alguma rotina sem antes executar a função configura.",
  "-2": "Operação cancelada pelo operador.",
  "-3": "O parâmetro função / modalidade é inexistente/inválido.",
  "-4": "Falta de memória no PDV.",
  "-5": "Sem comunicação com o SiTef.",
  "-6": "Operação cancelada pelo usuário (no pinpad).",
  "-7": "Reservado",
  "-8":
    "A CliSiTef não possui a implementação da função necessária, provavelmente está desatualizada (a CliSiTefI é mais recente).",
  "-9":
    "A automação chamou a rotina ContinuaFuncaoSiTefInterativo sem antes iniciar uma função iterativa.",
  "-10":
    "Algum parâmetro obrigatório não foi passado pela automação comercial.",
  "-12":
    "Erro na execução da rotina iterativa. Provavelmente o processo iterativo anterior não foi executado até o final (enquanto o retorno for igual a 10000).",
  "-13":
    "Documento fiscal não encontrado nos registros da CliSiTef. Retornado em funções de consulta tais como ObtemQuantidadeTransaçõesPendentes.",
  "-15": "Operação cancelada pela automação comercial.",
  "-20": "Parâmetro inválido passado para a função.",
  "-21":
    "Utilizada uma palavra proibida, por exemplo SENHA, para coletar dados em aberto no pinpad. Por exemplo na função ObtemDadoPinpadDiretoEx.",
  "-25": "Erro no Correspondente Bancário: Deve realizar sangria.",
  "-30":
    "Erro de acesso ao arquivo. Certifique-se que o usuário que roda a aplicação tem direitos de leitura/escrita.",
  "-40": "Transação negada pelo servidor SiTef.",
  "-41": "Dados inválidos.",
  "-42": "Reservado",
  "-50": "Transação não segura.",
  "-100": "Erro interno do módulo."
};
