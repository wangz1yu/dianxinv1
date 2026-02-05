import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Truck, Clock, Shield, BarChart3, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const features = [
  { icon: Truck, title: '配送员管理', desc: '统一管理配送员信息、工作状态、配送区域，实现高效调度' },
  { icon: Clock, title: '实时结算系统', desc: '订单完成后即时结算，配送员可随时提现，提升工作积极性' },
  { icon: BarChart3, title: '数据分析报表', desc: '提供配送效率、成本分析等多维度数据报表，辅助运营决策' },
  { icon: Shield, title: '全程保险覆盖', desc: '配送过程中的货物险和人身意外险，降低平台和配送员风险' },
];

export default function Logistics() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-emerald-600 to-green-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm mb-6">
              <Package className="w-4 h-4" />
              电商物流解决方案
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">电商物流行业<br />灵活用工解决方案</h1>
            <p className="text-emerald-100 text-lg mb-8 leading-relaxed">
              为电商物流企业提供从仓储分拣、配送员管理到结算发薪的全流程服务，助力企业应对大促高峰，降低用工成本。
            </p>
            <Button className="bg-white text-emerald-600 hover:bg-gray-100 rounded-full px-8">
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
            <p className="text-gray-600 max-w-2xl mx-auto">专为电商物流行业设计，解决高峰期用工难题和结算痛点</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-emerald-600" />
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">应对大促高峰期</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                双11、618等大促期间，订单量激增，用工需求大幅增加。点薪云提供灵活的用工解决方案，帮助企业快速补充运力，确保大促期间配送服务质量。
              </p>
              
              <div className="space-y-4">
                {['快速招聘临时配送员，24小时内到岗', '弹性用工模式，按需付费，降低成本', '智能调度系统，优化配送路线', '实时结算激励，提升配送员积极性'].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-3xl p-8">
              <div className="text-center mb-8">
                <BarChart3 className="w-16 h-16 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gray-900">大促期间成果</h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                  <div className="text-4xl font-bold text-emerald-600 mb-1">10倍</div>
                  <div className="text-gray-600 text-sm">运力弹性扩展</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                  <div className="text-4xl font-bold text-emerald-600 mb-1">24h</div>
                  <div className="text-gray-600 text-sm">快速到岗</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                  <div className="text-4xl font-bold text-emerald-600 mb-1">35%</div>
                  <div className="text-gray-600 text-sm">成本降低</div>
                </div>
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                  <div className="text-4xl font-bold text-emerald-600 mb-1">99.5%</div>
                  <div className="text-gray-600 text-sm">准时送达率</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">让物流配送更高效</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">联系我们的专业团队，获取定制化的电商物流行业解决方案</p>
            <Button className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8">立即咨询</Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
