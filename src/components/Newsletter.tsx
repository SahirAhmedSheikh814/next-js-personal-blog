export function Newsletter() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-8 mb-12">
      <div className="xs:flex xs:flex-col text-center max-w-xl mx-auto">
        <h3 className="text-2xl font-bold mb-4">Sign up for our newsletter</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Get notified of the best deals on our WordPress themes
        </p>
        <form className="flex flex-col md:flex-row gap-2 md:gap-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            aria-label="Subscribe to the newsletter"
            title="Subscribe to the newsletter"
          >
            Subscribe
          </button>
        </form>
      </div>
    </div>
  );
}
