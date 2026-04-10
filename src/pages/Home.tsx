
const Home = () => {
  return (
    <div dir="rtl">
    <div className="bg-white text-gray-800">

      {/* 🔵 Hero Section */}
      <section className="relative h-screen flex items-center justify-center text-center bg-blue-100">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5')] bg-cover bg-center opacity-20"></div>

        <div className="relative z-10 px-6">
          <h1 className="text-5xl font-bold mb-4 text-blue-900">
            ابتسامتك تبدأ من هنا
          </h1>
          <p className="text-lg mb-6">
            أفضل خدمات طب الأسنان بأحدث التقنيات
          </p>

          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition">
            احجز موعد
          </button>
        </div>
      </section>

      {/* 🦷 Services Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">
          خدماتنا
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Card */}
          <div className="p-6 shadow-lg rounded-2xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2"><img src="https://cdn-icons-png.flaticon.com/128/3240/3240139.png " alt="Tooth Brush" className="w-6 h-6 inline-block mr-2" />تنظيف الأسنان</h3>
            <p>تنظيف احترافي للحفاظ على صحة الأسنان واللثة</p>
          </div>

          <div className="p-6 shadow-lg rounded-2xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2"><img src="https://cdn-icons-png.flaticon.com/128/16405/16405926.png" alt="Tooth Brush" className="w-6 h-6 inline-block mr-2" />تبييض الأسنان</h3>
            <p>احصل على ابتسامة ناصعة البياض</p>
          </div>

          <div className="p-6 shadow-lg rounded-2xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-2"><img src="https://cdn-icons-png.flaticon.com/128/3240/3240102.png" alt="Tooth Brush" className="w-6 h-6 inline-block mr-2" />زراعة الأسنان</h3>
            <p>حل دائم لتعويض الأسنان المفقودة</p>
          </div>

        </div>
      </section>

      {/* ⭐ Testimonials */}
      <section className="bg-gray-100 py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          آراء المرضى
        </h2>

        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">

          <div className="p-6 bg-white rounded-xl shadow">
            <p className="mb-3">
              "صلي على صعسلم"
            </p>
            <span className="font-semibold">- أحمد</span>
          </div>

          <div className="p-6 bg-white rounded-xl shadow">
            <p className="mb-3">
              "هات 5 جنيه يا عمم خخخخ"
            </p>
            <span className="font-semibold">- سارة</span>
          </div>

        </div>
      </section>

      {/* 📅 Call To Action */}
      <section className="py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">
          احجز موعدك الآن
        </h2>
        <button className="bg-green-500 text-white px-8 py-3 rounded-xl hover:bg-green-600 transition">
          تواصل معنا
        </button>
      </section>

    </div>
</div>
  );
};

export default Home;