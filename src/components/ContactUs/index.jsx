'use client';
import { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/contact/`, form);
      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    }
  };

  return (
    <section className="px-4 py-12 sm:px-8 lg:px-24 bg-white dark:bg-blacksection">
      <div className="max-w-2xl mx-auto bg-gray-50 dark:bg-gray-800 p-8 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-black dark:text-white mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-1 font-medium text-black dark:text-white">Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-md border border-gray-300 dark:border-strokedark p-3 bg-white dark:bg-blacksection text-black dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-black dark:text-white">Email</label>
            <input
              type="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-md border border-gray-300 dark:border-strokedark p-3 bg-white dark:bg-blacksection text-black dark:text-white"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-black dark:text-white">Message</label>
            <textarea
              required
              rows="5"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full rounded-md border border-gray-300 dark:border-strokedark p-3 bg-white dark:bg-blacksection text-black dark:text-white"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-500 transition"
          >
            {status === 'sending' ? 'Sending...' : 'Send'}
          </button>
          {status === 'success' && (
            <p className="text-green-600 mt-2">Message sent successfully!</p>
          )}
          {status === 'error' && (
            <p className="text-red-600 mt-2">Something went wrong. Please try again.</p>
          )}
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
