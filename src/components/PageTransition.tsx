import { useEffect, useState, ReactNode } from "react";
import { useLocation } from "react-router-dom";

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const location = useLocation();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionState, setTransitionState] = useState<"visible" | "fading-out" | "fading-in">("visible");

  useEffect(() => {
    if (children !== displayChildren) {
      setTransitionState("fading-out");
      const timeout = setTimeout(() => {
        setDisplayChildren(children);
        setTransitionState("fading-in");
        setTimeout(() => setTransitionState("visible"), 400);
      }, 400);
      return () => clearTimeout(timeout);
    }
  }, [children, location.pathname]);

  return (
    <div
      className="w-full h-full"
      style={{
        opacity: transitionState === "fading-out" ? 0 : 1,
        transition: "opacity 0.4s ease-in-out",
      }}
    >
      {displayChildren}
    </div>
  );
};

export default PageTransition;
