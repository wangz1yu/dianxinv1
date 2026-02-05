import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Truck, Zap, Home, Bike, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const solutions = [
  {
    id: 'delivery',
    title: '同城配送',
    icon: Truck,
    color: 'from-orange-500 to-orange-600',
    path: '/solutions/delivery',
    description: '覆盖全城的配送网络，快速匹配专业配送人员，确保订单及时交付，提升客户满意度。',
    features: ['实时订单处理', '专业配送团队', '溯源追踪系统', '保险保障'],
  },
  {
    id: 'housekeeping',
    title: '家政保洁',
    icon: Home,
    color: 'from-green-500 to-green-600',
    path: '/solutions/housekeeping',
    description: '连接优质家政人员与家庭用户，提供上门保洁、家务帮手等多项服务，让生活更便利。',
    features: ['严格人员审核', '灵活服务时间', '服务评价体系', '安全责任保险'],
  },
  {
    id: 'ride',
    title: '通勤拼车',
    icon: Bike,
    color: 'from-purple-500 to-purple-600',
    path: '/solutions/ride',
    description: '为企业员工提供便利的通勤服务，智能匹配拼车方案，降低企业交通成本，提升员工体验。',
    features: ['智能路线规划', '企业团体方案', '费用透明计算', '安全担保机制'],
  },
  {
    id: 'logistics',
    title: '物流仓储',
    icon: Zap,
    color: 'from-red-500 to-red-600',
    path: '/solutions/logistics',
    description: '全链路物流解决方案，从仓储、分拣到配送，借助人工智能和灵活用工模式实现降本增效。',
    features: ['智能仓储管理', '分拣优化算法', '快速配送网络', '数据分析报告'],
  },
];

export default function Solutions() {
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">行业解决方案</h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              覆盖多个行业场景，为企业数字化转型提供完整解决方案
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <motion.div
                  key={solution.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
                >
                  <div className={`h-32 bg-gradient-to-br ${solution.color}`} />
                  <div className="p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${solution.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">{solution.title}</h3>
                    </div>
                    
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {solution.description}
                    </p>

                    <div className="space-y-2 mb-8">
                      {solution.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                          {feature}
                        </div>
                      ))}
                    </div>

                    <Link to={solution.path} className="block">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl group">
                        查看方案
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
