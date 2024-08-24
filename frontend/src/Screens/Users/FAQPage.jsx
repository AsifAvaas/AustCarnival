import React from "react";
import "../../CSS/FAQPage.css";

const FAQPage = () => {
  const faqs = [
    {
      question: "How do I register for an event?",
      answer:
        "To register for an event, simply navigate to the event list, select the event you're interested in, and fill out the registration form with the required details.",
    },
    {
      question: "Can I register for multiple events?",
      answer:
        "Yes, you can register for as many events as you like. Each event requires a separate registration form to be filled out.",
    },
    {
      question: "How do I know if my registration was successful?",
      answer:
        "After submitting the registration form, you will receive a confirmation message on the screen. Additionally, you can check your registered events in your profile section.",
    },
    {
      question: "Can I edit my registration details after submitting?",
      answer:
        "Once registered, you can edit your details by navigating to the event page and selecting the 'Edit Registration' option. Make sure to save your changes.",
    },
    {
      question: "Is there a fee to participate in the events?",
      answer:
        "Some events may have a participation fee, while others are free. The fee details, if applicable, will be mentioned on the event registration page.",
    },
    {
      question: "How can I join a workshop?",
      answer:
        "To join a workshop, go to the workshop section, select the workshop you're interested in, and follow the instructions to join. You may need to register similarly to how you register for events.",
    },
    {
      question: "Can I attend multiple workshops?",
      answer:
        "Yes, you are welcome to join multiple workshops. Each workshop has its own registration process.",
    },
    {
      question: "What should I do if I face issues during registration?",
      answer:
        "If you encounter any problems while registering, you can contact our support team via the 'Contact Us' page, or refer to the help section for common issues and solutions.",
    },
    {
      question: "How can I view the events I have registered for?",
      answer:
        "You can view all the events you have registered for by going to your profile page. There, you'll find a list of your registered events along with the details.",
    },
    {
      question: "Can I cancel my registration for an event or workshop?",
      answer:
        "Yes, you can cancel your registration by visiting the event or workshop page and selecting the 'Cancel Registration' option. Please note that cancellation policies may vary depending on the event or workshop.",
    },
  ];

  return (
    <div className="faq-page">
      <h1>Frequently Asked Questions</h1>
      <div className="faqs">
        {faqs.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3>{faq.question}</h3>
            <p>{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQPage;
