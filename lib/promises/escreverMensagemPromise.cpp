#include <napi.h>
#include "../nodesitef.hpp"

using std::string;

class EscreverMensagemPromise : public PromiseWorker<int>
{
public:
  static Value Create(const CallbackInfo &info)
  {
    if (info.Length() < 1)
      return Reject(info.Env(), "MissingArgument");
    else if (!info[0].IsString())
      return Reject(info.Env(), "InvalidArgument");

    string mensagem = info[0].As<Napi::String>().Utf8Value();
    EscreverMensagemPromise *worker = new EscreverMensagemPromise(info.Env(), mensagem);
    worker->Queue();
    return worker->deferredPromise.Promise();
  }

protected:
  void Execute() override
  {
    result = escreveMensagemPermanentePinPad(mensagem.c_str());
  }

  virtual void OnOK() override
  {
    deferredPromise.Resolve(Number::New(Env(), result));
  }

private:
  EscreverMensagemPromise(napi_env env, string &p_mensagem) : PromiseWorker(env), mensagem(p_mensagem) {}

  string mensagem;
};
