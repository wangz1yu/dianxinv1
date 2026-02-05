import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, Shield, Users, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

const services = [
  {
    id: 'settlement',
    icon: Wallet,
    title: '灵工结算',
    subtitle: 'T+0极速发薪',
    href: '/services/settlement',
    description: '为企业提供合规、高效的灵活用工结算服务，支持多种支付方式，资金实时到账，降低用工成本30%以上。',
    features: ['T+0极速到账', '合规税务处理', '多支付方式支持', '智能风控系统'],
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: 'insurance',
    icon: Shield,
    href: '/services/insurance',
    title: '日结保险',
    subtitle: '按天计费，次日生效',
    description: '专为灵活用工场景设计的保险产品，按实际工作天数计费，次日自动生效，全面保障用工安全。',
    features: ['按天灵活计费', '次日自动生效', '工伤意外保障', '在线快速理赔'],
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    id: 'recruitment',
    icon: Users,
    title: '用工招聘',
    href: '/services/recruitment',
    subtitle: '500万+人才库',
    description: '覆盖全国的灵活用工人才网络，智能匹配算法快速找到合适人才，从发布需求到人员到岗最快24小时。',
    features: ['500万+人才库', '智能匹配算法', '24小时快速到岗', '全流程服务'],
    color: 'from-indigo-500 to-indigo-600',
  },
];

export default function Services() {
  const [activeService, setActiveService] = useState(0);

  return (
    <section className="py-24 bg-[#F5F7FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            推动<span className="text-blue-600">智能</span>用工
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            拥有超过8年的行业经验，点薪云为现代企业量身定制的新一代灵活用工解决方案
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Tab Menu */}
          <div className="lg:col-span-4 space-y-3">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isActive = activeService === index;
              
              return (
                <motion.button
                  key={service.id}
                  onClick={() => setActiveService(index)}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className={`w-full text-left p-5 rounded-2xl transition-all duration-300 ${
                    isActive 
                      ? 'bg-white shadow-lg border-l-4 border-blue-500' 
                      : 'bg-white/50 hover:bg-white hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      isActive 
                        ? 'bg-gradient-to-br ' + service.color + ' text-white' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-lg ${
                        isActive ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{service.subtitle}</p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Right Content Card */}
          <div className="lg:col-span-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden"
              >
                <div className="p-8">
                  {/* Card Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${services[activeService].color} flex items-center justify-center`}>
                        {(() => {
                          const Icon = services[activeService].icon;
                          return <Icon className="w-5 h-5 text-white" />;
                        })()}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900">
                        {services[activeService].title}
                      </h3>
                    </div>
                    <Link to={services[activeService].href}>
                      <Button variant="outline" className="rounded-full group">
                        查看更多
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </div>

                  {/* Service Image */}
                  <div className="relative rounded-2xl overflow-hidden mb-6 h-48">
                    <img 
                      src={`/images/service-${services[activeService].id}.jpg`}
                      alt={services[activeService].title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {services[activeService].description}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-2 gap-3">
                    {services[activeService].features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center">
                          <Check className="w-3 h-3 text-green-600" />
                        </div>
                        <span className="text-sm text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
