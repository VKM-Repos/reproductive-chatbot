import Image from "next/image";
import vhdo_logo from "@/app/assets/vhdo_logo.svg";

export default function Footer() {
  return (
    <div className="flex bottom-0 bg-slate-900 fixed justify-between py-5 px-10 w-screen ">
      <div className="flex items-center justify-center gap-3">
        <Image
          src={vhdo_logo}
          alt="VHDO LOGO"
          className="aspect-auto object-cover"
        />
        <h2 className="font-semibold text-xl font-montserrat text-white">
          VHDO
        </h2>
      </div>
    </div>
  );
}
