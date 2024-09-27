"use client";
import hero_img from "@/app/assets/chatbot_hero_img.svg";
import Image from "next/image";
export default function Hero() {
  return (
    <div className="flex gap-5 items-center justify-center px-16 py-1 h-screen w-full">
      <div className="w-full h-fit">
        <div className=" flex flex-col items-center gap-10 w-[550px]">
          <h2 className="font-montserrat font-semibold text-5xl leading-[60px]">
            Understanding Reproductive Health
            <br /> & Nutrition for All
          </h2>
          <p className="font-poppins text-sm">
            Empowering individuals through knowledge on reproductive health and
            nutrition, with access to the latest research and insights into
            well-being, fertility, family planning, and sexual health.
          </p>
        </div>
        <div className="font-poppins flex gap-10 mt-20">
          {/* <button className="bg-[#2253E5] px-4 py-2 rounded-lg font-medium text-white">
            Learn More
          </button>
          <button className="px-4 py-2 rounded-lg font-medium flex gap-3 items-center border border-[#06143D]">
            <svg
              width="18"
              height="21"
              viewBox="0 0 18 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.0523 8.80438L2.90901 0.269377C1.75987 -0.423759 0 0.248871 0 1.96325V19.0292C0 20.5672 1.63531 21.4941 2.90901 20.723L17.0523 12.1921C18.3139 11.4334 18.3179 9.56314 17.0523 8.80438Z"
                fill="#06143D"
              />
            </svg>
            Watch Video
          </button> */}
        </div>
      </div>
      <div className=" w-full h-fit max-w-full flex p-10 justify-center overflow-hidden">
        <Image
          src={hero_img}
          alt=""
          className="aspect-auto w-[400px] h-[400px]"
        />
      </div>
    </div>
  );
}
