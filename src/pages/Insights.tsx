import { useEffect } from 'react';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const posts = [
  { title: '灵活用工政策解读（2026）', category: '政策解读', summary: '梳理多地税务与结算监管重点，给出企业落地建议。' },
  { title: '外卖与即时配送用工趋势观察', category: '用工趋势', summary: '分析旺季弹性用工结构与成本控制模型。' },
  { title: '从案例看结算中台搭建方法论', category: '案例方法论', summary: '拆解项目实施阶段、组织配合与 KPI 管理。' },
];

export default function Insights() {
  useEffect(() => window.scrollTo(0, 0), []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-16 bg-blue-50">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900">行业洞察</h1>
          <p className="text-gray-600 mt-3">政策解读、用工趋势、案例方法论持续更新。</p>
        </div>
      </section>
      <section className="py-16 max-w-6xl mx-auto px-4 grid md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <article key={post.title} className="rounded-2xl border border-gray-100 p-6">
            <p className="text-xs text-blue-700 mb-2">{post.category}</p>
            <h2 className="font-bold text-lg mb-2">{post.title}</h2>
            <p className="text-sm text-gray-600">{post.summary}</p>
          </article>
        ))}
      </section>
      <Footer />
    </div>
  );
}
