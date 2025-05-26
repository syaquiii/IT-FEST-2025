import Image from "next/image";
import Kota from "@/assets/img/specialprize/kota.png";
const FooterOrnament = () => {
  return (
    <div className="h-screen w-full flex absolute bottom-20 lg:bottom-40 md:S items-end justify-between">
      <Image className="md:w-2/5 lg:w-1/4 w-2/5" src={Kota} alt="kota" />
      <Image
        className="md:w-2/5 lg:w-1/4 w-2/5 scale-x-[-1] "
        src={Kota}
        alt="kota"
      />
    </div>
  );
};

export default FooterOrnament;
