#include <napi.h>
#include "../nodesitef.hpp"

using std::string;

class ContinuaFuncaoPromise : public PromiseWorker<int>
{
public:
  static Value Create(const CallbackInfo &info)
  {
    if (info.Length() < 7)
      return Reject(info.Env(), "MissingArgument");
    else if (!info[0].IsNumber() ||
             !info[1].IsNumber() ||
             !info[2].IsNumber() ||
             !info[3].IsNumber() ||
             !info[4].IsString() ||
             !info[5].IsNumber() ||
             !info[6].IsNumber())
      return Reject(info.Env(), "InvalidArgument");

    int comando = info[0].ToNumber().Int32Value();
    long tipoCampo = static_cast<long>(info[1].ToNumber().Int64Value());
    int tamMinimo = info[2].ToNumber().Int32Value();
    int tamMaximo = info[3].ToNumber().Int32Value();
    int tamBuffer = info[5].ToNumber().Int32Value();
    int continua = info[6].ToNumber().Int32Value();

    char buffer[20000];
    strcpy(buffer, info[4].ToString().Utf8Value().c_str());

    ContinuaFuncaoPromise *worker = new ContinuaFuncaoPromise(info.Env(),
                                                              comando,
                                                              tipoCampo,
                                                              tamMinimo,
                                                              tamMaximo,
                                                              buffer,
                                                              tamBuffer,
                                                              continua);
    worker->Queue();
    return worker->deferredPromise.Promise();
  }

protected:
  void Execute() override
  {
    result = continuaFuncaoSiTefInterativo(
        &comando,
        &tipoCampo,
        &tamMinimo,
        &tamMaximo,
        buffer,
        tamBuffer,
        continua);
  }

  virtual void OnOK() override
  {
    Object obj = Object::New(Env());
    obj.Set("retorno", result);
    obj.Set("comando", comando);
    obj.Set("tipoCampo", tipoCampo);
    obj.Set("tamMinimo", tamMinimo);
    obj.Set("tamMaximo", tamMaximo);
    obj.Set("buffer", buffer);

    deferredPromise.Resolve(obj);
  }

private:
  ContinuaFuncaoPromise(napi_env env,
                        int p_comando,
                        long p_tipoCampo,
                        int p_tamMinimo,
                        int p_tamMaximo,
                        char *p_buffer,
                        int p_tamBuffer,
                        int p_continua) : PromiseWorker(env),
                                          comando(p_comando),
                                          tipoCampo(p_tipoCampo),
                                          tamMinimo(p_tamMinimo),
                                          tamMaximo(p_tamMaximo),
                                          buffer(p_buffer),
                                          tamBuffer(p_tamBuffer),
                                          continua(p_continua)
  {
  }

  int comando;
  long tipoCampo;
  int tamMinimo;
  int tamMaximo;
  char *buffer;
  int tamBuffer;
  int continua;
};

