import { ShoppingBag, Search, User } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";

// Header Component
const Header = () => (
  <header className="bg-gray-100 border-gray-200">
    <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-10 pt-2 items-center">
        <div className="flex items-center">
          <Link href="/" className="text-black">
            <svg className="h-6 w-6" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
            </svg>
          </Link>
        </div>
        <div className="hidden md:flex space-x-8">
          {[
            "Store",
            "Mac",
            "iPad",
            "iPhone",
            "Watch",
            "Vision",
            "Entertainment",
            "Accessories",
            "Support",
          ].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-sm font-medium text-gray-700 hover:text-gray-900"
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-gray-900">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <ShoppingBag className="h-5 w-5" />
            <span className="sr-only">Shopping bag</span>
          </button>
          <button className="text-gray-600 hover:text-gray-900">
            <User className="h-5 w-5" />
            <span className="sr-only">User account</span>
          </button>
        </div>
      </div>
    </nav>
  </header>
);

// Sidebar Component
const Sidebar = () => (
  <aside className="bg-gray-100 w-64 min-h-screen p-4">
    <nav className="space-y-2">
      {[
        "Store",
        "Mac",
        "iPad",
        "iPhone",
        "Watch",
        "Vision",
        "Entertainment",
        "Accessories",
        "Support",
      ].map((item) => (
        <Link
          key={item}
          href={`/${item.toLowerCase()}`}
          className="block py-2 px-4 text-sm font-medium text-gray-700 hover:bg-gray-200 rounded"
        >
          {item}
        </Link>
      ))}
    </nav>
  </aside>
);

// MainContent Component
const MainContent = ({ children }: { children: ReactNode }) => (
  <main className="flex-grow flex items-stretch p-2 sm:p-2 lg:p-2">
    <div className="bg-white rounded-lg shadow-md border w-full overflow-auto">
      <div className="p-6">{children}</div>
    </div>
  </main>
);

// Layout Component
const Layout = ({
  children,
  useSidebar = false,
}: {
  children: ReactNode;
  useSidebar?: boolean;
}) => (
  <div className="min-h-screen flex flex-col bg-gray-100">
    {!useSidebar && <Header />}
    <div className="flex flex-grow">
      {useSidebar && <Sidebar />}
      <MainContent>{children}</MainContent>
    </div>
  </div>
);

// Example usage
export default function Component() {
  return (
    <Layout>
      <h1 className="text-4xl font-bold text-gray-900">Home</h1>
      <div className="mt-6 space-y-6">
        <p className="text-gray-600">
          Welcome to our homepage. Here you'll find all the latest products and
          news from our company.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-2">Product {i + 1}</h2>
              <p className="text-gray-600">
                This is a brief description of Product {i + 1}. Click to learn
                more.
              </p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
