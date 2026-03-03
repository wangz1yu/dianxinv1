import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

const multipliers: Record<string, number> = {
  外卖配送: 0.78,
  网约车: 0.81,
  物流仓配: 0.84,
  其他行业: 0.86,
};

export default function ROICalculator() {
  const [headcount, setHeadcount] = useState(2000);
  const [perCapitaAmount, setPerCapitaAmount] = useState(6500);
  const [industry, setIndustry] = useState('外卖配送');

  useEffect(() => window.scrollTo(0, 0), []);

  const result = useMemo(() => {
    const monthlyTotal = headcount * perCapitaAmount;
    const optimizedCost = monthlyTotal * (multipliers[industry] || 0.86);
    const saved = monthlyTotal - optimizedCost;
    const efficiency = Math.round((1 - multipliers[industry]) * 180);
    return {
      monthlyTotal,
      optimizedCost,
      savedRange: [saved * 0.85, saved * 1.15],
      efficiency,
    };
  }, [headcount, perCapitaAmount, industry]);

  const format = (value: number) => `¥${Math.round(value).toLocaleString('zh-CN')}`;

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-20 bg-gray-950 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">ROI / 费用试算器</h1>
          <p className="text-gray-300">输入业务规模，快速估算综合成本、效率提升与管理节省空间。</p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-gray-100">
            <h2 className="text-xl font-bold mb-6">输入参数</h2>
            <div className="space-y-5">
              <div>
                <label className="text-sm text-gray-600">月结算人数</label>
                <Input type="number" value={headcount} onChange={(e) => setHeadcount(Number(e.target.value) || 0)} />
              </div>
              <div>
                <label className="text-sm text-gray-600">单人单月金额（元）</label>
                <Input type="number" value={perCapitaAmount} onChange={(e) => setPerCapitaAmount(Number(e.target.value) || 0)} />
              </div>
              <div>
                <label className="text-sm text-gray-600">行业类型</label>
                <select className="w-full border rounded-md h-10 px-3" value={industry} onChange={(e) => setIndustry(e.target.value)}>
                  {Object.keys(multipliers).map((it) => <option key={it}>{it}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-blue-100">
            <h2 className="text-xl font-bold mb-6">试算结果</h2>
            <div className="space-y-4 text-gray-800">
              <p>预估原始综合成本：<span className="font-semibold">{format(result.monthlyTotal)}</span> / 月</p>
              <p>使用点薪云后预估成本：<span className="font-semibold text-blue-700">{format(result.optimizedCost)}</span> / 月</p>
              <p>管理成本节省区间：<span className="font-semibold text-green-700">{format(result.savedRange[0])} ~ {format(result.savedRange[1])}</span></p>
              <p>结算效率提升：<span className="font-semibold">约 {result.efficiency}%</span></p>
            </div>
            <Link to="/about/contact">
              <Button
                className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => trackEvent('click_schedule_assessment', { source: 'roi_calculator', industry })}
              >
                预约方案评估
              </Button>
            </Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
