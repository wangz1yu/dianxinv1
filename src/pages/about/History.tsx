import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Rocket, TrendingUp, Award, Users, Globe } from 'lucide-react';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const milestones = [
  { year: '2016', title: '公司成立', desc: '安徽点薪网络科技有限公司正式成立，专注灵活用工领域', icon: Rocket },
  { year: '2017', title: '产品上线', desc: '灵工结算系统1.0版本正式上线，服务首批客户', icon: TrendingUp },
  { year: '2018', title: '业务拓展', desc: '服务客户突破100家，覆盖10个城市', icon: Users },
  { year: '2019', title: '技术升级', desc: '推出智能风控系统，AI算法全面应用', icon: Award },
  { year: '2020', title: '规模增长', desc: '服务客户突破500家，年发薪额突破5亿', icon: TrendingUp },
  { year: '2021', title: '生态完善', desc: '推出日结保险、用工招聘等全链条服务', icon: Globe },
  { year: '2022', title: '行业领先', desc: '服务客户突破1000家，成为行业头部企业', icon: Award },
  { year: '2023', title: '持续创新', desc: '区块链存证技术上线，合规能力再升级', icon: Rocket },
  { year: '2024', title: '未来可期', desc: '持续深耕灵活用工，服务更多企业和人才', icon: TrendingUp },
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
              从2016年创立至今，点薪云始终专注于灵活用工领域，不断创新发展
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
