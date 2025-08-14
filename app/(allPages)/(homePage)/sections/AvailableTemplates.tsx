"use client";

// nextjs
import Image from "next/image";

// react
import { useRef } from "react";

// components
import HomePageBtn from "../components/HomePageBtn";

const AvailableTemplates = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <div id="templates" className="homepage-section" ref={sectionRef}>
      <h2 className="title mb-12">
        Start by selecting a <br /> resume template design
      </h2>

      <ul className="flex flex-wrap justify-center gap-10">
        <li className="bg-green-100 p-4 glow-border">
          <Image
            src="/template-preview-imgs/template-preview-1.jpg"
            alt="template one"
            width={500}
            height={500}
            className="max-w-full h-auto object-contain aspect-[1] "
          />
        </li>

        <li className="bg-green-100 p-4 glow-border">
          <Image
            src="/template-preview-imgs/template-preview-2.jpg"
            alt="template two"
            width={500}
            height={500}
            className="max-w-full h-auto object-contain aspect-[1] "
          />
        </li>

        <li className="flex max-md:flex-col items-center gap-2 bg-green-100 rounded-lg p-4 shadow-lg shadow-green-400">
          <Image
            src="/template-preview-imgs/Load more.svg"
            alt="explore more"
            width={400}
            height={400}
            className="max-w-full flex-1 max-h-full object-contain aspect-[1]"
          />

          <div className="flex-1">
            <p className="font-bold text-2xl text-primary mb-4 max-md:text-center">
              Start now and explore more templates.
            </p>
            <HomePageBtn
              holderAttr={{
                className: "max-md:mx-auto max-md:!block max-md:w-fit",
              }}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};
export default AvailableTemplates;
