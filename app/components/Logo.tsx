import Link from "next/link";

export const Logo = ({ className = "" }: { className?: string }) => (
  <Link href="/" className={`flex items-center gap-2 ${className}`} aria-label="Chtaura — home">
    <img src="/assets/logo.png" alt="Chtaura" className="h-[64px] w-auto" width={120} height={56} />
  </Link>
);
