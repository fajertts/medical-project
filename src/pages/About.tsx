const About = () => {
  return (
     <div dir="rtl">
      <section className="relative flex min-h-screen">
      
      <div className=" absolute inset-0 bg-[url('https://wallpapers.com/images/hd/dentist-s-dental-tools-hf5tfhuaco0o9msr.jpg')] bg-cover bg-center">
        
        {/* 👇 هذا هو الشادو كـ overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

      </div>

      {/* المحتوى */}
      <div className="relative z-10 p-6">
        <h1 className="text-5xl font-bold  text-black py-20 ">
          من نحن و ماذا نفعل؟
        </h1>

        <p className="text-2xl font-bold text-black py-20">
         
          نحن مركز طبي متخصص في طب الأسنان، نقدم خدمات شاملة للحفاظ على صحة فمك وابتسامتك. فريقنا من الأطباء ذوي الخبرة يستخدم أحدث التقنيات لتوفير رعاية عالية الجودة في بيئة مريحة وآمنة.
           هدفنا هو تحسين صحة فمك وتعزيز ثقتك بابتسامتك.
        </p>
      </div>

    </section>
    </div>
  )
}
export default About;