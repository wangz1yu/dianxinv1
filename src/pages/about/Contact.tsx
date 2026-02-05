import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';
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

interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  company: string;
  message: string;
  timestamp?: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    phone: '',
    email: '',
    company: '',
    message: '',
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [savedRecords, setSavedRecords] = useState<ContactFormData[]>([]);

  useEffect(() => {
   window.scrollTo(0, 0);
    // Load saved records
    const saved = localStorage.getItem('contactRecords');
    if (saved) {
      try {
        setSavedRecords(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load saved records', e);
      }
    }
    
    // Load last form data
    const lastFormData = localStorage.getItem('lastContactForm');
    if (lastFormData) {
      try {
        setFormData(JSON.parse(lastFormData));
      } catch (e) {
        console.error('Failed to load form data', e);
      }
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: value,
    };
    setFormData(newFormData);
    localStorage.setItem('lastContactForm', JSON.stringify(newFormData));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const updatedRecords = [
      ...savedRecords,
      {
        ...formData,
        timestamp: new Date().toISOString(),
      },
    ];
    
    setSavedRecords(updatedRecords);
    localStorage.setItem('contactRecords', JSON.stringify(updatedRecords));
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        company: '',
        message: '',
      });
      localStorage.removeItem('lastContactForm');
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">联系我们</h1>
            <p className="text-blue-100 text-lg leading-relaxed">
              无论您有任何问题或需求，我们的专业团队随时为您服务
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">在线咨询</h2>
                {submitted ? (
                  <div className="py-12 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-green-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">提交成功！</h3>
                    <p className="text-gray-600">我们已收到您的咨询，专业团队将尽快与您联系</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
                        <Input 
                          name="name"
                          placeholder="请输入您的姓名" 
                          className="rounded-xl" 
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">电话</label>
                        <Input 
                          name="phone"
                          placeholder="请输入您的电话" 
                          className="rounded-xl" 
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
                      <Input 
                        name="email"
                        placeholder="请输入您的邮箱" 
                        className="rounded-xl" 
                        value={formData.email}
                        onChange={handleInputChange}
                        type="email"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">公司名称</label>
                      <Input 
                        name="company"
                        placeholder="请输入您的公司名称" 
                        className="rounded-xl" 
                        value={formData.company}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">咨询内容</label>
                      <Textarea 
                        name="message"
                        placeholder="请描述您的需求或问题" 
                        className="rounded-xl min-h-[120px]" 
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-6">
                      <Send className="w-4 h-4 mr-2" />
                      提交咨询
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>

            {/* Contact Info */}
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

              {/* Saved Records */}
              {savedRecords.length > 0 && (
                <div className="bg-blue-50 rounded-2xl p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">联系记录 ({savedRecords.length})</h3>
                  <div className="space-y-3 max-h-80 overflow-y-auto">
                    {savedRecords.map((record, index) => (
                      <div key={index} className="bg-white rounded-xl p-4 text-sm border border-blue-100">
                        <div className="flex justify-between items-start mb-2">
                          <span className="font-semibold text-gray-900">{record.name}</span>
                          <span className="text-xs text-gray-500">
                            {record.timestamp ? new Date(record.timestamp).toLocaleDateString() : ''}
                          </span>
                        </div>
                        <p className="text-gray-600">{record.phone}</p>
                        <p className="text-gray-600 text-xs">{record.company}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
