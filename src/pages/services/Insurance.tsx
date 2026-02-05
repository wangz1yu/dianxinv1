import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, Clock, CheckCircle, Heart, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const features = [
  { icon: Clock, title: '按天计费', desc: '按实际工作天数计费，灵活透明' },
  { icon: CheckCircle, title: '次日生效', desc: '投保次日自动生效，无需等待' },
  { icon: Heart, title: '全面保障', desc: '工伤、意外、医疗全覆盖' },
  { icon: TrendingUp, title: '快速理赔', desc: '在线理赔，快速到账' },
];

export default function Insurance() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-cyan-600 to-cyan-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm mb-6">
              <Shield className="w-4 h-4" />
              日结保险
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">灵活用工保险保障</h1>
            <p className="text-cyan-100 text-lg mb-8 leading-relaxed">
              专为灵活用工场景设计的保险产品，按实际工作天数计费，次日自动生效，全面保障用工安全。
            </p>
            <Link to="/about/contact">
              <Button className="bg-white text-cyan-600 hover:bg-gray-100 rounded-full px-8">
                立即咨询
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">保险特色</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">专为灵活用工场景设计，让保障更简单</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow text-center">
                <div className="w-16 h-16 bg-cyan-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-cyan-600" />
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">保障范围</h2>
              <div className="space-y-4">
                {[
                  { title: '意外伤害', desc: '工作期间意外身故/伤残，最高赔付50万' },
                  { title: '医疗费用', desc: '意外医疗费用报销，最高2万元' },
                  { title: '住院津贴', desc: '住院期间每日津贴100元' },
                  { title: '误工补偿', desc: '因伤误工期间的收入补偿' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 bg-gray-50 rounded-xl p-4">
                    <CheckCircle className="w-6 h-6 text-cyan-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">保险费用</h3>
              <div className="text-center mb-8">
                <span className="text-5xl font-bold text-cyan-600">2元</span>
                <span className="text-gray-600 ml-2">/人/天</span>
              </div>
              <div className="space-y-3">
                {['按天计费，灵活透明', '次日生效，无需等待', '批量投保，一键完成', '在线理赔，快速到账'].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full mt-8 bg-cyan-600 hover:bg-cyan-700 text-white rounded-xl py-6">
                立即投保
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
