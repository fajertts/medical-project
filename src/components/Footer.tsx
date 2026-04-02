

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-8">

        {/* 🦷 Logo / About */}
        <div>
          <h2 className="text-2xl font-bold mb-4">SmileCare</h2>
          <p className="text-sm text-gray-300">
            نقدم أفضل خدمات طب الأسنان بأحدث التقنيات لضمان ابتسامة صحية وجميلة.
          </p>
        </div>

        {/* 🔗 Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">روابط</h3>
          <ul className="space-y-2 text-gray-300">
            <li className="hover:underline cursor-pointer">الرئيسية</li>
            <li className="hover:underline cursor-pointer">من نحن</li>
            <li className="hover:underline cursor-pointer">الخدمات</li>
            <li className="hover:underline cursor-pointer">تواصل</li>
          </ul>
        </div>

        {/* 🦷 Services */}
        <div>
          <h3 className="text-lg font-semibold mb-4">الخدمات</h3>
          <ul className="space-y-2 text-gray-300">
            <li>تبييض الأسنان</li>
            <li>تقويم الأسنان</li>
            <li>زراعة الأسنان</li>
            <li>تنظيف الأسنان</li>
          </ul>
        </div>

        {/* 📞 Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">تواصل معنا</h3>
          <p className="text-gray-300 text-sm mb-2">📞 123-456-789</p>
          <p className="text-gray-300 text-sm mb-2">📍 دمشق - سوريا</p>
          <p className="text-gray-300 text-sm">✉️ info@smilecare.com</p>
        </div>

      </div>

      {/* 🔽 Bottom */}
      <div className="border-t border-blue-800 mt-10 pt-4 text-center text-gray-400 text-sm">
        © 2026 SmileCare - جميع الحقوق محفوظة
      </div>
    </footer>
  );
};

export default Footer;