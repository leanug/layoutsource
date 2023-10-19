import Link from 'next/link';

export const Footer = () => {
  return (
    <footer>
      <div className="section-full flex justify-between items-center py-3">
        <Link href="/">
            Your Logo
        </Link>
        <p className="text-sm">
          © {new Date().getFullYear()} Your Company. All rights reserved.
          Icons by <a href="https://fontawesome.com">https://fontawesome.com</a>
        </p>
      </div>
    </footer>
  );
}