import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calculator, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const industryOptions = [
  { label: '同城配送', value: 'delivery', multiplier: 1.1 },
  { label: '网约车', value: 'ride', multiplier: 1.05 },
  { label: '物流仓配', value: 'logistics', multiplier: 0.95 },
  { label: '家政服务', value: 'housekeeping', multiplier: 0.9 },
];

export default function ROICalculator() {
  const [headcount, setHeadcount] = useState('500');
  const [monthlyAmount, setMonthlyAmount] = useState('4500');
  const [industry, setIndustry] = useState(industryOptions[0].value);

  const result = useMemo(() => {
    const people = Number(headcount) || 0;
    const amount = Number(monthlyAmount) || 0;
    const ratio = industryOptions.find((item) => item.value === industry)?.multiplier ?? 1;

    const annualVolume = people * amount * 12;
    const efficiencyGain = Math.round((20 + people / 80) * ratio);
    const mgmtSaving = Math.round(annualVolume * 0.018 * ratio);
    const riskReduction = Math.min(65, Math.round((25 + people / 60) * ratio));

    return {
      annualVolume,
      efficiencyGain,
      mgmtSaving,
      riskReduction,
    };
  }, [headcount, monthlyAmount, industry]);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">ROI 费用试算器</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            输入业务规模，快速评估结算系统接入后的效率与成本收益，获取专属方案建议。
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-50 rounded-3xl p-8 border border-gray-100">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">月结算人数</label>
                <Input value={headcount} onChange={(e) => setHeadcount(e.target.value)} type="number" min="0" className="rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">人均月结算金额（元）</label>
                <Input value={monthlyAmount} onChange={(e) => setMonthlyAmount(e.target.value)} type="number" min="0" className="rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">行业类型</label>
                <div className="grid grid-cols-2 gap-3">
                  {industryOptions.map((item) => (
                    <button
                      type="button"
                      key={item.value}
                      onClick={() => setIndustry(item.value)}
                      className={`rounded-xl border px-4 py-3 text-sm transition-colors ${
                        industry === item.value
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white text-gray-700 border-gray-200 hover:border-blue-400'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl p-8 text-white shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <Calculator className="w-6 h-6" />
              <h3 className="text-xl font-bold">预估收益结果</h3>
            </div>

            <div className="space-y-4 mb-8">
              <div className="bg-white/10 rounded-2xl p-4">
                <p className="text-blue-100 text-sm">年结算规模</p>
                <p className="text-2xl font-bold">¥{result.annualVolume.toLocaleString()}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-blue-100 text-sm">效率提升</p>
                  <p className="text-xl font-semibold">+{result.efficiencyGain}%</p>
                </div>
                <div className="bg-white/10 rounded-2xl p-4">
                  <p className="text-blue-100 text-sm">管理成本节省</p>
                  <p className="text-xl font-semibold">¥{result.mgmtSaving.toLocaleString()}</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm">合规风险下降</p>
                  <p className="text-xl font-semibold">-{result.riskReduction}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-blue-100" />
              </div>
            </div>

            <Link to="/about/contact">
              <Button className="w-full bg-white text-blue-700 hover:bg-blue-50 rounded-full">
                预约方案评估
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
