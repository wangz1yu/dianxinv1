import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, TrendingUp, Award, Users, Globe } from 'lucide-react';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const milestones = [
  { year: '2023年01月', title: '公司成立', desc: '安徽点薪网络科技有限公司正式成立，总部位于安徽省合肥市蜀山区，专注灵活用工领域服务', icon: Rocket },
  { year: '2023年03月', title: '产品完善', desc: '灵工结算系统完整版本上线，推出日结保险等配套服务产品', icon: TrendingUp },
  { year: '2023年06月', title: '业务拓展', desc: '与首批龙头企业达成合作，覆盖外卖、网约车等领域', icon: Users },
  { year: '2023年09月', title: '技术升级', desc: '推出智能风控系统和合规审核体系，通过多项资质认证', icon: Award },
  { year: '2023年12月', title: '规模增长', desc: '服务企业突破100家，注册人才突破50万，月发薪额突破千万级', icon: TrendingUp },
  { year: '2024年03月', title: '生态完善', desc: '推出用工招聘、数字身份认证等全链条增值服务', icon: Globe },
  { year: '2024年06月', title: '创新发展', desc: '启动区块链存证技术研发，建立合规能力认证体系', icon: Award },
  { year: '2024年09月', title: '行业领先', desc: '获得灵活用工服务领先企业认证，成为业内标杆', icon: Rocket },
  { year: '2025年及以后', title: '未来展望', desc: '继续深耕灵活用工产业，服务更多企业和人才，打造行业生态', icon: TrendingUp },
];

export default function History() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">发展历程</h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              自2023年成立以来，点薪云快速发展，不断创新和优化灵活用工解决方案
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 transform md:-translate-x-1/2" />
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-start gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                      <span className="text-3xl font-bold text-blue-600">{milestone.year}</span>
                      <h3 className="text-xl font-bold text-gray-900 mt-2 mb-2">{milestone.title}</h3>
                      <p className="text-gray-600">{milestone.desc}</p>
                    </div>
                  </div>
                  
                  {/* Icon */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                      <milestone.icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  {/* Spacer for alternating layout */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
