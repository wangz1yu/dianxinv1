import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, 
  User, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Fingerprint,
  Lock,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const steps = [
  { id: 1, title: '身份认证', icon: User, desc: '实名认证确保身份真实' },
  { id: 2, title: '合同预览', icon: FileText, desc: '在线查看合同条款' },
  { id: 3, title: '电子签名', icon: Fingerprint, desc: '生物识别技术签名' },
  { id: 4, title: '区块链存证', icon: Lock, desc: '合同上链永久保存' },
];

export default function DemoContract() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const startDemo = () => {
    setIsAnimating(true);
    setCurrentStep(0);
    setIsComplete(false);

    // 自动演示流程
    steps.forEach((_, index) => {
      setTimeout(() => {
        setCurrentStep(index);
      }, index * 1500);
    });

    setTimeout(() => {
      setIsComplete(true);
      setIsAnimating(false);
    }, steps.length * 1500);
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setIsComplete(false);
    setIsAnimating(false);
  };

  return (
    <section className="py-24 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Demo Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-2 lg:order-1"
          >
            <div className="bg-white rounded-3xl shadow-xl p-8">
              {/* Step Indicators */}
              <div className="flex justify-between mb-8">
                {steps.map((step, index) => {
                  const isActive = index === currentStep;
                  const isPast = index < currentStep;
                  
                  return (
                    <div key={step.id} className="flex flex-col items-center">
                      <motion.div
                        animate={{
                          scale: isActive ? 1.1 : 1,
                          backgroundColor: isActive ? '#0066CC' : isPast ? '#10B981' : '#E5E7EB',
                        }}
                        className="w-10 h-10 rounded-full flex items-center justify-center mb-2"
                      >
                        {isPast ? (
                          <CheckCircle className="w-5 h-5 text-white" />
                        ) : (
                          <span className="text-white font-medium text-sm">{step.id}</span>
                        )}
                      </motion.div>
                      <span className={`text-xs ${isActive ? 'text-blue-600 font-medium' : 'text-gray-400'}`}>
                        {step.title}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Demo Content */}
              <AnimatePresence mode="wait">
                {!isComplete ? (
                  <motion.div
                    key="demo"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="bg-gray-50 rounded-2xl p-6 mb-6 min-h-[200px]">
                      {currentStep === 0 && (
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <User className="w-8 h-8 text-blue-600" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">身份认证中...</h4>
                          <p className="text-gray-500">正在验证用户身份信息</p>
                          <div className="mt-4 flex justify-center">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <RefreshCw className="w-6 h-6 text-blue-600" />
                            </motion.div>
                          </div>
                        </div>
                      )}
                      {currentStep === 1 && (
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <FileText className="w-5 h-5 text-blue-600" />
                            <span className="font-medium text-gray-900">灵活用工服务协议</span>
                          </div>
                          <div className="space-y-2 text-sm text-gray-600">
                            <p>1. 服务内容与范围</p>
                            <p>2. 结算方式与周期</p>
                            <p>3. 双方权利与义务</p>
                            <p>4. 保密条款</p>
                            <p>5. 争议解决</p>
                          </div>
                          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                            <p className="text-sm text-blue-600">✓ 合同条款已阅读并同意</p>
                          </div>
                        </div>
                      )}
                      {currentStep === 2 && (
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Fingerprint className="w-8 h-8 text-blue-600" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">电子签名中...</h4>
                          <p className="text-gray-500">使用生物识别技术进行签名验证</p>
                          <div className="mt-4">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                              <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '100%' }}
                                transition={{ duration: 1 }}
                                className="h-full bg-blue-600"
                              />
                            </div>
                          </div>
                        </div>
                      )}
                      {currentStep === 3 && (
                        <div className="text-center">
                          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Lock className="w-8 h-8 text-blue-600" />
                          </div>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">区块链存证中...</h4>
                          <p className="text-gray-500">合同哈希值正在写入区块链</p>
                          <div className="mt-4 font-mono text-xs text-gray-400 bg-gray-100 p-2 rounded">
                            0x7f8a9b...3e4d5c6b
                          </div>
                        </div>
                      )}
                    </div>

                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6"
                      onClick={startDemo}
                      disabled={isAnimating}
                    >
                      {isAnimating ? (
                        <span className="flex items-center gap-2">
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <RefreshCw className="w-5 h-5" />
                          </motion.div>
                          演示中...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          开始演示
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      )}
                    </Button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Shield className="w-10 h-10 text-green-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">合同签署完成！</h4>
                    <p className="text-gray-500 mb-2">合同已上链存证，具有法律效力</p>
                    <p className="text-sm text-gray-400 mb-6">存证哈希: 0x7f8a9b2c3d4e5f6a7b8c9d0e1f2a3b4c</p>
                    <Button 
                      variant="outline"
                      onClick={resetDemo}
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      重新演示
                    </Button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6">
              <FileText className="w-4 h-4" />
              互动演示
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              电子合同签约
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              全流程线上化签约，采用区块链存证技术，确保合同具有法律效力。
              从身份认证到电子签名，再到区块链存证，一站式完成。
            </p>
            
            <div className="space-y-4">
              {[
                { icon: Shield, text: '区块链存证，永久可追溯' },
                { icon: Fingerprint, text: '生物识别签名，安全可靠' },
                { icon: Lock, text: '符合电子签名法，具有法律效力' },
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700">{item.text}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
