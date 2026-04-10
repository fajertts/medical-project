const Contact = () => {
  return (
    <section
      id="contact"
      className="bg-white text-white py-20 px-6 z-10 relative"
    >
      <div className="max-w-3xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          
          <h2 className="text-3xl md:text-4xl font-bold text-blue-700 py-10 text-shadow-xl ">
            Get In Touch
          </h2>
        </div>

        {/* Form */}
        <form className="bg-white p-8 rounded-2xl shadow-xl space-y-6">
          
          {/* Email */}
          <div>
            <label className="block text-xl mb-2 text-blue-700 font-bold">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full bg-transparent border border-blue-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-700 transition"
            />
          </div>

          {/* Comment */}
          <div>
            <label className="block text-xl mb-2 text-blue-700 font-bold">
              Comment
            </label>
            <textarea
              rows={5}
              placeholder="Write your message..."
              className="w-full bg-transparent border border-blue-700 rounded-lg px-4 py-3 focus:outline-none focus:border-blue-700 transition resize-none"
            />
          </div>

          {/* Submit (UI فقط) */}
          <button
            type="button"
            className="w-full bg-blue-700 text-white py-3 rounded-full font-medium hover:bg-blue-600 transition cursor-pointer"
          >
            Send Message
          </button >

        </form>
      </div>
             <div className="w-auto h-[2px] bg-blue-700/80 my-8"></div>
    </section>
  );
};

export default Contact;