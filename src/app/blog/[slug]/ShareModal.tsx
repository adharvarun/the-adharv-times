'use client';
import { useState, useEffect } from 'react';
import { FaShare, FaCopy, FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export default function ShareModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="flex justify-start">
        <button
          onClick={() => setIsOpen(true)}
          className="mt-4 px-4 py-2 mb-4 bg-gray-300 text-black rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 font-medium hover:cursor-pointer"
        >
          <FaShare className="text-sm" /> Share Article
        </button>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-xl w-full max-w-md transform transition-all"
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.22, type: 'spring', stiffness: 180 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Share this post</h3>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={url}
                    readOnly
                    className="flex-1 border border-gray-200 rounded-lg px-4 py-2.5 bg-gray-50 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-200"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="bg-gray-900 text-white px-4 py-2.5 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2 min-w-[100px] justify-center"
                  >
                    {copied ? (
                      'Copied!'
                    ) : (
                      <>
                        <FaCopy className="text-sm" /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}