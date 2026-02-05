import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, Users, TrendingUp, Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const stats = [
  { value: '8年', label: '行业经验' },
  { value: '1000+', label: '服务企业' },
  { value: '500万+', label: '注册人才' },
  { value: '10亿+', label: '年发薪额' },
];

const values = [
  { icon: Award, title: '专业', desc: '8年专注灵活用工领域，深耕行业know-how' },
  { icon: Shield, title: '合规', desc: '严格遵守法律法规，确保每一笔结算合规安全' },
  { icon: TrendingUp, title: '创新', desc: '持续技术创新，引领行业发展方向' },
  { icon: Users, title: '共赢', desc: '与客户共同成长，实现多方共赢' },
];

export default function Company() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">关于点薪云</h1>
            <p className="text-blue-100 text-lg mb-8 leading-relaxed">
              安徽点薪网络科技有限公司成立于2023年01月12日，总部位于安徽省合肥市蜀山区，是一家专注于灵活用工领域的科技型企业。
              我们致力于通过数字化工具，为企业提供智能化、自动化的一站式用工解决方案。
            </p>
            <Button className="bg-white text-blue-600 hover:bg-gray-100 rounded-full px-8">
              联系我们
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">我们的价值观</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">点薪云始终坚持的核心理念</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <value.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">我们的使命</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                让灵活用工更简单。我们相信，通过技术创新和服务升级，可以为企业提供更高效、更合规、更便捷的用工解决方案。
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                我们的愿景是成为中国领先的灵活用工服务平台，为千万企业和自由职业者创造价值，推动灵活用工行业的健康发展。
              </p>
            </motion.div>
            
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">核心优势</h3>
              <div className="space-y-4">
                {['8年行业深耕，积累了丰富的行业经验', '专业的技术团队，持续创新产品能力', '完善的服务体系，7×12小时客户支持', '严格的风控体系，保障资金安全'].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    <span className="text-gray-700">{item}</span>
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
