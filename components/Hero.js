export default function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 py-32 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute w-64 h-64 bg-white/10 rounded-full -top-32 -left-32 animate-pulse-slow" />
        <div className="absolute w-48 h-48 bg-white/10 rounded-full bottom-0 -right-24 animate-pulse-slow animation-delay-2000" />
      </div>

      <div className="relative container mx-auto text-center px-4">
        {/* Name with animated gradient */}
        <h1 className="text-6xl md:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-purple-200 animate-gradient-x">
          Noel Perland
        </h1>

        {/* Title with emoji animation */}
        <h2 className="text-4xl font-bold mb-6">
          FullStack Developer{" "}
          <span className="inline-block animate-bounce">🚀</span>
        </h2>

        {/* Skills with hover effects */}
        <div className="max-w-5xl mx-auto mb-12">
          <p className="text-l flex flex-wrap justify-center gap-5">
            <span className="bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 cursor-default">
              Frontend 🔥
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 cursor-default">
              Web Design 🎨
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 cursor-default">
              Project Management 👨‍💻
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 cursor-default">
              Accessibility Focused 🔍
            </span>
            <span className="bg-white/10 px-4 py-2 rounded-full hover:bg-white/20 transition-all duration-300 cursor-default">
              API Enthusiast 🌐
            </span>
          </p>
        </div>

        {/* CTA button with hover animation */}
        <a
          href="#projects"
          className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
        >
          View My Work
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 ml-2 animate-bounce-horizontal"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
