import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Wallet, Shield, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const services = [
  {
    id: 'settlement',
    title: '灵工结算',
    icon: Wallet,
    color: 'from-blue-500 to-blue-600',
    path: '/services/settlement',
    description: '为企业提供合规、高效的灵活用工结算服务，支持多种支付方式，资金实时到账，降低用工成本30%以上。',
    features: ['T+0极速到账', '合规税务处理', '多支付方式支持', '智能风控系统'],
  },
  {
    id: 'insurance',
    title: '日结保险',
    icon: Shield,
    color: 'from-cyan-500 to-cyan-600',
    path: '/services/insurance',
    description: '专为灵活用工场景设计的保险产品，按实际工作天数计费，次日自动生效，全面保障用工安全。',
    features: ['按天灵活计费', '次日自动生效', '工伤意外保障', '在线快速理赔'],
  },
  {
    id: 'recruitment',
    title: '用工招聘',
    icon: Users,
    color: 'from-indigo-500 to-indigo-600',
    path: '/services/recruitment',
    description: '覆盖全国的灵活用工人才网络，智能匹配算法快速找到合适人才，从发布需求到人员到岗最快24小时。',
    features: ['500万+人才库', '智能匹配算法', '24小时快速到岗', '全流程服务'],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">产品服务</h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              点薪云为现代企业量身定制的新一代灵活用工解决方案
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  <div className={`h-32 bg-gradient-to-br ${service.color}`} />
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${service.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{service.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>

                    <div className="space-y-2 mb-8">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Link to={service.path} className="block">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl group">
                        了解详情
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
