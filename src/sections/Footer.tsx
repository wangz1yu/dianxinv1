import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

const footerLinks = {
  company: {
    title: '公司',
    links: [
      { label: '关于我们', href: '/about/company' },
      { label: '发展历程', href: '/about/history' },
      { label: '联系我们', href: '/about/contact' },
    ],
  },
  products: {
    title: '产品',
    links: [
      { label: '灵工结算', href: '/services/settlement' },
      { label: '日结保险', href: '/services/insurance' },
      { label: '用工招聘', href: '/services/recruitment' },
    ],
  },
  solutions: {
    title: '解决方案',
    links: [
      { label: '外卖配送', href: '/solutions/delivery' },
      { label: '网约车', href: '/solutions/ride' },
      { label: '家政服务', href: '/solutions/housekeeping' },
      { label: '电商物流', href: '/solutions/logistics' },
    ],
  },
};

export default function Footer() {
  return (
    <footer className="bg-[#0A1628] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
          {/* Logo & Description */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">点</span>
              </div>
              <span className="text-xl font-bold">点薪云</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6 max-w-xs">
              为企业提供一站式灵活用工解决方案，助力企业降本增效。
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Phone className="w-4 h-4" />
                <span>400-888-8888</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                <span>service@dianxin.cloud</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                <span>安徽省合肥市高新区</span>
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold text-white mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      to={link.href}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <span>© 2024 点薪云</span>
              <Link to="/terms" className="hover:text-white transition-colors">使用条款</Link>
              <Link to="/privacy" className="hover:text-white transition-colors">隐私政策</Link>
            </div>
            
            {/* Language Selector */}
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="hover:text-white cursor-pointer transition-colors">EN</span>
              <span className="hover:text-white cursor-pointer transition-colors">繁體</span>
              <span className="text-white cursor-pointer">简体</span>
            </div>
          </div>
        </div>
      </div>

      {/* Large Decorative Text */}
      <div className="relative h-24 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 text-[8rem] md:text-[12rem] font-bold text-gray-800/30 whitespace-nowrap leading-none text-center select-none">
          点薪云 DIANXINYUN
        </div>
      </div>
    </footer>
  );
}
