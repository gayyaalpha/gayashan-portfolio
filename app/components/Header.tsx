export function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
          {/* <div>
            <div className="text-lg font-bold text-gray-900">Gayashan Dewanarayana</div>
            <div className="text-sm text-gray-500">AI Engineer</div>
          </div> */}
          <nav className="flex items-center space-x-6 text-sm text-gray-700 font-medium">
            <a href="#projects" className="hover:text-blue-500">Projects</a>
            <a href="#skills" className="hover:text-blue-500">Skills</a>
            <a href="#credentials" className="hover:text-blue-500">Credentials</a>
            <a href="#contact" className="hover:text-blue-500">Contact</a>
            <a
              href="/assets/Gayashan_Resume.pdf"
              className="bg-blue-500 text-white px-4 py-1.5 rounded-full text-sm hover:bg-blue-600 transition"
            >
              📄 Resume
            </a>
          </nav>
        </div>
      </header>
      
    );
  }
  