import React, { useState } from "react";

const faqs = [
  {
    question: "What is TRYBE?",
    answer:
      "TRYBE is an urban streetwear movement inspired by street culture, designed for those who lead, not follow.",
  },
  {
    question: "What makes TRYBE different from other streetwear brands?",
    answer:
      "TRYBE is built on raw authenticity. Our designs are born from rebellion, concrete streets, and bold individuality — not trends. Every piece speaks your truth.",
  },
  {
    question: "Can I return or exchange my order?",
    answer:
      "Yes, you can return or exchange items within 14 days of delivery. The product must be unused, in original packaging. For more details, visit our Returns page.",
  },
  {
    question: "Do you offer COD (Cash on Delivery)?",
    answer:
      "Yes, we offer COD for select pin codes in India. Availability will be shown at checkout based on your location.",
  },
  {
    question: "How do I choose my size?",
    answer:
      "Each product page includes a detailed size chart. If you're in-between sizes, we recommend sizing up for an oversized streetwear fit.",
  },
  {
    question: "When will my order ship?",
    answer:
      "Orders are processed within 1-2 business days. You’ll receive tracking details via email once your order ships.",
  },
  {
    question: "Can I cancel my order after placing it?",
    answer:
      "Orders can be canceled within 2 hours of placing them. After that, they’re already in the shipping pipeline and cannot be canceled.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="bg-[#f9f9f9] py-10 md:py-16 px-6 md:px-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10">FAQs</h2>
        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b pb-4">
              <button
                className="w-full text-left flex justify-between items-center text-lg font-medium"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                {faq.question}
                <span>{openIndex === i ? "-" : "+"}</span>
              </button>
              {openIndex === i && (
                <p className="mt-3 text-gray-600">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
