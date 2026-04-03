import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0d1f35] to-[#1a365d] pt-24 pb-16">
      {/* Background animation particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.1, 0.5, 0.1],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 1.5,
            }}
          />
        ))}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center lg:text-left">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm mb-6">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            智能用工新时代
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            灵活用工
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              智领未来
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
            为企业提供一站式灵活用工解决方案，从用工匹配、智能结算到保险保障，
            助力企业降本增效，让用工更简单。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
              <a href="https://oss.dianxin.love/%E7%82%B9%E8%96%AA%E7%81%B5%E5%B7%A5%E4%B8%80%E7%AB%99%E5%BC%8F%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.pdf" target="_blank" rel="noopener noreferrer">下载解决方案</a>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-white border-transparent text-black hover:bg-white/90 rounded-full px-8"
            >
              <a href="https://oss.dianxin.love/video/cjrw.mp4" target="_blank" rel="noopener noreferrer">
                <Play className="mr-2 w-4 h-4" /> 观看演示
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-white mb-10">
          <div>
            <div className="text-3xl md:text-4xl font-bold">3000+</div>
            <div className="text-sm text-gray-300">服务企业</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold">20万+</div>
            <div className="text-sm text-gray-300">注册人才</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-bold">20亿+</div>
            <div className="text-sm text-gray-300">年发薪额</div>
          </div>
        </div>

        <div className="relative w-full h-72 md:h-80 lg:h-96 overflow-hidden rounded-3xl border border-white/10 shadow-2xl">
          <video
            src="https://oss.dianxin.love/hero.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            onError={(e) => {
              console.error('Video failed to load:', e);
              e.currentTarget.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black/45" />
        </div>
      </div>
    </section>
  );
}
