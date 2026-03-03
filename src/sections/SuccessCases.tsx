import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Clock, ShieldCheck, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

const cases = [
  {
    industry: '外卖配送',
    customerType: '全国连锁平台',
    onboarding: '10个工作日',
    challenge: '高峰期骑手结算压力大，人工对账易出错。',
    efficiency: '+65%',
    cost: '-19%',
    compliance: '劳务纠纷率 -41%',
    icon: Clock,
  },
  {
    industry: '网约车',
    customerType: '多城市运力服务商',
    onboarding: '14个工作日',
    challenge: '跨区域主体管理复杂，支付与票据规则不统一。',
    efficiency: '+58%',
    cost: '-23%',
    compliance: '票据合规率 99.2%',
    icon: ShieldCheck,
  },
  {
    industry: '物流仓配',
    customerType: '仓配一体化企业',
    onboarding: '7个工作日',
    challenge: '临时用工波峰明显，招聘结算链路长。',
    efficiency: '+72%',
    cost: '-16%',
    compliance: '留痕覆盖 100%',
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
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">客户成功案例</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">围绕客户类型、接入时长、效率提升与合规风险，展示可验证成果。</p>
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
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.industry}</h3>
                <p className="text-sm text-gray-500 mb-4">客户类型：{item.customerType} · 接入时长：{item.onboarding}</p>
                <p className="text-gray-700 mb-4 leading-relaxed">{item.challenge}</p>

                <div className="grid grid-cols-3 gap-3 pt-5 border-t border-gray-100">
                  <div><p className="text-xs text-gray-500">效率提升</p><p className="text-sm font-semibold">{item.efficiency}</p></div>
                  <div><p className="text-xs text-gray-500">成本下降</p><p className="text-sm font-semibold">{item.cost}</p></div>
                  <div><p className="text-xs text-gray-500">合规风险</p><p className="text-sm font-semibold">{item.compliance}</p></div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-12 text-center flex justify-center gap-4 flex-wrap">
          <Link to="/downloads">
            <Button variant="outline" className="rounded-full px-8" onClick={() => trackEvent('download_casebook_entry')}>
              <Download className="w-4 h-4 mr-2" />下载案例 PDF
            </Button>
          </Link>
          <Link to="/about/contact">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8 group">
              预约顾问
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
