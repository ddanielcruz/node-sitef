#include <napi.h>
#include <sstream>
#include "../nodesitef.hpp"

template <class T>
class PromiseWorker : public Napi::AsyncWorker
{
protected:
  virtual void OnError(const Napi::Error &e) override
  {
    deferredPromise.Reject(e.Value());
  }

  static Napi::Value Reject(Napi::Env env, const char *msg)
  {
    Napi::Promise::Deferred failed = Napi::Promise::Deferred::New(env);
    failed.Reject(Napi::Error::New(env, msg).Value());
    return failed.Promise();
  }

  PromiseWorker(napi_env env) : Napi::AsyncWorker(env), deferredPromise(Napi::Promise::Deferred::New(env)), result() {}

  Napi::Promise::Deferred deferredPromise;
  T result;
};