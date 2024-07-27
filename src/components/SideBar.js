// src/components/Sidebar.js
import Image from "next/image";

const Sidebar = () => {
  return (
    <div className="sidebar fixed left-0 top-0 h-full bg-gray-200 flex flex-col justify-between items-center py-12 px-3">
      <div className="flex flex-col items-center gap-7">
        <Image
          src="https://media.licdn.com/dms/image/D560BAQGBCmmcq1tDVw/company-logo_100_100/0/1716373443642/retainiq_logo?e=1730332800&v=beta&t=PGppr-HCsewi3SGVc6MLmkaKVViUIeKkZoHnH-xiEo8"
          alt="RetainIQ Logo"
          width={32}
          height={32}
        />
        <Image
          src="https://cdn-icons-png.flaticon.com/128/3394/3394388.png"
          alt="Dashboard Icon"
          width={32}
          height={32}
        />
        <Image
          src="https://cdn-icons-png.flaticon.com/128/6033/6033714.png"
          alt="Products Icon"
          width={32}
          height={32}
        />
        <Image
          src="https://cdn-icons-png.flaticon.com/128/5968/5968965.png"
          alt="Analytics Icon"
          width={32}
          height={32}
        />
      </div>
      <div className="setting flex flex-col items-center gap-7 mt-auto">
        <Image
          src="https://cdn-icons-png.flaticon.com/128/17389/17389737.png"
          alt="Settings Icon"
          width={32}
          height={32}
        />
        <Image
          src="https://cdn-icons-png.flaticon.com/128/503/503822.png"
          alt="Logout Icon"
          width={28}
          height={28}
        />
      </div>
    </div>
  );
};

export default Sidebar;
