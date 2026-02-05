import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Search, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const features = [
  { icon: Users, title: '500万+人才库', desc: '覆盖全国的灵活用工人才网络' },
  { icon: Search, title: '智能匹配', desc: 'AI算法精准匹配岗位需求' },
  { icon: Clock, title: '快速到岗', desc: '从发布需求到人员到岗最快24小时' },
  { icon: CheckCircle, title: '资质审核', desc: '严格的身份和资质审核' },
];

export default function Recruitment() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-indigo-600 to-indigo-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm mb-6">
              <Users className="w-4 h-4" />
              用工招聘
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">灵活用工招聘服务</h1>
            <p className="text-indigo-100 text-lg mb-8 leading-relaxed">
              覆盖全国的灵活用工人才网络，智能匹配算法快速找到合适人才，从发布需求到人员到岗最快24小时。
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
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">服务优势</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">海量人才库，快速响应企业用工需求</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-8 h-8 text-indigo-600" />
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
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">服务流程</h2>
              <div className="space-y-6">
                {[
                  { step: '01', title: '发布需求', desc: '填写岗位需求，包括人数、技能、薪资等' },
                  { step: '02', title: '智能匹配', desc: 'AI算法从人才库中精准匹配候选人' },
                  { step: '03', title: '面试筛选', desc: '安排面试，筛选合适人员' },
                  { step: '04', title: '人员到岗', desc: '签订合同，人员快速到岗工作' },
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm">{item.step}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">覆盖行业</h3>
              <div className="grid grid-cols-2 gap-4">
                {['外卖配送', '网约车', '家政服务', '电商物流', '零售促销', '活动执行'].map((item, index) => (
                  <div key={index} className="bg-white rounded-xl p-4 text-center shadow-sm">
                    <span className="text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
