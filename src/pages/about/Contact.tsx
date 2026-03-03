import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';
import { getAttribution, trackEvent } from '@/lib/analytics';

const contactInfo = [
  { icon: Phone, title: '联系电话', content: '17340094007' },
  { icon: Mail, title: '电子邮箱', content: 'wangziyu@dianxingg.com.cn' },
  { icon: MapPin, title: '公司地址', content: '安徽省合肥市蜀山区南七街道望江西路华润五彩国际1303室' },
  { icon: Clock, title: '服务时间', content: '周一至周日 9:00-21:00' },
];

interface ContactFormData {
  identity: '企业' | '渠道' | '求职';
  monthlyHeadcount: string;
  industry: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
}

export default function Contact() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ContactFormData>({
    identity: '企业',
    monthlyHeadcount: '',
    industry: '',
    name: '',
    phone: '',
    email: '',
    company: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canNext = useMemo(() => {
    if (step === 1) return Boolean(formData.identity);
    if (step === 2) return Boolean(formData.monthlyHeadcount && formData.industry);
    return true;
  }, [step, formData]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const payload = {
        ...formData,
        timestamp: new Date().toISOString(),
        attribution: getAttribution(),
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result?.error || '提交失败，请稍后重试');
      }

      trackEvent('contact_submit', { identity: formData.identity, industry: formData.industry });
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setStep(1);
        setFormData({
          identity: '企业',
          monthlyHeadcount: '',
          industry: '',
          name: '',
          phone: '',
          email: '',
          company: '',
          message: '',
        });
      }, 2500);
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交失败，请检查网络连接');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">联系我们</h1>
            <p className="text-blue-100 text-lg leading-relaxed">多步咨询流程，快速匹配行业顾问。</p>
            <div className="mt-6 inline-flex flex-wrap justify-center gap-3 text-sm text-blue-100">
              <span className="bg-white/10 px-3 py-1 rounded-full">2 小时内响应</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">支持对公保密协议</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">专属方案评估</span>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-3">在线咨询</h2>
                <p className="text-sm text-gray-500 mb-6">步骤 {step}/3</p>
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">提交成功！</h3>
                    <p className="text-gray-600">我们已收到您的咨询，顾问将尽快与您联系</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {error && (
                      <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-200 rounded-xl">
                        <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                        <p className="text-red-700 text-sm">{error}</p>
                      </div>
                    )}

                    {step === 1 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">第一步：您的身份</label>
                        <select name="identity" className="w-full border rounded-xl h-11 px-3" value={formData.identity} onChange={handleInputChange}>
                          <option value="企业">企业</option>
                          <option value="渠道">渠道合作</option>
                          <option value="求职">求职咨询</option>
                        </select>
                      </div>
                    )}

                    {step === 2 && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">第二步：每月业务量级（人数）</label>
                          <Input name="monthlyHeadcount" value={formData.monthlyHeadcount} onChange={handleInputChange} placeholder="如 5000" required />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">行业类型</label>
                          <Input name="industry" value={formData.industry} onChange={handleInputChange} placeholder="如 外卖/网约车/物流" required />
                        </div>
                      </div>
                    )}

                    {step === 3 && (
                      <div className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <Input name="name" placeholder="姓名" value={formData.name} onChange={handleInputChange} required />
                          <Input name="phone" placeholder="电话" value={formData.phone} onChange={handleInputChange} required />
                        </div>
                        <Input name="email" type="email" placeholder="邮箱" value={formData.email} onChange={handleInputChange} />
                        <Input name="company" placeholder="公司名称" value={formData.company} onChange={handleInputChange} />
                        <Textarea name="message" placeholder="需求说明" value={formData.message} onChange={handleInputChange} className="min-h-[100px]" required />
                      </div>
                    )}

                    <div className="flex gap-3">
                      {step > 1 && (
                        <Button type="button" variant="outline" className="flex-1" onClick={() => setStep((v) => v - 1)}>
                          上一步
                        </Button>
                      )}
                      {step < 3 ? (
                        <Button
                          type="button"
                          className="flex-1 bg-blue-600 hover:bg-blue-700"
                          onClick={() => {
                            if (canNext) {
                              trackEvent('contact_step_next', { step, identity: formData.identity });
                              setStep((v) => v + 1);
                            }
                          }}
                        >
                          下一步
                        </Button>
                      ) : (
                        <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white" disabled={loading}>
                          <Send className="w-4 h-4 mr-2" />
                          {loading ? '提交中...' : '提交咨询'}
                        </Button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">联系方式</h2>
              <div className="space-y-6 mb-12">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 bg-white rounded-2xl p-6 shadow-sm">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
