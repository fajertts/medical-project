const About = () => {
  return (
    <section className="relative  h-screen flex">
      
      <div className=" absolute inset-0 bg-[url('https://wallpapers.com/images/hd/dentist-s-dental-tools-hf5tfhuaco0o9msr.jpg')] bg-cover bg-center">
        
        {/* 👇 هذا هو الشادو كـ overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

      </div>

      {/* المحتوى */}
      <div className="relative z-10 p-6">
        <h1 className="text-5xl font-bold  text-black py-8">
          who we are and what we do
        </h1>

        <p className="text-xl  text-black py-8">
          We are a medical center dedicated to providing high-quality healthcare services...
        </p>
      </div>

    </section>
  )
}
export default About;