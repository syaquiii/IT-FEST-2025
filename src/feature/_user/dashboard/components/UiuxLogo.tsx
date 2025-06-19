import Image from "next/image";
import phone from "@/assets/img/_user/dashboard/phones.webp";
import pen from "@/assets/img/_user/dashboard/pens.webp";
import slider from "@/assets/img/_user/dashboard/bottLeft.webp";
import text from "@/assets/img/_user/dashboard/text.webp";

export const UiuxLogo = () => {
  return (
    <div className="relative w-20 h-34 :ml-8 ml-0">
      <Image
        src={phone}
        alt="Phone"
        className="w-full relative"
      />

      <Image
        src={text}
        alt="Text Icon"
        className="absolute left-[-30px] top-[60px] w-10 "
      />

      {/* Floating Pen Icon */}
      <Image
        src={pen}
        alt="Pen Icon"
        className="absolute right-[-30px] top-[40px] w-10 animate-float"
      />

      {/* Slider Icon */}
      <Image
        src={slider}
        alt="Slider Icon"
        className="absolute bottom-[-24px] left-1 -translate-x-1/2 w-18 "
      />
    </div>
  );
};

export default UiuxLogo;
