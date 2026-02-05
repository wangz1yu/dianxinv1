import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Car, Clock, Shield, Wallet, Users, MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const features = [
  { icon: Clock, title: '灵活结算周期', desc: '支持日结、周结、月结多种模式，满足不同司机需求' },
  { icon: Shield, title: '全面保险保障', desc: '覆盖司机和乘客的意外险，按天计费，次日生效' },
  { icon: Wallet, title: '智能分账系统', desc: '自动计算平台抽成和司机收入，账目清晰透明' },
  { icon: MapPin, title: '全国覆盖服务', desc: '支持全国300+城市的司机结算服务，统一标准' },
];

export default function Ride() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm mb-6">
              <Car className="w-4 h-4" />
              网约车解决方案
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">网约车行业灵活用工解决方案</h1>
            <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
              为网约车平台提供司机结算、保险保障、合规管理等一站式服务，助力平台合规运营，提升司机满意度。
            </p>
            <Button className="bg-white text-indigo-600 hover:bg-gray-100 rounded-full px-8">
              立即咨询
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">核心服务能力</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">专为网约车行业定制，满足司机管理和结算的全方位需求</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">合规运营保障</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                网约车行业面临严格的合规要求，点薪云提供完整的合规解决方案，帮助平台规避用工风险，确保合法合规运营。
              </p>
              
              <div className="space-y-4">
                {['司机身份实名认证，对接公安系统', '电子合同签署，具有法律效力', '税务合规处理，降低税务风险', '社保代缴服务，保障司机权益'].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                  <Users className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">50万+</div>
                  <div className="text-gray-600 text-sm">服务司机</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                  <MapPin className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">300+</div>
                  <div className="text-gray-600 text-sm">覆盖城市</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                  <Shield className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
                  <div className="text-gray-600 text-sm">合规认证</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                  <Wallet className="w-10 h-10 text-indigo-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">25%</div>
                  <div className="text-gray-600 text-sm">成本降低</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">让网约车运营更简单</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">联系我们的专业团队，获取定制化的网约车行业解决方案</p>
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8">立即咨询</Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
