#include <napi.h>
#include "../nodesitef.hpp"

using std::string;

class FinalizaFuncaoPromise : public PromiseWorker<bool>
{
public:
  static Value Create(const CallbackInfo &info)
  {
    if (info.Length() < 5)
      return Reject(info.Env(), "MissingArgument");
    else if (!info[0].IsNumber() || !info[1].IsString() || !info[2].IsString() || !info[3].IsString() || !info[4].IsString())
      return Reject(info.Env(), "InvalidArgument");

    int confirma = info[0].As<Number>().Int32Value();
    string cupomFiscal = info[1].As<String>().Utf8Value();
    string dataFiscal = info[2].As<String>().Utf8Value();
    string horaFiscal = info[3].As<String>().Utf8Value();
    string paramAdicionais = info[4].As<String>().Utf8Value();

    FinalizaFuncaoPromise *worker = new FinalizaFuncaoPromise(info.Env(), confirma, cupomFiscal, dataFiscal, horaFiscal, paramAdicionais);
    worker->Queue();
    return worker->deferredPromise.Promise();
  }

protected:
  void Execute() override
  {
    finalizaFuncaoSiTefInterativo(confirma, cupomFiscal.c_str(), dataFiscal.c_str(), horaFiscal.c_str(), paramAdicionais.c_str());
    result = true;
  }

  virtual void OnOK() override
  {
    deferredPromise.Resolve(Boolean::New(Env(), result));
  }

private:
  FinalizaFuncaoPromise(napi_env env,
                        int &p_confirma,
                        string &p_cupomFiscal,
                        string &p_dataFiscal,
                        string &p_horaFiscal,
                        string &p_paramAdicionais) : PromiseWorker(env),
                                                     confirma(p_confirma),
                                                     cupomFiscal(p_cupomFiscal),
                                                     dataFiscal(p_dataFiscal),
                                                     horaFiscal(p_horaFiscal),
                                                     paramAdicionais(p_paramAdicionais) {}

  int confirma;
  string cupomFiscal;
  string dataFiscal;
  string horaFiscal;
  string paramAdicionais;
};
