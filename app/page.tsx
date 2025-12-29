'use client';

import { useState } from 'react';
import { Analytics } from "@vercel/analytics/next"
import { BookOpen, Download, Mail, FileText, ChevronDown, ChevronUp, Clock } from 'lucide-react';

export default function Home() {
  const [expandedSubject, setExpandedSubject] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactSubject, setContactSubject] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const subjects = [
    { id: 1, code: 'BCS701', name: 'Internet of Things', modules: 5, available: true },
    { id: 2, code: 'BCS702', name: 'Parallel Computing', modules: 5, available: true },
    { id: 3, code: 'BCS703', name: 'Cryptography and Network Security', modules: 5, available: true },
    { id: 4, code: 'BCS714D', name: 'Big Data Analytics', modules: 5, available: true },
    { id: 5, code: 'BME755D', name: 'Non-Conventional Energy Resources', modules: 5, available: false }
  ];

  const toggleSubject = (id) => {
    setExpandedSubject(expandedSubject === id ? null : id);
  };

  const handleDownload = (code, num) => {
    const link = document.createElement('a');
    link.href = `/pdfs/${code}_Module${num}.pdf`;
    link.download = `${code}_Module${num}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleContactSubmit = () => {
    if (!contactSubject.trim() || !contactMessage.trim()) {
      alert('Please fill in both fields');
      return;
    }
    window.location.href = `mailto:bollugunawanth@gmail.com?subject=${encodeURIComponent(contactSubject)}&body=${encodeURIComponent(contactMessage)}`;
    setContactSubject('');
    setContactMessage('');
    setShowContactForm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-md">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Semester Study Materials</h1>
              <p className="text-gray-600 text-sm mt-1">Your one-stop resource for exam preparation</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-600" />
            Available Subjects
          </h2>
          <p className="text-gray-600 mb-6">Click on any subject to view and download module-wise PDFs</p>

          <div className="space-y-4">
            {subjects.map((subject) => (
              <div key={subject.id} className="border border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSubject(subject.id)}
                  className="w-full px-6 py-4 bg-gradient-to-r from-indigo-50 to-blue-50 hover:from-indigo-100 hover:to-blue-100 transition-colors flex items-center justify-between"
                >
                  <div className="text-left flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-800">{subject.name}</h3>
                      {!subject.available && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                          <Clock className="w-3 h-3" />
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600">{subject.code}</p>
                  </div>
                  {expandedSubject === subject.id ? (
                    <ChevronUp className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-indigo-600" />
                  )}
                </button>

                {expandedSubject === subject.id && (
                  <div className="px-6 py-4 bg-white">
                    {subject.available ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                        {Array.from({ length: subject.modules }, (_, i) => i + 1).map((moduleNum) => (
                          <button
                            key={moduleNum}
                            onClick={() => handleDownload(subject.code, moduleNum)}
                            className="flex items-center justify-between px-4 py-3 bg-white border-2 border-indigo-200 rounded-lg hover:bg-indigo-50 hover:border-indigo-400 transition-all group"
                          >
                            <span className="font-medium text-gray-700 group-hover:text-indigo-700">
                              Module {moduleNum}
                            </span>
                            <Download className="w-5 h-5 text-indigo-600 group-hover:text-indigo-700" />
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Clock className="w-12 h-12 text-amber-500 mx-auto mb-3" />
                        <h4 className="text-lg font-semibold text-gray-700 mb-2">Materials Coming Soon</h4>
                        <p className="text-gray-600 mb-4">
                          PDFs for this subject are being prepared and will be uploaded shortly.
                        </p>
                        <p className="text-sm text-gray-500">
                          Check back soon or contact the owner if you have materials to share!
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 rounded-r-lg mb-8">
          <p className="text-indigo-900">
            <strong>📚 All the best for your exams!</strong> These materials are provided to help you prepare effectively. 
            If you have any handwritten notes or suggestions, feel free to reach out.
          </p>
        </div>
      </main>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-3">About</h3>
              <p className="text-gray-300">
                This portal is created to help students access study materials easily. 
                All resources are organized by subject and module for your convenience.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-3">Contact & Contributions</h3>
              <p className="text-gray-300 mb-4">
                Have handwritten notes to share? Want to contribute materials? Get in touch!
              </p>
              {!showContactForm ? (
                <button
                  onClick={() => setShowContactForm(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Contact Owner
                </button>
              ) : (
                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Subject"
                    value={contactSubject}
                    onChange={(e) => setContactSubject(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                  />
                  <textarea
                    placeholder="Your message..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-indigo-500"
                    style={{ minHeight: '100px' }}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={handleContactSubmit}
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                    >
                      Send Email
                    </button>
                    <button
                      onClick={() => setShowContactForm(false)}
                      className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              <div className="mt-4 text-gray-400 text-sm">
                <p>Owner: Gunawanth B</p>
                <p>Email: bollugunawanth@gmail.com</p>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>Made with ❤️ for classmates | Good luck with your exams! 🎓</p>
          </div>
        </div>
      </footer>
    </div>
  );
}