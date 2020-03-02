#include <napi.h>
#include "../nodesitef.hpp"

using std::string;

class LeSimNaoPromise : public PromiseWorker<int>
{
public:
  static Value Create(const CallbackInfo &info)
  {
    if (info.Length() < 1)
      return Reject(info.Env(), "MissingArgument");
    else if (!info[0].IsString())
      return Reject(info.Env(), "InvalidArgument");

    string mensagem = info[0].As<Napi::String>().Utf8Value();
    LeSimNaoPromise *worker = new LeSimNaoPromise(info.Env(), mensagem);
    worker->Queue();
    return worker->deferredPromise.Promise();
  }

protected:
  void Execute() override
  {
    result = leSimNaoPinPad(mensagem.c_str());
  }

  virtual void OnOK() override
  {
    deferredPromise.Resolve(Number::New(Env(), result));
  }

private:
  LeSimNaoPromise(napi_env env, string &p_mensagem) : PromiseWorker(env), mensagem(p_mensagem) {}

  string mensagem;
};
