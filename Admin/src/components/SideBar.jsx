import { useState } from "react";
import { SidebarData } from "/public/assets.js";
import { Link } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="lg:hidden fixed top-6 left-6 z-50 p-2">
        <button onClick={toggleSidebar} className="text-black">
          <span className="material-icons font-bold text-2xl">menu</span>
        </button>
      </div>

      <div
        className={`lg:w-48 text-black p-4 bg-[#F6F6F6] border-r-black/25 border-r-2 fixed left-0 top-10 h-full pt-16 transition-all duration-300 ${
          isOpen ? "w-48" : "w-0 overflow-hidden lg:w-48"
        } lg:block md:hidden`}
      >
        <div className="flex flex-col gap-2 px-2 py-4">
          {SidebarData.map((item, index) => (
            <Link to={`/${item.name}`} key={index}>
              <div className="flex items-center gap-4 p-2 rounded-md cursor-pointer transition-all ease-in-out hover:bg-[#1a94c2] hover:text-white w-fit">
                <span className={`${item.icon}`}></span>
                <p className="text-md font-semibold -ml-2">{item.name}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div
        className={`lg:hidden fixed left-0 top-0 w-full h-full bg-black bg-opacity-50 z-40 ${
          isOpen ? "block" : "hidden"
        }`}
        onClick={toggleSidebar}
      >
        <div className="bg-[#F6F6F6] w-48 h-full p-4 pt-16">
          <div className="flex flex-col gap-2 px-2 py-4">
            {SidebarData.map((item, index) => (
              <Link to={`/${item.name}`} key={index}>
                <div
                  className="flex items-center gap-4 p-2 rounded-md cursor-pointer transition-all ease-in-out hover:bg-[#0E1534] hover:text-white w-fit"
                  onClick={toggleSidebar} 
                >
                  <span className={`${item.icon}`}></span>
                  <p className="text-md font-semibold -ml-2">{item.name}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
