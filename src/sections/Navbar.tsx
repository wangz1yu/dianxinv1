import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { label: '首页', href: '/' },
  { 
    label: '产品服务', 
    href: '/services',
    children: [
      { label: '灵工结算', href: '/services/settlement' },
      { label: '日结保险', href: '/services/insurance' },
      { label: '用工招聘', href: '/services/recruitment' },
    ]
  },
  { 
    label: '解决方案', 
    href: '/solutions',
    children: [
      { label: '外卖配送', href: '/solutions/delivery' },
      { label: '网约车', href: '/solutions/ride' },
      { label: '家政服务', href: '/solutions/housekeeping' },
      { label: '电商物流', href: '/solutions/logistics' },
    ]
  },
  { 
    label: '关于我们', 
    href: '/about',
    children: [
      { label: '公司介绍', href: '/about/company' },
      { label: '发展历程', href: '/about/history' },
      { label: '联系我们', href: '/about/contact' },
    ]
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 py-4">
      <div className={`mx-auto max-w-6xl transition-all duration-300 ${
        isScrolled ? 'pt-2' : 'pt-4'
      }`}>
        <nav 
          className={`flex items-center justify-between px-6 py-3 bg-white/95 backdrop-blur-md rounded-full shadow-lg transition-all duration-300 ${
            isScrolled ? 'shadow-xl' : ''
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/favicon.png" 
              alt="点薪云" 
              className="w-8 h-8 object-contain"
            />
            <span className="text-lg font-bold text-gray-900">点薪云</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <div 
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setActiveDropdown(item.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={item.href}
                  className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  {item.label}
                  {item.children && (
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                      activeDropdown === item.label ? 'rotate-180' : ''
                    }`} />
                  )}
                </Link>
                
                {/* Dropdown */}
                {item.children && activeDropdown === item.label && (
                  <div className="absolute top-full left-0 pt-2">
                    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-2 min-w-[180px] overflow-hidden">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="ghost" className="text-gray-700 hover:text-blue-600">
              登录
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-6">
              联系我们
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
            <div className="p-4 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    to={item.href}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                      isActive(item.href)
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    onClick={() => !item.children && setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                  {item.children && (
                    <div className="ml-4 mt-1 space-y-1">
                      {item.children.map((child) => (
                        <Link
                          key={child.label}
                          to={child.href}
                          className="block px-4 py-2 text-sm text-gray-600 hover:text-blue-600"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-4 border-t border-gray-100 flex gap-3">
                <Button variant="outline" className="flex-1 rounded-full">
                  登录
                </Button>
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                  联系我们
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
