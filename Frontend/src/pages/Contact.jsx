import React from "react";

const Contact = () => {
  return (
    <div className="w-full px-4 md:px-0">
      {/* Contact Heading */}
      <div className="text-center py-10 px-4">
        <h2 className="text-5xl font-bold">Contact Us</h2>
        <p className="text-gray-600 mt-3">
          Have questions or feedback? Reach out to us by filling out the form below.
        </p>
      </div>

      {/* Contact Form + Image */}
      <div className="relative flex flex-col md:flex-row w-full max-w-6xl mx-auto px-4 py-10 bg-[#f7f5f1] rounded-xl border border-gray-300">
        {/* Left Section: Form */}
        <div className="w-full md:w-1/2 px-6 py-6 space-y-6">
          <p className="text-sm font-medium text-gray-800">
            Feel free to message us with any questions or concerns.
          </p>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="sr-only">Name</label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
            <div>
              <label htmlFor="message" className="sr-only">Message</label>
              <textarea
                id="message"
                placeholder="Message"
                className="w-full px-4 py-2 border rounded-xl h-28 resize-none focus:outline-none focus:ring-2 focus:ring-black"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-full hover:opacity-90 transition-opacity"
            >
              SEND
            </button>
          </form>
        </div>

        {/* Right Section: Image */}
        <div className="hidden md:flex absolute -right-20 bottom-0 w-full md:w-1/2  items-center justify-center px-6 mt-10 md:mt-0">
          <img
            src="/model.png"
            alt="Contact Visual"
            className="w-full max-h-[450px] object-contain"
          />
        </div>
      </div>

      {/* Embedded Map */}
      <div className="w-full my-10">
        <iframe
          title="Our Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3172.123487178202!2d-122.03250868468843!3d37.368830979834754!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808fb64b7e6b6bdf%3A0x98cf8ae1d1a5ea4b!2s123%20Oak%20Ave%2C%20Sunnyvale%2C%20CA%2094085%2C%20USA!5e0!3m2!1sen!2sin!4v1722064820404"
          width="100%"
          height="500"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-[500px] rounded-lg"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;
