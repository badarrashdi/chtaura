import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";

export const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`flex items-center gap-2 ${className}`} aria-label="Chtaura — home">
    <img src={logo} alt="Chtaura" className="h-12 w-auto md:h-14" width={120} height={56} />
  </Link>
);
