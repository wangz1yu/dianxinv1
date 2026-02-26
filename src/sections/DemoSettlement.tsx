import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wallet, 
  ArrowRight, 
  CheckCircle, 
  Clock, 
  User,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Employee {
  id: number;
  name: string;
  phone: string;
  amount: number;
  status: 'pending' | 'processing' | 'completed';
}

const mockEmployees: Employee[] = [
  { id: 1, name: '张三', phone: '138****1234', amount: 3500, status: 'pending' },
  { id: 2, name: '李四', phone: '139****5678', amount: 4200, status: 'pending' },
  { id: 3, name: '王五', phone: '137****9012', amount: 3800, status: 'pending' },
  { id: 4, name: '赵六', phone: '136****3456', amount: 4500, status: 'pending' },
];

export default function DemoSettlement() {
  const [employees, setEmployees] = useState<Employee[]>(mockEmployees);
  const [isProcessing, setIsProcessing] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  const totalAmount = employees.reduce((sum, emp) => sum + emp.amount, 0);

  const startSettlement = () => {
    setIsProcessing(true);
    setCompletedCount(0);
    
    // 逐个处理
    employees.forEach((emp, index) => {
      setTimeout(() => {
        setEmployees(prev => 
          prev.map(e => 
            e.id === emp.id ? { ...e, status: 'processing' } : e
          )
        );
        
        setTimeout(() => {
          setEmployees(prev => 
            prev.map(e => 
              e.id === emp.id ? { ...e, status: 'completed' } : e
            )
          );
          setCompletedCount(prev => prev + 1);
        }, 800);
      }, index * 1200);
    });

    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccess(true);
    }, employees.length * 1200 + 1000);
  };

  const resetDemo = () => {
    setEmployees(mockEmployees);
    setCompletedCount(0);
    setShowSuccess(false);
    setIsProcessing(false);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-medium mb-6">
              <Wallet className="w-4 h-4" />
              互动演示
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              灵工结算系统
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              T+0极速发薪，支持批量结算，资金实时到账。体验一键完成数百人发薪的便捷操作，
              大幅降低企业财务人力成本。
            </p>
            
            <div className="space-y-4">
              {[
                { icon: Clock, text: 'T+0极速到账，资金秒级流转' },
                { icon: CheckCircle, text: '合规税务处理，降低用工风险' },
                { icon: User, text: '支持批量导入，一键完成发薪' },
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

          {/* Right Demo Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-100 text-sm">待结算总额</p>
                    <p className="text-3xl font-bold text-white">¥{totalAmount.toLocaleString()}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-blue-100 text-sm">结算人数</p>
                    <p className="text-3xl font-bold text-white">{employees.length}人</p>
                  </div>
                </div>
              </div>

              {/* Employee List */}
              <div className="p-6 space-y-3">
                <AnimatePresence>
                  {employees.map((employee) => (
                    <motion.div
                      key={employee.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`flex items-center justify-between p-4 rounded-xl transition-all ${
                        employee.status === 'completed' 
                          ? 'bg-green-500/20 border border-green-500/30' 
                          : employee.status === 'processing'
                          ? 'bg-blue-500/20 border border-blue-500/30'
                          : 'bg-white/5 border border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          employee.status === 'completed' 
                            ? 'bg-green-500' 
                            : employee.status === 'processing'
                            ? 'bg-blue-500'
                            : 'bg-gray-600'
                        }`}>
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-white font-medium">{employee.name}</p>
                          <p className="text-gray-400 text-sm">{employee.phone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-white font-medium">¥{employee.amount.toLocaleString()}</span>
                        {employee.status === 'completed' && (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        )}
                        {employee.status === 'processing' && (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          >
                            <RefreshCw className="w-5 h-5 text-blue-400" />
                          </motion.div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              {/* Action Button */}
              <div className="p-6 pt-0">
                <AnimatePresence mode="wait">
                  {!showSuccess ? (
                    <motion.div
                      key="action"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Button 
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6 text-lg font-medium"
                        onClick={startSettlement}
                        disabled={isProcessing}
                      >
                        {isProcessing ? (
                          <span className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                            >
                              <RefreshCw className="w-5 h-5" />
                            </motion.div>
                            结算中... {completedCount}/{employees.length}
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            一键结算
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
                      className="text-center"
                    >
                      <div className="flex items-center justify-center gap-2 text-green-400 mb-4">
                        <CheckCircle className="w-6 h-6" />
                        <span className="text-lg font-medium">结算完成！</span>
                      </div>
                      <Button 
                        variant="outline" 
                        className="border-white/20 text-black hover:bg-white/10"
                        onClick={resetDemo}
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        重新演示
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
