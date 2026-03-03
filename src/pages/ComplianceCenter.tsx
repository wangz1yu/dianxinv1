import { useEffect } from 'react';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const flow = ['签约与主体校验', '结算规则配置', '个税申报与票据处理', '全链路留痕归档'];
const risks = ['异常身份识别', '批量支付风控阈值', '高频账户拦截', '税票一致性核验'];
const faqs = [
  { q: '是否适用于外卖、网约车、物流行业？', a: '支持，已沉淀多行业模板并可按城市政策细化。' },
  { q: '票据与税务如何处理？', a: '支持票据流转管理、申报记录与电子档案留存。' },
  { q: '能否签署对公保密协议？', a: '支持 NDA 与数据处理协议，保障商业与数据安全。' },
];

export default function ComplianceCenter() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-20 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">合规与安全中心</h1>
          <p className="text-slate-300">从签约、结算、报税到留痕，全流程保障企业用工合规。</p>
        </div>
      </section>
      <section className="py-16 max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-8">
        <div className="rounded-2xl border p-6">
          <h2 className="font-bold text-xl mb-4">合规流程图</h2>
          <ol className="space-y-3 list-decimal list-inside text-gray-700">
            {flow.map((item) => <li key={item}>{item}</li>)}
          </ol>
        </div>
        <div className="rounded-2xl border p-6">
          <h2 className="font-bold text-xl mb-4">风控策略</h2>
          <ul className="space-y-3 text-gray-700 list-disc list-inside">
            {risks.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </div>
        <div className="rounded-2xl border p-6 lg:col-span-2">
          <h2 className="font-bold text-xl mb-4">资质证照与法务 FAQ</h2>
          <p className="text-gray-600 mb-4">资质证照汇总可在下载中心统一获取，并支持法务条款说明文档。</p>
          <div className="space-y-4">
            {faqs.map((item) => (
              <div key={item.q}>
                <p className="font-medium">Q: {item.q}</p>
                <p className="text-gray-600">A: {item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
