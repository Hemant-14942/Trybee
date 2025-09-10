import 'bootstrap-icons/font/bootstrap-icons.css';

const Header = () => {
  return (
    <div className="flex justify-between items-center p-8 md:p-4 bg-[#F6F6F6] w-full border-b-2 border-b-black/25 px-10 fixed top-0">
      <div className="text-3xl font-bold text-black cursor-pointer text-center w-full underline">
        Trybe Admin Panel
      </div>
    </div>
  );
};

export default Header;
