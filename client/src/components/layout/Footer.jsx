const Footer = () => {
  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-gray-400 text-sm">
              Data provided by{' '}
              <a
                href="https://api.nasa.gov/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-space-400 hover:text-space-300 transition-colors"
              >
                NASA API
              </a>
            </p>
          </div>
          <div className="text-center md:text-right">
            <p className="text-gray-500 text-sm">
              Built with React, Vite & Tailwind CSS
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
