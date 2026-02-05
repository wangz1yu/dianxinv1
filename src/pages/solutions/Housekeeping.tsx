import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Home, Clock, Shield, Star, Users, Award, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const features = [
  { icon: Users, title: '服务人员管理', desc: '统一管理家政服务人员信息，包括资质认证、服务评价、工作记录等' },
  { icon: Clock, title: '灵活工时结算', desc: '支持按小时、按天、按项目多种结算模式，满足不同服务场景' },
  { icon: Shield, title: '服务保险保障', desc: '为家政人员提供意外险和责任险，保障服务过程中的风险' },
  { icon: Star, title: '评价体系管理', desc: '完善的评价系统，帮助平台筛选优质服务人员，提升服务质量' },
];

export default function Housekeeping() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-cyan-600 to-teal-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full text-white text-sm mb-6">
              <Home className="w-4 h-4" />
              家政服务解决方案
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">家政服务行业<br />灵活用工解决方案</h1>
            <p className="text-cyan-100 text-lg mb-8 leading-relaxed">
              为家政服务平台提供从人员招聘、培训管理到结算发薪的全流程服务，助力平台提升服务质量，降低运营成本。
            </p>
            <Button className="bg-white text-cyan-600 hover:bg-gray-100 rounded-full px-8">
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
            <p className="text-gray-600 max-w-2xl mx-auto">专为家政服务行业设计，解决人员管理和结算的核心痛点</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-14 h-14 bg-cyan-100 rounded-xl flex items-center justify-center mb-6">
                  <feature.icon className="w-7 h-7 text-cyan-600" />
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
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">覆盖服务场景</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">支持各类家政服务场景的人员管理和结算需求</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: '保洁服务', desc: '日常保洁、深度清洁、开荒保洁等', icon: Home },
              { title: '月嫂育儿', desc: '月嫂服务、育儿嫂、保姆等', icon: Users },
              { title: '养老护理', desc: '老人陪护、康复护理、居家养老等', icon: Award },
            ].map((service, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl p-8 text-center">
                <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <service.icon className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">提升家政服务品质</h2>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">联系我们的专业团队，获取定制化的家政服务行业解决方案</p>
            <Button className="bg-cyan-600 hover:bg-cyan-700 text-white rounded-full px-8">立即咨询</Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
