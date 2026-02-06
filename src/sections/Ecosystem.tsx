import { motion } from 'framer-motion';
import { Wallet, Shield, Users, FileText, Clock, Smartphone, TrendingUp, Lock } from 'lucide-react';

const ecosystemItems = [
  { icon: Wallet, label: '智能结算', position: 'top' },
  { icon: Shield, label: '保险保障', position: 'top-right' },
  { icon: Users, label: '人才匹配', position: 'right' },
  { icon: FileText, label: '电子合同', position: 'bottom-right' },
  { icon: Clock, label: '实时到账', position: 'bottom' },
  { icon: Smartphone, label: '移动办公', position: 'bottom-left' },
  { icon: TrendingUp, label: '数据分析', position: 'left' },
  { icon: Lock, label: '安全合规', position: 'top-left' },
];

export default function Ecosystem() {
  return (
    <section className="py-24 bg-[#F5F7FA]">
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
            在点薪云生态中释放潜力
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            全方位的灵活用工服务生态，覆盖用工全流程
          </p>
        </motion.div>

        {/* Ecosystem Visual */}
        <div className="relative max-w-2xl mx-auto aspect-square">
          {/* Center Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
          >
            <div className="w-50 h-50 md:w-40 md:h-40 flex items-center justify-center">
            <img src="https://www.dianxin.love/favicon.png" alt="Logo" className="h-full w-auto" />
            </div>
          </motion.div>

          {/* Orbital Rings */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="absolute inset-0"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] border border-blue-200/50 rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] border border-blue-200/30 rounded-full" />
          </motion.div>

          {/* Orbital Items */}
          {ecosystemItems.map((item, index) => {
            const Icon = item.icon;
            const angle = (index * 360) / ecosystemItems.length;
            const radius = 42;
            
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="absolute"
                style={{
                  top: `${50 - radius * Math.cos((angle * Math.PI) / 180)}%`,
                  left: `${50 + radius * Math.sin((angle * Math.PI) / 180)}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="flex flex-col items-center gap-2 cursor-pointer group"
                >
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center group-hover:shadow-xl group-hover:bg-blue-50 transition-all">
                    <Icon className="w-6 h-6 md:w-7 md:h-7 text-blue-600" />
                  </div>
                  <span className="text-xs md:text-sm text-gray-600 font-medium whitespace-nowrap">
                    {item.label}
                  </span>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-3">结算</h3>
          <p className="text-gray-600 max-w-xl mx-auto">
            我们为线上与线下用工提供全面的结算解决方案，确保企业获得顺畅无缝的用工体验。
          </p>
        </motion.div>
      </div>
    </section>
  );
}
