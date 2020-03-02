#include <napi.h>
#include "../nodesitef.hpp"

class VerificarPresencaPromise : public PromiseWorker<int>
{
public:
  static Value Create(const CallbackInfo &info)
  {
    VerificarPresencaPromise *worker = new VerificarPresencaPromise(info.Env());
    worker->Queue();
    return worker->deferredPromise.Promise();
  }

protected:
  void Execute() override
  {
    result = verificaPresencaPinPad();
  }

  virtual void OnOK() override
  {
    deferredPromise.Resolve(Number::New(Env(), result));
  }

private:
  VerificarPresencaPromise(napi_env env) : PromiseWorker(env) {}
};
