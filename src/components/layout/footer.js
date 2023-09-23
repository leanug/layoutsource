import Link from 'next/link';

export const Footer = () => {
  return (
    <footer>
      <div className="mx-auto flex justify-between items-center p-6">
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