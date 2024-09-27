import Image from "next/image";
import vhdo_logo from "@/app/assets/vhdo_logo.svg";
export default function Navbar() {
  return (
    <div className="flex fixed justify-between py-5 px-10 w-full ">
      <div className="flex items-center justify-center gap-3">
        <Image
          src={vhdo_logo}
          alt="VHDO LOGO"
          className="aspect-auto object-cover"
        />
        <h2 className="font-bold text-xl font-montserrat">VHDO</h2>
      </div>
      <div className="flex items-center gap-3 text-sm">
        <a href="#" className="hover:underline">
          Health Tips
        </a>
      </div>
    </div>
  );
}
