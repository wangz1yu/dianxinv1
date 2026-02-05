import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const clients = [
  { name: '美团', logo: '/images/logo-meituan.jpg' },
  { name: '饿了么', logo: '/images/logo-eleme.jpg' },
  { name: '滴滴', logo: '/images/logo-didi.jpg' },
  { name: '京东', logo: '/images/logo-jd.jpg' },
  { name: '顺丰', logo: '/images/logo-shunfeng.jpg' },
  { name: '盒马', logo: '/images/logo-hema.jpg' },
  { name: '叮咚买菜', logo: '/images/logo-ddmc.jpg' },
  { name: '达达', logo: '/images/logo-dada.jpg' },
  { name: '闪送', logo: '/images/logo-shansong.jpg' },
  { name: 'UU跑腿', logo: '/images/logo-uu.jpg' },
  { name: '曹操出行', logo: '/images/logo-caocao.jpg' },
  { name: 'T3出行', logo: '/images/logo-t3.jpg' },
  { name: '货拉拉', logo: '/images/logo-huolala.jpg' },
  { name: '菜鸟', logo: '/images/logo-cainiao.jpg' },
  { name: '蜂鸟众包', logo: '/images/logo-fengniao.jpg' },
];

// 复制多份确保无缝循环
const duplicatedClients = [...clients, ...clients, ...clients];

export default function Clients() {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            我们的客户
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            自2016年以来，以智能用工赋能行业领先品牌增长
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
            立即咨询
          </Button>
        </motion.div>

        {/* Client Logos - Infinite Scroll */}
        <div className="relative">
          {/* Gradient Masks */}
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling Container */}
          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: ['0%', '-33.33%'] }}
              transition={{
                duration: 40,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="flex gap-6"
            >
              {duplicatedClients.map((client, index) => (
                <div
                  key={`scroll-${index}`}
                  className="flex-shrink-0 w-20 h-20 bg-white rounded-xl flex items-center justify-center hover:shadow-lg transition-all group border border-gray-100 overflow-hidden"
                >
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Second Row - Reverse Direction */}
        <div className="relative mt-6">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex overflow-hidden">
            <motion.div
              animate={{ x: ['-33.33%', '0%'] }}
              transition={{
                duration: 45,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="flex gap-6"
            >
              {[...duplicatedClients].reverse().map((client, index) => (
                <div
                  key={`scroll-reverse-${index}`}
                  className="flex-shrink-0 w-20 h-20 bg-white rounded-xl flex items-center justify-center hover:shadow-lg transition-all group border border-gray-100 overflow-hidden"
                >
                  <img 
                    src={client.logo} 
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
