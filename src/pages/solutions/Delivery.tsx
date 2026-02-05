import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bike, Clock, Shield, Wallet, Users, TrendingUp, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const features = [
  { icon: Clock, title: 'T+0极速结算', desc: '骑手完成订单后，佣金实时到账，提升骑手满意度和留存率' },
  { icon: Shield, title: '日结保险保障', desc: '按天计费的意外险，次日生效，全面保障骑手配送安全' },
  { icon: Wallet, title: '批量发薪管理', desc: '支持数万骑手的批量结算，一键完成，大幅降低财务成本' },
  { icon: Users, title: '骑手招聘服务', desc: '覆盖全国的骑手人才库，快速补充运力，解决高峰期用工难题' },
];

const stats = [
  { value: '100万+', label: '服务骑手' },
  { value: '50+', label: '合作城市' },
  { value: '99.9%', label: '结算成功率' },
  { value: '30%', label: '成本降低' },
];

export default function Delivery() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm mb-6">
                <Bike className="w-4 h-4" />
                外卖配送解决方案
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                外卖配送行业<br />灵活用工解决方案
              </h1>
              <p className="text-blue-100 text-lg mb-8 leading-relaxed">
                为外卖平台提供从骑手招聘、智能结算到保险保障的一站式服务，助力平台降本增效，提升骑手满意度。
              </p>
              <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8">
                立即咨询
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, index) => (
                    <div key={index} className="bg-white/10 rounded-2xl p-6 text-center">
                      <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                      <div className="text-blue-200 text-sm">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">核心服务能力</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">覆盖外卖配送全场景，提供完整的灵活用工解决方案</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">某头部外卖平台案例</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                该外卖平台在全国拥有超过100万骑手，通过点薪云的灵活用工解决方案，实现了骑手的统一结算管理，结算效率提升80%，财务成本降低30%。
              </p>
              
              <div className="space-y-4">
                {['T+0极速到账，骑手满意度提升40%', '日结保险覆盖全部骑手，降低平台风险', '智能风控系统，异常订单识别率达99%', '批量发薪功能，节省财务人力成本'].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8">
              <div className="text-center mb-8">
                <TrendingUp className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">业务成果</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center"><div className="text-4xl font-bold text-blue-600 mb-1">80%</div><div className="text-gray-600">结算效率提升</div></div>
                <div className="text-center"><div className="text-4xl font-bold text-blue-600 mb-1">30%</div><div className="text-gray-600">成本降低</div></div>
                <div className="text-center"><div className="text-4xl font-bold text-blue-600 mb-1">40%</div><div className="text-gray-600">满意度提升</div></div>
                <div className="text-center"><div className="text-4xl font-bold text-blue-600 mb-1">99%</div><div className="text-gray-600">风控准确率</div></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">开启您的灵活用工之旅</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">立即联系我们的专业顾问，获取定制化的外卖配送行业解决方案</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">立即咨询</Button>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 rounded-full px-8">了解更多</Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
