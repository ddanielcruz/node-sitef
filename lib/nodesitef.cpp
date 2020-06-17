#include "nodesitef.hpp"
#include "promises/promises.hpp"

#ifdef _WIN32
HMODULE handler;
#endif

#ifdef linux
void *handler;
#endif

Value carregarDLL(const CallbackInfo &info)
{
  Env env = info.Env();

  if (handler)
    return Boolean::New(env, true);

  if (info.Length() < 1)
    napi_throw_error(env, "0", "Informe o caminho da DLL.");
  else if (!info[0].IsString())
    napi_throw_type_error(env, "1", "O caminho informado não é uma string válida.");
  else
  {
    string path = info[0].ToString().Utf8Value();
    #ifdef _WIN32
    handler = LoadLibrary(path.c_str());
    #endif

    #ifdef linux
    handler = dlopen(path.c_str(), RTLD_LAZY);
    #endif

    if (!handler)
      napi_throw_type_error(env, "2", "Não foi possível carregar a DLL.");
    else
      return Boolean::New(env, true);
  }

  return env.Null();
}

int configuraIntSiTefInterativo(const char *ip, const char *terminal, const char *loja, const char *reservado)
{
  if (!handler)

    throw("Carregue a DLL do SiTef!");

  #ifdef _WIN32
  ConfiguraIntSiTefInterativo configuraSitef = (ConfiguraIntSiTefInterativo)GetProcAddress(handler, "ConfiguraIntSiTefInterativo");
  #endif

  #ifdef linux
  ConfiguraIntSiTefInterativo configuraSitef = (ConfiguraIntSiTefInterativo)dlsym(handler, "ConfiguraIntSiTefInterativo");
  #endif

  return configuraSitef(
      ip,
      terminal,
      loja,
      reservado);
}

int verificaPresencaPinPad()
{
  if (!handler)
    throw("Carregue a DLL do SiTef!");

  #ifdef _WIN32
  VerificaPresencaPinPad verificaPresenca = (VerificaPresencaPinPad)GetProcAddress(handler, "VerificaPresencaPinPad");
  #endif

  #ifdef linux
  VerificaPresencaPinPad verificaPresenca = (VerificaPresencaPinPad)dlsym(handler, "VerificaPresencaPinPad");
  #endif

  return verificaPresenca();
}

int escreveMensagemPermanentePinPad(const char *mensagem)
{
  if (!handler)
    throw("Carregue a DLL do SiTef!");

  #ifdef _WIN32
  EscreveMensagemPermanentePinPad escreveMensagem = (EscreveMensagemPermanentePinPad)GetProcAddress(handler, "EscreveMensagemPermanentePinPad");
  #endif

  #ifdef linux
  EscreveMensagemPermanentePinPad escreveMensagem = (EscreveMensagemPermanentePinPad)dlsym(handler, "EscreveMensagemPermanentePinPad");
  #endif

  return escreveMensagem(mensagem);
}

int leSimNaoPinPad(const char *mensagem)
{
  if (!handler)
    throw("Carregue a DLL do SiTef!");

  #ifdef _WIN32
  LeSimNaoPinPad escreveMensagem = (LeSimNaoPinPad)GetProcAddress(handler, "LeSimNaoPinPad");
  #endif

  #ifdef linux
  LeSimNaoPinPad escreveMensagem = (LeSimNaoPinPad)dlsym(handler, "LeSimNaoPinPad");
  #endif

  return escreveMensagem(mensagem);
}

int iniciaFuncaoSiTefInterativo(int funcao, const char *valor, const char *cupomFiscal, const char *dataFiscal, const char *horaFiscal, const char *operador, const char *paramAdicionais)
{
  if (!handler)
    throw("Carregue a DLL do SiTef!");

  #ifdef _WIN32
  IniciaFuncaoSiTefInterativo iniciaFuncao = (IniciaFuncaoSiTefInterativo)GetProcAddress(handler, "IniciaFuncaoSiTefInterativo");
  #endif

  #ifdef linux
  IniciaFuncaoSiTefInterativo iniciaFuncao = (IniciaFuncaoSiTefInterativo)dlsym(handler, "IniciaFuncaoSiTefInterativo");
  #endif

  return iniciaFuncao(
      funcao,
      valor,
      cupomFiscal,
      dataFiscal,
      horaFiscal,
      operador,
      paramAdicionais);
}

int continuaFuncaoSiTefInterativo(int *comando, long *tipoCampo, int *tamMinimo, int *tamMaximo, char *buffer, int tamBuffer, int continua)
{
  if (!handler)
    throw("Carregue a DLL do SiTef!");

  #ifdef _WIN32
  ContinuaFuncaoSiTefInterativo continuaFuncao = (ContinuaFuncaoSiTefInterativo)GetProcAddress(handler, "ContinuaFuncaoSiTefInterativo");
  #endif

  #ifdef linux
  ContinuaFuncaoSiTefInterativo continuaFuncao = (ContinuaFuncaoSiTefInterativo)dlsym(handler, "ContinuaFuncaoSiTefInterativo");
  #endif

  return continuaFuncao(
      comando,
      tipoCampo,
      tamMinimo,
      tamMaximo,
      buffer,
      tamBuffer,
      continua);
}

void finalizaFuncaoSiTefInterativo(int confirma, const char *cupomFiscal, const char *dataFiscal, const char *horaFiscal, const char *paramAdicionais)
{
  if (!handler)

    throw("Carregue a DLL do SiTef!");

  #ifdef _WIN32
  FinalizaFuncaoSiTefInterativo finalizaFuncao = (FinalizaFuncaoSiTefInterativo)GetProcAddress(handler, "FinalizaFuncaoSiTefInterativo");
  #endif

  #ifdef linux
  FinalizaFuncaoSiTefInterativo finalizaFuncao = (FinalizaFuncaoSiTefInterativo)dlsym(handler, "FinalizaFuncaoSiTefInterativo");
  #endif

  finalizaFuncao(confirma, cupomFiscal, dataFiscal, horaFiscal, paramAdicionais);
}

Object Init(Env env, Object exports)
{
  exports.Set(
      String::New(env, "carregarDLL"),
      Function::New(env, carregarDLL));

  exports.Set(
      String::New(env, "configuraIntSiTefInterativo"),
      Function::New(env, ConfigPromise::Create));

  exports.Set(
      String::New(env, "verificaPresencaPinPad"),
      Function::New(env, VerificarPresencaPromise::Create));

  exports.Set(
      String::New(env, "leSimNaoPinPad"),
      Function::New(env, LeSimNaoPromise::Create));

  exports.Set(
      String::New(env, "escreveMensagemPermanentePinPad"),
      Function::New(env, EscreverMensagemPromise::Create));

  exports.Set(
      String::New(env, "iniciaFuncaoSiTefInterativo"),
      Function::New(env, IniciaFuncaoPromise::Create));

  exports.Set(
      String::New(env, "continuaFuncaoSiTefInterativo"),
      Function::New(env, ContinuaFuncaoPromise::Create));

  exports.Set(
      String::New(env, "finalizaFuncaoSiTefInterativo"),
      Function::New(env, FinalizaFuncaoPromise::Create));

  return exports;
}

NODE_API_MODULE(nodesitef, Init);
