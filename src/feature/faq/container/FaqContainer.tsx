import React from "react";
import { faqdata } from "../data/faqdata";
import FaqList from "../components/FaqList";

const FaqContainer = () => {
  return (
    <section className="min-h-screen bgfaq py-32">
      <div className="mycontainer">
        <h4 className="text-blue-100 mb-10 font-neighbor text-center 2xl:text-6xl lg:text-5xl text-3xl">
          Frequently Asked Question
        </h4>
        <div className="grid grid-cols-1 gap-12 place-items-center">
          {faqdata.map((faq) => (
            <FaqList key={faq.id} faq={faq} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqContainer;
