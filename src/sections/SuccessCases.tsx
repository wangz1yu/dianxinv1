import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Clock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const cases = [
  {
    industry: '同城配送平台',
    challenge: '高峰期骑手结算压力大，人工对账易出错。',
    result: '结算时效提升至 T+0，当月客服工单下降 42%。',
    metrics: [
      { label: '月结算人数', value: '2.8万+' },
      { label: '结算时效', value: 'T+0' },
      { label: '对账效率', value: '+60%' },
    ],
    icon: Clock,
  },
  {
    industry: '网约车运力服务商',
    challenge: '多城市运营带来合规管理与保险覆盖难题。',
    result: '上线统一风控与保险联动方案，风险事件处理提速。',
    metrics: [
      { label: '覆盖城市', value: '30+' },
      { label: '保险覆盖', value: '99.5%' },
      { label: '风控预警', value: '实时' },
    ],
    icon: ShieldCheck,
  },
  {
    industry: '物流分拣中心',
    challenge: '季节性波峰明显，临时用工成本波动大。',
    result: '通过智能匹配与结算联动，综合人力成本下降。',
    metrics: [
      { label: '到岗时效', value: '24h内' },
      { label: '综合成本', value: '-18%' },
      { label: '留存率', value: '+27%' },
    ],
    icon: TrendingUp,
  },
];

export default function SuccessCases() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            客户成功案例
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            从配送、出行到物流，我们用可量化结果帮助企业实现降本增效。
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {cases.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.industry}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{item.industry}</h3>
                <p className="text-sm text-gray-500 mb-2">挑战</p>
                <p className="text-gray-700 mb-4 leading-relaxed">{item.challenge}</p>
                <p className="text-sm text-gray-500 mb-2">结果</p>
                <p className="text-blue-700 font-medium mb-6 leading-relaxed">{item.result}</p>

                <div className="grid grid-cols-3 gap-3 pt-5 border-t border-gray-100">
                  {item.metrics.map((metric) => (
                    <div key={metric.label}>
                      <p className="text-xs text-gray-500">{metric.label}</p>
                      <p className="text-sm font-semibold text-gray-900 mt-1">{metric.value}</p>
                    </div>
                  ))}
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link to="/about/contact">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 group">
              获取行业方案评估
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
