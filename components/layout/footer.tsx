import Link from 'next/link';
import { CarIcon } from 'lucide-react';
import Logo from '../common/logo';

// Define sections as a constant
const sections = [
  {
    title: 'Quy định sử dụng',
    links: [
      { name: 'Quy định sử dụng dịch vụ', href: '/terms-of-service' },
      { name: 'Quyền và nghĩa vụ các bên', href: '/rights-obligations' },
      { name: 'Chính sách xử lý vi phạm', href: '/violation-policy' },
    ],
  },
  {
    title: 'Chính sách bảo mật',
    links: [
      { name: 'Trang chính sách bảo mật', href: '/privacy-policy' },
      { name: 'Cách thu thập và sử dụng dữ liệu', href: '/data-collection' },
      { name: 'Quyền riêng tư người dùng', href: '/user-privacy' },
      { name: 'Bảo mật thông tin', href: '/information-security' },
    ],
  },
  {
    title: 'Hỗ trợ',
    links: [
      { name: 'Liên hệ', href: '/contact' },
      { name: 'Câu hỏi thường gặp', href: '/faq' },
      { name: 'Hỗ trợ trực tuyến', href: '/support' },
    ],
  },
  {
    title: 'Về chúng tôi',
    links: [
      { name: 'Giới thiệu', href: '/about' },
      { name: 'Đội ngũ', href: '/team' },
      { name: 'Tin tức', href: '/news' },
    ],
  },
];

export default function Footer() {
  return (
    <footer className='bg-white border-t border-gray-200'>
      <div className='container mx-auto py-16'>
        <div className='space-y-8 px-4 sm:px-6 lg:space-y-16 lg:px-8'>
          <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
            {/* Logo and Description */}
            <div>
              <Logo />
              <p className='mt-4 max-w-xs text-gray-600 leading-relaxed'>
                Nền tảng quản lý và phân tích dữ liệu hiện đại, giúp doanh nghiệp đưa ra quyết định thông minh và hiệu quả.
              </p>
            </div>

            {/* Footer Sections */}
            <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4'>
              {sections.map((section, idx) => (
                <div key={idx}>
                  <h3 className='font-semibold text-gray-900 mb-4'>{section.title}</h3>
                  <ul className='space-y-3'>
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <Link 
                          href={link.href} 
                          className='text-gray-600 hover:text-gray-900 transition-colors duration-200 text-sm leading-relaxed block'
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Copyright */}
          <div className='pt-8 border-t border-gray-200'>
            <p className='text-sm text-gray-500 text-center'>
              © 2025 Dashspace. Tất cả quyền được bảo lưu.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}