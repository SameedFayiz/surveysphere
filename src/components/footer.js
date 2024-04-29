const Footer = () => {
  return (
    <footer className="w-full bg-gray-700 text-white pt-6 pb-16 border-t-2 border-gray-400">
      <div className="container mx-auto px-10">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-lg font-bold">SurveySphere</p>
            <p className="text-sm">Your trusted survey platform</p>
          </div>
          <div className="flex mt-4 md:mt-0">
            <a
              href="#"
              className="text-white hover:text-yellow-400 mx-3 transition duration-300 ease-in-out"
            >
              About
            </a>
            <a
              href="#"
              className="text-white hover:text-yellow-400 mx-3 transition duration-300 ease-in-out"
            >
              Services
            </a>
            <a
              href="#"
              className="text-white hover:text-yellow-400 mx-3 transition duration-300 ease-in-out"
            >
              Contact
            </a>
          </div>
        </div>
        <hr className="my-4 border-gray-400" />
        <p className="text-center text-sm">
          &copy; {new Date().getFullYear()} SurveySphere. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
