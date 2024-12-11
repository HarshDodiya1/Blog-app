export function About() {
  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            About Quillier
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
        </div>

        {/* Content Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Mission Card */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
              <svg
                className="w-10 h-10 text-purple-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Our Mission
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Welcome to this website! This platform is a combination of my
              professional journey and a space where I aim to share insights,
              projects, achievements, and valuable information. My motivation
              behind this website is to create a platform for sharing knowledge
              and connecting with individuals.
            </p>
          </div>

          {/* Content Card */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
              <svg
                className="w-10 h-10 text-pink-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              What You'll Find
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              On this website, you'll find a variety of content ranging from
              updates on my current projects to insights gained from my
              experiences. I'll be sharing achievements, recent discoveries, and
              information I believe will be beneficial to others as well.
            </p>
          </div>

          {/* Engagement Card */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
              <svg
                className="w-10 h-10 text-indigo-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Let's Connect
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              I invite you to explore the content on this website and engage
              with it. Whether it's reading articles, leaving comments, or
              reaching out to connect. Feel free to connect with me on other
              platforms to stay updated on my latest endeavors and insights.
            </p>
          </div>

          {/* Thank You Card */}
          <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="mb-4">
              <svg
                className="w-10 h-10 text-teal-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
              Thank You
            </h2>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              Thank you for visiting my website and taking the time to learn
              about my project. I hope you find the content valuable and that
              you'll continue to engage with it in the future.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
