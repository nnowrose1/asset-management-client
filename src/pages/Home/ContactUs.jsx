import React, { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="w-full text-secondary">
      {/* HERO SECTION */}
      <section className="w-full bg-primary text-white py-16 px-6 text-center">
        <h1 className="text-4xl font-bold mb-4">Contact AssetNexus</h1>
        <p className="max-w-3xl mx-auto text-lg opacity-90">
          Have questions, feedback, or just want to say hi? Fill out the form below and we’ll get back to you shortly.
        </p>
      </section>

      {/* CONTACT INFO STRIP */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="flex flex-col items-center gap-2">
            <FaPhoneAlt className="text-primary text-4xl mb-2" />
            <p className="text-accent">+8801234-567891</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaEnvelope className="text-primary text-4xl mb-2" />
            <p className="text-accent">support@assetnexus.com</p>
          </div>
          <div className="flex flex-col items-center gap-2">
            <FaMapMarkerAlt className="text-primary text-4xl mb-2" />
            <p className="text-accent">Dhaka, Bangladesh</p>
          </div>
        </div>
      </section>

      {/* CONTACT FORM */}
      <section className="py-16 px-6">
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-semibold mb-6 text-center text-primary">
            Send Us a Message
          </h2>

          {submitted ? (
            <p className="text-center text-green-600 font-medium text-lg">
              ✔️ Your message has been submitted successfully!
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Full Name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Email Address"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <input
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
                placeholder="Subject"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <textarea
                name="message"
                rows="5"
                value={formData.message}
                onChange={handleChange}
                required
                placeholder="Your message..."
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="w-full bg-primary text-white font-semibold py-2 rounded-lg hover:bg-primary-dark transition"
              >
                Send Message
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
