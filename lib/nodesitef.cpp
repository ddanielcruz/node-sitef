#include "nodesitef.hpp"
#include "nodesitefpromise.cpp"


void *handler;


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
    handler = dlopen(path.c_str(), RTLD_LAZY);

    if (!handler)
      napi_throw_type_error(env, "2", "Não foi possível carregar a DLL.");
    else
      return Boolean::New(env, true);
  }

  return env.Null();
}


int c_configuraIntSiTefInterativo(const char *ip, const char *terminal, const char *loja, const char *reservado)
{
  if (!handler)
  {
    throw("Carregue a DLL do SiTef!");
  }

  ConfiguraIntSiTefInterativo configuraSitef = (ConfiguraIntSiTefInterativo)dlsym(handler, "ConfiguraIntSiTefInterativo");

  return configuraSitef(
      ip,
      terminal,
      loja,
      reservado);
}


Value configuraIntSiTefInterativo(const CallbackInfo &info)
{
  Env env = info.Env();

  int retorno;
  try {
     retorno = c_configuraIntSiTefInterativo(
      info[0].ToString().Utf8Value().c_str(),
      info[1].ToString().Utf8Value().c_str(),
      info[2].ToString().Utf8Value().c_str(),
      info[3].ToString().Utf8Value().c_str());
  } catch(const std::exception& e) {
    napi_throw_error(env, "-1", e.what());
    return env.Null();
  }

  return Number::New(env, retorno);
}

Value verificaPresencaPinPad(const CallbackInfo &info)
{
  Env env = info.Env();

  if (!handler)
  {
    napi_throw_error(env, "-1", "Carregue a DLL do SiTef!");
    return env.Null();
  }

  VerificaPresencaPinPad verificaPresenca = (VerificaPresencaPinPad)dlsym(handler, "VerificaPresencaPinPad");

  return Number::New(env, verificaPresenca());
}

Value iniciaFuncaoSiTefInterativo(const CallbackInfo &info)
{
  Env env = info.Env();

  if (!handler)
  {
    napi_throw_error(env, "-1", "Carregue a DLL do SiTef!");
    return env.Null();
  }

  IniciaFuncaoSiTefInterativo iniciaFuncao = (IniciaFuncaoSiTefInterativo)dlsym(handler, "IniciaFuncaoSiTefInterativo");

  int retorno = iniciaFuncao(
      info[0].ToNumber().Int32Value(),
      info[1].ToString().Utf8Value().c_str(),
      info[2].ToString().Utf8Value().c_str(),
      info[3].ToString().Utf8Value().c_str(),
      info[4].ToString().Utf8Value().c_str(),
      info[5].ToString().Utf8Value().c_str(),
      info[6].ToString().Utf8Value().c_str());

  return Number::New(env, retorno);
}

Value continuaFuncaoSiTefInterativo(const CallbackInfo &info)
{
  Env env = info.Env();

  if (!handler)
  {
    napi_throw_error(env, "-1", "Carregue a DLL do SiTef!");
    return env.Null();
  }

  ContinuaFuncaoSiTefInterativo continuaFuncao = (ContinuaFuncaoSiTefInterativo)dlsym(handler, "ContinuaFuncaoSiTefInterativo");

  int comando = info[0].ToNumber().Int32Value();
  long tipoCampo = static_cast<long>(info[1].ToNumber().Int64Value());
  int tamMinimo = info[2].ToNumber().Int32Value();
  int tamMaximo = info[3].ToNumber().Int32Value();
  int tamBuffer = info[5].ToNumber().Int32Value();
  int continua = info[6].ToNumber().Int32Value();

  char buffer[20000];
  strcpy(buffer, info[4].ToString().Utf8Value().c_str());

  int retorno = continuaFuncao(
      &comando,
      &tipoCampo,
      &tamMinimo,
      &tamMaximo,
      buffer,
      tamBuffer,
      continua);

  Object obj = Object::New(env);
  obj.Set("retorno", retorno);
  obj.Set("comando", comando);
  obj.Set("tipoCampo", tipoCampo);
  obj.Set("tamMinimo", tamMinimo);
  obj.Set("tamMaximo", tamMaximo);
  obj.Set("buffer", buffer);

  return obj;
}

Value finalizaFuncaoSiTefInterativo(const CallbackInfo &info)
{
  Env env = info.Env();

  if (!handler)
  {
    napi_throw_error(env, "-1", "Carregue a DLL do SiTef!");
    return env.Null();
  }

  FinalizaFuncaoSiTefInterativo finalizaFuncao = (FinalizaFuncaoSiTefInterativo)dlsym(handler, "FinalizaFuncaoSiTefInterativo");

  finalizaFuncao(
      static_cast<short>(info[0].ToNumber().Int32Value()),
      info[1].ToString().Utf8Value().c_str(),
      info[2].ToString().Utf8Value().c_str(),
      info[3].ToString().Utf8Value().c_str(),
      info[4].ToString().Utf8Value().c_str());

  return Boolean::New(env, true);
}

Value escreveMensagemPermanentePinPad(const CallbackInfo &info)
{
  Env env = info.Env();

  if (!handler)
  {
    napi_throw_error(env, "-1", "Carregue a DLL do SiTef!");
    return env.Null();
  }

  EscreveMensagemPermanentePinPad escreveMensagem = (EscreveMensagemPermanentePinPad)dlsym(handler, "EscreveMensagemPermanentePinPad");

  int retorno = escreveMensagem(info[0].ToString().Utf8Value().c_str());

  return Number::New(env, retorno);
}

Value leSimNaoPinPad(const CallbackInfo &info)
{
  Env env = info.Env();

  if (!handler)
  {
    napi_throw_error(env, "-1", "Carregue a DLL do SiTef!");
    return env.Null();
  }

  LeSimNaoPinPad escreveMensagem = (LeSimNaoPinPad)dlsym(handler, "LeSimNaoPinPad");

  int retorno = escreveMensagem(info[0].ToString().Utf8Value().c_str());

  return Number::New(env, retorno);
}


Object Init(Env env, Object exports)
{

  exports.Set(
      String::New(env, "teste"),
      Function::New(env, AsyncWorker::Create));

  exports.Set(
      String::New(env, "carregarDLL"),
      Function::New(env, carregarDLL));

  exports.Set(
      String::New(env, "configuraIntSiTefInterativo"),
      Function::New(env, configuraIntSiTefInterativo));

  exports.Set(
      String::New(env, "verificaPresencaPinPad"),
      Function::New(env, verificaPresencaPinPad));

  exports.Set(
      String::New(env, "iniciaFuncaoSiTefInterativo"),
      Function::New(env, iniciaFuncaoSiTefInterativo));

  exports.Set(
      String::New(env, "continuaFuncaoSiTefInterativo"),
      Function::New(env, continuaFuncaoSiTefInterativo));

  exports.Set(
      String::New(env, "finalizaFuncaoSiTefInterativo"),
      Function::New(env, finalizaFuncaoSiTefInterativo));

  exports.Set(
      String::New(env, "escreveMensagemPermanentePinPad"),
      Function::New(env, escreveMensagemPermanentePinPad));

  exports.Set(
      String::New(env, "leSimNaoPinPad"),
      Function::New(env, leSimNaoPinPad));

  return exports;
}

NODE_API_MODULE(nodesitef, Init);