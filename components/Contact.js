export default function Contact() {
  return (
    <section>
      <div className=" bg-gray-50 h-12 w-full" />

      <section className="bg-gradient-to-r from-blue-500 to-purple-600 py-16 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Contact Me</h2>
          <div className="space-y-4 text-lg">
            <p>Email: noel.perland@gmail.com </p>
            <p>Phone: +46762633790</p>
          </div>
          <a
            href="mailto:noel.perland@gmail.com"
            className="inline-block bg-white text-blue-600 px-6 py-3 rounded-full font-semibold mt-8 hover:bg-blue-50 transition duration-300"
          >
            Email Me
          </a>
        </div>
      </section>
    </section>
  );
}
