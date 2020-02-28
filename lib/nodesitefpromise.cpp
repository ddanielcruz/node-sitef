#include <napi.h>
#include <sstream>

#include "nodesitef.hpp"

class AsyncWorker : public Napi::AsyncWorker {
    public:  
        static Napi::Value Create(const Napi::CallbackInfo& info) {    
            if (info.Length() != 4) {      
                return Reject(info.Env(), "MissingArgument");    
            } else if (!info[0].IsString() || !info[1].IsString() || !info[2].IsString() || !info[3].IsString()) {      
                return Reject(info.Env(), "InvalidArgument");    
            }    
            
            std::string ip = info[0].As<Napi::String>().Utf8Value();
            std::string loja = info[1].As<Napi::String>().Utf8Value();
            std::string terminal = info[2].As<Napi::String>().Utf8Value();
            std::string reservado = info[3].As<Napi::String>().Utf8Value();
            AsyncWorker* worker = new AsyncWorker(info.Env(), ip, loja, terminal, reservado);    
            worker->Queue();    
            return worker->deferredPromise.Promise();  
        }
    
    protected:  
        static Napi::Value Reject(Napi::Env env, const char* msg) {    
            Napi::Promise::Deferred failed = Napi::Promise::Deferred::New(env);    
            failed.Reject(Napi::Error::New(env, msg).Value());    
            return failed.Promise();  
        }  

        void Execute() override {    
            if(ip.size() < 1) {      
                SetError("EmptyName");      
                return;    
            }     

            //std::cout << "Configurando" << std::endl;
            result = c_configuraIntSiTefInterativo(ip.c_str(), loja.c_str(), terminal.c_str(), reservado.c_str());  
            //std::cout << "Feito ..." << std::endl;
        }  
        
        virtual void OnOK() override {     
            deferredPromise.Resolve(Number::New(Env(), result));  
        }
        
        virtual void OnError(const Napi::Error& e) override {      
            deferredPromise.Reject(e.Value());  
        }
    
    private:  
        AsyncWorker(napi_env env, std::string& p_ip, std::string& p_loja, std::string& p_terminal, std::string& p_reservado) :    
            Napi::AsyncWorker(env),    
            ip(p_ip),
            loja(p_loja),
            terminal(p_terminal),
            reservado(p_reservado),
            result(),    
            deferredPromise(Napi::Promise::Deferred::New(env)) { }  
            
        std::string ip;
        std::string loja;
        std::string terminal;
        std::string reservado;
        int result;  
        
        Napi::Promise::Deferred deferredPromise;
};

