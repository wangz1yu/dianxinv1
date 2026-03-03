import { useEffect } from 'react';
import { Download, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { Button } from '@/components/ui/button';

const caseList = [
  {
    industry: '外卖配送平台',
    customerType: '全国型平台 + 区域加盟商',
    onboarding: '10 个工作日',
    efficiency: '结算效率 +65%',
    cost: '综合成本 -19%',
    compliance: '劳务争议率下降 41%',
  },
  {
    industry: '网约车运力服务商',
    customerType: '城市运力管理公司',
    onboarding: '14 个工作日',
    efficiency: '财务对账效率 +58%',
    cost: '管理成本 -23%',
    compliance: '票据合规命中率提升至 99.2%',
  },
  {
    industry: '电商物流分拣',
    customerType: '仓配一体化服务商',
    onboarding: '7 个工作日',
    efficiency: '临时工上岗效率 +72%',
    cost: '旺季用工成本 -16%',
    compliance: '税务留痕与电子档案覆盖 100%',
  },
];

export default function Cases() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 to-slate-800">
        <div className="max-w-6xl mx-auto px-4 text-white">
          <h1 className="text-4xl font-bold mb-4">客户案例 / 成功故事</h1>
          <p className="text-blue-100 max-w-3xl">用可验证的业务结果，展示点薪云在结算、风控、合规与组织效率上的价值。</p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
          {caseList.map((item) => (
            <article key={item.industry} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">{item.industry}</h2>
              <ul className="space-y-2 text-sm text-gray-700">
                <li><span className="font-medium">客户类型：</span>{item.customerType}</li>
                <li><span className="font-medium">接入时长：</span>{item.onboarding}</li>
                <li><span className="font-medium">效率提升：</span>{item.efficiency}</li>
                <li><span className="font-medium">成本变化：</span>{item.cost}</li>
                <li><span className="font-medium">合规风险：</span>{item.compliance}</li>
              </ul>
            </article>
          ))}
        </div>

        <div className="max-w-6xl mx-auto px-4 mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a href="/downloads" className="inline-flex">
            <Button variant="outline" className="rounded-full px-6">
              <Download className="w-4 h-4 mr-2" /> 下载案例 PDF
            </Button>
          </a>
          <Link to="/about/contact">
            <Button className="bg-blue-600 hover:bg-blue-700 rounded-full px-6 text-white">
              预约顾问
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
