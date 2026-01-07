import React from "react";

const CredentialsSection = () => {
  return (
    <section id="credentials" className="py-16 bg-white text-center">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Credentials</h2>
        {/* <p className="text-gray-600 mb-8 leading-relaxed">
          Here are a few documents that validate my academic background and experience.
        </p> */}

        <div className="flex flex-wrap justify-center gap-4">
          <a
            href="/assets/Gayashan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition font-medium"
          >
            📌 Resume
          </a>
          <a
            href="/assets/Gayashan_Degree.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition font-medium"
          >
            🎓 Degree Certificate
          </a>
          <a
            href="/assets/Gayashan_Transcript.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-5 py-2.5 border border-gray-300 text-gray-700 rounded-full hover:bg-gray-100 transition font-medium"
          >
            📄 Academic Transcript
          </a>
        </div>
      </div>
    </section>
  );
};

export default CredentialsSection;
