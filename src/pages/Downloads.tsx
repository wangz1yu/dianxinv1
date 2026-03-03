import { useEffect } from 'react';
import { Download } from 'lucide-react';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { Button } from '@/components/ui/button';
import { trackEvent } from '@/lib/analytics';

const resources = [
  { name: '社会化用工方案白皮书', type: 'PDF' },
  { name: '结算与报税实施清单模板', type: 'XLS' },
  { name: '平台能力演示资料', type: 'PDF' },
  { name: '合规证照汇总包', type: 'ZIP' },
];

export default function Downloads() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-16 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900">下载中心</h1>
          <p className="text-gray-600 mt-3">统一管理白皮书、模板和演示资料，支持销售与方案评估前置。</p>
        </div>
      </section>
      <section className="py-16 max-w-6xl mx-auto px-4 space-y-4">
        {resources.map((resource) => (
          <div key={resource.name} className="rounded-xl border p-4 flex justify-between items-center">
            <div>
              <p className="font-medium">{resource.name}</p>
              <p className="text-xs text-gray-500">文件类型：{resource.type}</p>
            </div>
            <Button
              variant="outline"
              onClick={() => trackEvent('download_resource', { resource: resource.name })}
            >
              <Download className="w-4 h-4 mr-2" />下载
            </Button>
          </div>
        ))}
      </section>
      <Footer />
    </div>
  );
}
