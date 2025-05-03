import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Hide Navbar on login page
  if (
    location.pathname === "/login" ||
    location.pathname === "/moderator/voting" ||
    location.pathname === "/admin"
  )
    return null;

  // Determine button text and styles based on the route
  let buttonText = "چوونە ژوورەوە";
  let buttonLink = "/login";
  let buttonClasses = "bg-[#155DFC] hover:bg-[#0037ff]"; // Default (blue button)

  if (location.pathname === "/moderator") {
    buttonText = "داشبۆڕد";
    buttonLink = "/moderator/dashboard";
    buttonClasses = "bg-gray-500 hover:bg-gray-600"; // Gray button
  } else if (location.pathname.startsWith("/moderator")) {
    buttonText = "گەڕانەوە";
    buttonLink = "/moderator";
  } else if (location.pathname.startsWith("/search")) {
    buttonText = "گەڕانەوە";
    buttonLink = "";
  }
  buttonClasses = "bg-gray-500 hover:bg-gray-600";

  return (
    <div
      className="fixed top-0 w-screen h-[60px] bg-white flex items-center justify-between px-4 py-2
                        1.5xl:rounded-full 1.5xl:h-[75px] 1.5xl:w-[99vw] drop-shadow-2xl 1.5xl:mt-2"
    >
      {/* Conditional Button */}
      <div
        className={`w-[107px] h-[45px] flex items-center justify-center rounded
                           1.5xl:w-[125px] 1.5xl:h-[55px] 1.5xl:ml-3
                           shadow-[0_0_7px_rgba(0,0,0,0.35)] ${buttonClasses}`}
      >
        {buttonText === "گەڕانەوە" && buttonLink == "" ? (
          <button
            onClick={() => navigate(-1)}
            className="w-full h-full font-rabar font-bold text-lg text-white"
          >
            {buttonText}
          </button>
        ) : (
          <Link to={buttonLink} className=" w-full h-full">
            <button className="w-full h-full font-rabar font-bold text-lg text-white">
              {buttonText}
            </button>
          </Link>
        )}
      </div>

      {/* Title - وشەسازی */}

      <div className="font-rabar font-bold text-2xl text-black text-right 1.5xl:mr-3 ">
        وشەسازی
      </div>
    </div>
  );
};

export default Navbar;
