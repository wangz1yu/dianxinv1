import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock3, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const caseStudies = [
  {
    title: '同城配送平台',
    icon: Clock3,
    background: '高峰期订单波动大，骑手结算与工单反馈存在明显延迟。',
    solution: '上线自动结算 + 工单追踪，打通对账、结算、反馈闭环。',
    metrics: [
      { label: '接入周期', value: '7天' },
      { label: '结算效率', value: '+60%' },
      { label: '客诉工单', value: '-42%' },
    ],
  },
  {
    title: '网约车运力服务商',
    icon: ShieldCheck,
    background: '多城市扩张阶段，保险覆盖、风控策略与合规留痕管理复杂。',
    solution: '实施风控规则引擎 + 保险联动，建立城市级运营看板。',
    metrics: [
      { label: '覆盖城市', value: '30+' },
      { label: '保险覆盖率', value: '99.5%' },
      { label: '异常处置时效', value: '实时预警' },
    ],
  },
  {
    title: '物流分拣中心',
    icon: Truck,
    background: '季节性波峰导致临时用工成本高，排班与到岗率难平衡。',
    solution: '接入招聘-上岗-结算联动体系，优化用工结构与班次分配。',
    metrics: [
      { label: '到岗时效', value: '24h内' },
      { label: '综合成本', value: '-18%' },
      { label: '人员留存', value: '+27%' },
    ],
  },
];

export default function Cases() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">客户成功案例</h1>
          <p className="text-blue-100 max-w-3xl mx-auto text-lg leading-relaxed">
            通过真实项目数据展示我们在结算效率、合规风控与人力成本优化上的落地成果。
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          {caseStudies.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">{item.title}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div>
                    <p className="text-sm text-gray-500 mb-2">项目背景</p>
                    <p className="text-gray-700 leading-relaxed">{item.background}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-2">解决方案</p>
                    <p className="text-gray-700 leading-relaxed">{item.solution}</p>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-4 pt-6 border-t border-gray-100">
                  {item.metrics.map((metric) => (
                    <div key={metric.label} className="bg-blue-50 rounded-2xl p-4">
                      <p className="text-xs text-blue-600">{metric.label}</p>
                      <p className="text-lg font-bold text-gray-900 mt-1">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">需要获取完整案例资料包？</h3>
          <p className="text-gray-600 mb-8">支持按行业提供详细实施流程、上线排期和指标拆解。</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/about/contact">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
                预约顾问
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
            <a href="/about/contact" className="inline-flex">
              <Button variant="outline" className="rounded-full px-8">下载案例目录</Button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
