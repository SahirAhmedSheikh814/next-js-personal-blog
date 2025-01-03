import SectionHeading from "@/components/Helper/SectionHeading";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { client } from "@/sanity/lib/client";
import { groq } from "next-sanity";

interface Faq {
  _id: string;
  question: string;
  answer: string;
}

async function getFaqs() {
  const query = groq`*[_type == "faq"] | order(_createdAt desc) {
    _id,
    question,
    answer
  }`;
  return client.fetch(query);
}

export default async function FaqPage() {
  const faqs: Faq[] = await getFaqs();

  return (
    <div className="bg-gradient-to-b from-blue-100 to-white min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mt-14 mx-auto">
        <SectionHeading>FAQs</SectionHeading>
        <p className="text-xl text-gray-600 text-center mt-8 mb-12">
          Find answers to common questions about our blog and services.
        </p>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq) => (
            <AccordionItem key={faq._id} value={faq._id}>
              <AccordionTrigger className="text-xl font-medium text-gray-800 hover:text-gray-600 transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 prose prose-sm max-w-none">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
