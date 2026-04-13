import { useNavigate } from "react-router-dom";

const pageOrder = ["/", "/about", "/experience", "/video", "/aigc"];

interface NextLandingProps {
  currentPath: string;
}

const NextLanding = ({ currentPath }: NextLandingProps) => {
  const navigate = useNavigate();
  const currentIndex = pageOrder.indexOf(currentPath);
  const nextPath = pageOrder[(currentIndex + 1) % pageOrder.length];

  return (
    <button
      onClick={() => navigate(nextPath)}
      className="fixed bottom-6 right-8 text-muted-foreground text-xs tracking-wider z-50 bg-transparent border-none cursor-pointer hover:text-foreground transition-colors"
    >
      the next landing …
    </button>
  );
};

export default NextLanding;
