
import Link from "next/link";
import HamburgerButton from "./hamburgerButton";

const BaseHeader = () => {
  return (
    <nav className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <HamburgerButton /> {/* Include the MobileMenu component */}
          </div>

          <div className="flex flex-1 items-center sm:items-stretch justify-center">
            <div className="flex shrink-0 items-center">
              {/* Logo or brand */}
            </div>
            <div className="hidden sm:ml-6 sm:block">
              <div className="flex space-x-4">
                <Link href="/manga" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Home</Link>
                <Link href="/manga/latest" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Latest</Link>
                <Link href="/manga/tag" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Tags</Link>
                <Link href="#" className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">Most Popular</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default BaseHeader;
