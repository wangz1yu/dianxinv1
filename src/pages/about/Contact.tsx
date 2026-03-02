import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle, AlertCircle, ShieldCheck, Timer, FileLock2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

const contactInfo = [
  { icon: Phone, title: '联系电话', content: '17340094007' },
  { icon: Mail, title: '电子邮箱', content: 'wangziyu@dianxingg.com.cn' },
  { icon: MapPin, title: '公司地址', content: '安徽省合肥市蜀山区南七街道望江西路华润五彩国际1303室' },
  { icon: Clock, title: '服务时间', content: '周一至周日 9:00-21:00' },
];

const roleOptions = ['企业客户', '渠道合作', '求职者'];
const industryOptions = ['外卖配送', '网约车', '物流仓配', '家政服务', '其他'];

interface ContactFormData {
  role: string;
  monthlyWorkers: string;
  industry: string;
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
  timestamp?: string;
}

const initialForm: ContactFormData = {
  role: roleOptions[0],
  monthlyWorkers: '',
  industry: industryOptions[0],
  name: '',
  phone: '',
  email: '',
  company: '',
  message: '',
};

export default function Contact() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ContactFormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    window.scrollTo(0, 0);
    const lastFormData = localStorage.getItem('lastContactForm');
    if (lastFormData) {
      try {
        setFormData({ ...initialForm, ...JSON.parse(lastFormData) });
      } catch (e) {
        console.error('Failed to load form data', e);
      }
    }
  }, []);

  const stepValid = useMemo(() => {
    if (step === 1) return Boolean(formData.role);
    if (step === 2) return Boolean(formData.monthlyWorkers && formData.industry);
    return Boolean(formData.name && formData.phone && formData.message);
  }, [formData, step]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    localStorage.setItem('lastContactForm', JSON.stringify(newFormData));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stepValid) return;

    setLoading(true);
    setError('');

    try {
      const contactRecord = { ...formData, timestamp: new Date().toISOString() };
      const response = await fetch('https://formspree.io/f/mpqjabyr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(contactRecord),
      });

      if (!response.ok) throw new Error('提交失败，请稍后重试');

      const existing = localStorage.getItem('contactRecords');
      const records = existing ? JSON.parse(existing) : [];
      records.push(contactRecord);
      localStorage.setItem('contactRecords', JSON.stringify(records));

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData(initialForm);
        setStep(1);
        localStorage.removeItem('lastContactForm');
      }, 3000);
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交失败，请检查网络连接');
      console.error('Form submission error:', err);
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
            <p className="text-blue-100 text-lg leading-relaxed">按业务规模快速登记需求，我们将在 2 小时内给出初步方案建议。</p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">在线咨询</h2>
                <p className="text-sm text-gray-500 mb-6">步骤 {step}/3</p>

                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">提交成功</h3>
                    <p className="text-gray-600">顾问将尽快与您联系，请保持电话畅通。</p>
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
                        <label className="block text-sm font-medium text-gray-700 mb-3">您的身份</label>
                        <div className="grid grid-cols-3 gap-3">
                          {roleOptions.map((role) => (
                            <button
                              key={role}
                              type="button"
                              onClick={() => setFormData({ ...formData, role })}
                              className={`rounded-xl border px-3 py-3 text-sm ${
                                formData.role === role ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-200 text-gray-700'
                              }`}
                            >
                              {role}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {step === 2 && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">每月结算人数</label>
                          <Input name="monthlyWorkers" value={formData.monthlyWorkers} onChange={handleInputChange} placeholder="例如：500" className="rounded-xl" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">行业类型</label>
                          <div className="grid grid-cols-3 gap-3">
                            {industryOptions.map((item) => (
                              <button
                                key={item}
                                type="button"
                                onClick={() => setFormData({ ...formData, industry: item })}
                                className={`rounded-xl border px-3 py-3 text-sm ${
                                  formData.industry === item ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-200 text-gray-700'
                                }`}
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      </>
                    )}

                    {step === 3 && (
                      <>
                        <div className="grid md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                            <Input name="name" placeholder="请输入您的姓名" className="rounded-xl" value={formData.name} onChange={handleInputChange} required disabled={loading} />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">电话</label>
                            <Input name="phone" placeholder="请输入您的电话" className="rounded-xl" value={formData.phone} onChange={handleInputChange} required disabled={loading} />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                          <Input name="email" placeholder="请输入您的邮箱" className="rounded-xl" value={formData.email} onChange={handleInputChange} type="email" disabled={loading} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">公司名称</label>
                          <Input name="company" placeholder="请输入您的公司名称" className="rounded-xl" value={formData.company} onChange={handleInputChange} disabled={loading} />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">咨询内容</label>
                          <Textarea name="message" placeholder="请描述您的需求或问题" className="rounded-xl min-h-[120px]" value={formData.message} onChange={handleInputChange} required disabled={loading} />
                        </div>
                      </>
                    )}

                    <div className="flex gap-3">
                      {step > 1 && (
                        <Button type="button" variant="outline" className="rounded-xl" onClick={() => setStep(step - 1)}>
                          上一步
                        </Button>
                      )}

                      {step < 3 ? (
                        <Button type="button" className="ml-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl" onClick={() => stepValid && setStep(step + 1)}>
                          下一步
                        </Button>
                      ) : (
                        <Button type="submit" className="ml-auto bg-blue-600 hover:bg-blue-700 text-white rounded-xl" disabled={loading || !stepValid}>
                          {loading ? '提交中...' : (<><Send className="w-4 h-4 mr-2" />提交咨询</>)}
                        </Button>
                      )}
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">服务承诺与联系方式</h2>

              <div className="grid sm:grid-cols-3 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <Timer className="w-6 h-6 text-blue-600 mb-2" />
                  <p className="font-semibold text-gray-900">2小时响应</p>
                  <p className="text-xs text-gray-500 mt-1">工作时段内快速回访</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <FileLock2 className="w-6 h-6 text-blue-600 mb-2" />
                  <p className="font-semibold text-gray-900">支持保密协议</p>
                  <p className="text-xs text-gray-500 mt-1">可签署对公NDA</p>
                </div>
                <div className="bg-white rounded-2xl p-4 border border-gray-100">
                  <ShieldCheck className="w-6 h-6 text-blue-600 mb-2" />
                  <p className="font-semibold text-gray-900">合规全流程</p>
                  <p className="text-xs text-gray-500 mt-1">流程留痕可追溯</p>
                </div>
              </div>

              <div className="space-y-6">
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
