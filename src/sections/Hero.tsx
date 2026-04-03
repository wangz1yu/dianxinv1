import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  return (
    <section className="relative overflow-hidden h-screen min-h-[800px]">
      {/* 视频背景 */}
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

      {/* 黑色遮罩+粒子背景 */}
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(18)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/30 rounded-full"
            style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 6 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 1.5 }}
          />
        ))}
      </div>

      {/* 内容浮层 */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center lg:text-left text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-300/30 rounded-full text-blue-100 text-sm mb-6">
            <span className="w-2 h-2 bg-blue-300 rounded-full animate-pulse" />
            智能用工新时代
          </div>
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            灵活用工
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">智领未来</span>
          </h1>
          <p className="text-lg md:text-xl text-blue-100/90 max-w-2xl mb-8">
            为企业提供一站式灵活用工解决方案，从用工匹配、智能结算到保险保障，
            助力企业降本增效，让用工更简单。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
              <a href="https://oss.dianxin.love/%E7%82%B9%E8%96%AA%E7%81%B5%E5%B7%A5%E4%B8%80%E7%AB%99%E5%BC%8F%E8%A7%A3%E5%86%B3%E6%96%B9%E6%A1%88.pdf" target="_blank" rel="noopener noreferrer">
                下载解决方案
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-white/90 border-white/40 text-black hover:bg-white/95 rounded-full px-8">
              <a href="https://oss.dianxin.love/video/cjrw.mp4" target="_blank" rel="noopener noreferrer">
                <Play className="mr-2 w-4 h-4" /> 观看演示
              </a>
            </Button>
          </div>
        </div>
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-white">
          <div>
            <div className="text-4xl md:text-5xl font-bold">3000+</div>
            <div className="text-sm text-blue-100/80">服务企业</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold">20万+</div>
            <div className="text-sm text-blue-100/80">注册人才</div>
          </div>
          <div>
            <div className="text-4xl md:text-5xl font-bold">20亿+</div>
            <div className="text-sm text-blue-100/80">年发薪额</div>
          </div>
        </div>
      </div>
    </section>
  );
}


