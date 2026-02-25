import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

const qualifications = [
  {
    id: 'soft-copyright',
    title: '软件著作权',
    image: '/images/qualifications/qualification-1.svg',
    summary: '公司拥有多项软件著作权，覆盖核心平台模块',
    detail:
      '本公司已取得若干软件著作权，覆盖订单处理、结算报表、对接 API 等核心能力。证书号与详细信息可在此查看。',
  },
  {
    id: 'info-service',
    title: '信息服务业务（仅限互联网信息服务）',
    image: '/images/qualifications/qualification-2.svg',
    summary: '已备案并具备互联网信息服务资质',
    detail:
      '本平台具备开展互联网信息服务的相关资质，依法合规运营，提供在线数据处理与交易处理服务。',
  },
  {
    id: 'online-data',
    title: '在线数据处理与交易处理业务',
    image: '/images/qualifications/qualification-3.svg',
    summary: '支持在线数据处理与交易处理的系统能力',
    detail:
      '系统支持高并发在线数据处理与交易流程，提供 API 与可视化管理后台，满足企业级使用场景。',
  },
];

export default function Qualifications() {
  const [selected, setSelected] = useState(qualifications[0]);

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6 text-center"
        >
          <h3 className="text-2xl font-semibold text-gray-900">企业平台资质展示</h3>
          <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
            平台拥有的软件著作权、互联网信息服务等资质。点击右侧列表选择资质，使用“放大预览”查看大图与说明。
          </p>
        </motion.div>

        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex flex-col md:flex-row items-start gap-6">
            {/* Left: preview and enlarge button */}
            <div className="flex-1">
              <div className="rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
                <img
                  src={selected.image}
                  alt={selected.title}
                  className="w-full h-56 object-contain transition-opacity duration-300 hover:opacity-90"
                />
              </div>
              <h4 className="mt-4 text-lg font-semibold text-gray-900">{selected.title}</h4>
              <p className="text-sm text-gray-600 mt-2">{selected.summary}</p>

              <div className="mt-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="rounded-full">
                      放大预览
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <div className="w-full">
                      <img src={selected.image} alt={selected.title} className="w-full h-auto" />
                    </div>
                    <div className="mt-4">
                      <DialogTitle>{selected.title}</DialogTitle>
                      <DialogDescription>{selected.detail}</DialogDescription>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <DialogClose asChild>
                        <Button className="rounded-full">关闭</Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Right: list thumbnails (click to select) */}
            <div className="w-full md:w-96">
              <div className="space-y-3">
                {qualifications.map((q) => (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                    className={`flex items-center gap-4 p-3 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors border ${
                      selected.id === q.id ? 'border-blue-100 bg-blue-50' : 'border-transparent'
                    }`}
                    onClick={() => setSelected(q)}
                  >
                    <img src={q.image} alt={q.title} className="w-16 h-12 object-contain" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{q.title}</div>
                      <div className="text-xs text-gray-500">{q.summary}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
