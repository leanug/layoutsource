import Link from 'next/link';

export const Footer = () => {
  return (
    <footer>
      <div className="mx-auto flex justify-between items-center">
        <Link href="/">
            Your Logo
        </Link>
        <p className="text-white text-sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
}