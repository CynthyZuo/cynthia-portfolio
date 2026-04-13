import { useNavigate, useLocation } from "react-router-dom";

const navItems = [
  { label: "About", route: "/about" },
  { label: "Experience", route: "/experience" },
  { label: "Video", route: "/video" },
  { label: "AIGC", route: "/aigc" },
];

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 py-3 bg-[hsl(0_0%_18%/0.85)] backdrop-blur-sm">
      <div
        className="text-foreground font-semibold text-[17px] tracking-[0.05em] cursor-pointer hover:opacity-80 transition-opacity"
        onClick={() => navigate("/")}
      >
        CYNTHIA ZUO
      </div>
      <nav className="flex gap-9">
        {navItems.map((item) => {
          const isActive = location.pathname === item.route;
          return (
            <button
              key={item.label}
              onClick={() => navigate(item.route)}
              className="text-foreground font-normal text-[17px] tracking-[0.03em] hover:opacity-70 transition-opacity"
            >
              {isActive ? `[ ${item.label} ]` : item.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};

export default Header;
