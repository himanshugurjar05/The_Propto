import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-4">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm text-gray-600">
        
        {/* Left Section */}
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <p>© 2025 The Propto, Inc.</p>
          <span className="hidden md:inline">·</span>
          <a href="#" className="hover:underline">Privacy</a>
          <span className="hidden md:inline">·</span>
          <a href="#" className="hover:underline">Terms</a>
          <span className="hidden md:inline">·</span>
          <a href="#" className="hover:underline">Sitemap</a>
          <span className="hidden md:inline">·</span>
          <a href="#" className="hover:underline">Company details</a>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4 mt-2 md:mt-0">
          {/* Language */}
          <div className="flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 0a10 10 0 100 20A10 10 0 0010 0zm.75 14.5h-1.5v-1.5h1.5V14.5zm0-3h-1.5V5h1.5v6.5z"/>
            </svg>
            <span>English (IN)</span>
          </div>

          {/* Currency */}
          <div className="flex items-center space-x-1">
            <span>₹</span>
            <span>INR</span>
          </div>

          {/* Icons */}
          <a href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4zm2 2v12h12V6H6z"/></svg></a> {/* Email */}
          <a href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6.62 10.79a15.916 15.916 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.21c1.21.49 2.54.76 3.9.76a1 1 0 011 1V20a1 1 0 01-1 1C10.4 21 3 13.6 3 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.36.27 2.69.76 3.9a1 1 0 01-.21 1.11l-2.2 2.2z"/></svg></a> {/* Phone */}
          <a href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12a10 10 0 11-20 0 10 10 0 0120 0zM9 8v8l7-4-7-4z"/></svg></a> {/* Facebook */}
          <a href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M5 3h14a2 2 0 012 2v14l-4-4H5a2 2 0 01-2-2V5a2 2 0 012-2z"/></svg></a> {/* X/Twitter */}
          <a href="#"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M7 2C4.243 2 2 4.243 2 7s2.243 5 5 5 5-2.243 5-5S9.757 2 7 2zm0 8C5.346 10 4 8.654 4 7s1.346-3 3-3 3 1.346 3 3-1.346 3-3 3zm10.5-2a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/></svg></a> {/* Instagram */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
