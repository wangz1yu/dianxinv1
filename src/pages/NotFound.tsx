import { Link } from 'react-router-dom';
import Navbar from '@/sections/Navbar';
import Footer from '@/sections/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-32 pb-16 bg-gray-100">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900">404</h1>
          <p className="mt-4 text-gray-600">
            无效的页面地址。请检查链接或返回
            <Link to="/" className="text-blue-600 underline">
              首页
            </Link>
            。
          </p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
