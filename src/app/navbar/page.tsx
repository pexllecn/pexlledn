import { ShoppingBag, Search, User, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";

// Header Component
const Header = () => (
  <header className="fixed top-0 left-0 right-0 bg-muted/70 z-10 backdrop-blur-lg dark:backdrop-blur-lg">
    <nav className="max-w-5xl mx-auto px-2 sm:px-2 lg:px-2">
      <div className="flex justify-between h-12 items-center">
        <div className="flex items-center">
          <Link href="/" className="text-foreground">
            <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
              <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516.024.034 1.52.087 2.475-1.258.955-1.345.762-2.391.728-2.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422.212-2.189 1.675-2.789 1.698-2.854.023-.065-.597-.79-1.254-1.157a3.692 3.692 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56.244.729.625 1.924 1.273 2.796.576.984 1.34 1.667 1.659 1.899.319.232 1.219.386 1.843.067.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758.347-.79.505-1.217.473-1.282z" />
            </svg>
          </Link>
        </div>
        <div className="hidden md:flex space-x-8">
          {[
            "Dashboard",
            "Mac",
            "iPad",
            "iPhone",
            "Watch",
            "Vision",
            "Entertainment",
            "Others",
            "Support",
          ].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className="text-xs text-foreground hover:text-gray-900"
            >
              {item}
            </Link>
          ))}
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-foreground hover:text-gray-900">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </button>
          <button className="text-foreground hover:text-gray-900">
            <ShoppingBag className="h-4 w-4" />
            <span className="sr-only">Shopping bag</span>
          </button>
          <button className="text-foreground hover:text-gray-900">
            <User className="h-4 w-4" />
            <span className="sr-only">User account</span>
          </button>
        </div>
      </div>
    </nav>
  </header>
);

// Sidebar Component
const Sidebar = () => (
  <aside className="bg-muted w-64 min-h-screen p-4">
    <nav className="space-y-2">
      {[
        "Dashboard",
        "Mac",
        "iPad",
        "iPhone",
        "Watch",
        "Vision",
        "Entertainment",
        "Others",
        "Support",
      ].map((item) => (
        <Link
          key={item}
          href={`/${item.toLowerCase()}`}
          className="block py-2 px-4 text-sm font-normal text-foreground hover:bg-gray-200 rounded"
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
    <div className="bg-background rounded-lg shadow-sm border w-full overflow-auto">
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
  <div className="min-h-screen flex flex-col bg-muted">
    <Header />
    <div className="flex flex-grow pt-10">
      {useSidebar && <Sidebar />}
      <MainContent>{children}</MainContent>
    </div>
  </div>
);

// Example usage
export default function Component() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h1 className="text-5xl font-bold text-foreground mb-4">
              Guaranteed Apple quality.
            </h1>
            <p className="text-xl text-foreground mb-6">
              Certified refurbished products are backed by a one-year warranty
              and the Apple Certified Refurbished promise.
            </p>
            <Link
              href="#"
              className="text-blue-600 hover:underline inline-flex items-center"
            >
              Learn more
              <ChevronRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          <div className="relative h-96 lg:h-auto">
            <Image
              src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/apple-refurb-products-home-201810?wid=2006&hei=960&fmt=png-alpha&.v=1541530935498"
              alt="Apple Refurbished Products"
              layout="fill"
              objectFit="contain"
            />
          </div>
        </div>

        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-center mb-12">
            Shop Refurbished
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8">
            {[
              {
                name: "Mac",
                icon: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-icon-mac?wid=138&hei=114&fmt=png-alpha&.v=1541530931245",
                width: 69,
                height: 57,
              },
              {
                name: "iPad",
                icon: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-icon-ipad?wid=78&hei=114&fmt=png-alpha&.v=1541530927000",
                width: 39,
                height: 57,
              },
              {
                name: "iPhone",
                icon: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-icon-iphone?wid=50&hei=114&fmt=png-alpha&.v=1541530929000",
                width: 25,
                height: 57,
              },
              {
                name: "Watch",
                icon: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-icon-watch?wid=50&hei=114&fmt=png-alpha&.v=1541530930000",
                width: 25,
                height: 57,
              },
              {
                name: "AirPods",
                icon: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-icon-airpods?wid=120&hei=114&fmt=png-alpha&.v=1710172888278",
                width: 60,
                height: 57,
              },
              {
                name: "Apple TV",
                icon: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-icon-appletv?wid=90&hei=114&fmt=png-alpha&.v=1541530929000",
                width: 45,
                height: 57,
              },
              {
                name: "HomePod",
                icon: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-icon-homepod?wid=90&hei=114&fmt=png-alpha&.v=1541530929000",
                width: 45,
                height: 57,
              },
              {
                name: "Others",
                icon: "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/refurb-icon-accessories?wid=84&hei=114&fmt=png-alpha&.v=1541530928000",
                width: 42,
                height: 57,
              },
            ].map((item) => (
              <Link
                key={item.name}
                href="#"
                className="flex flex-col items-center"
              >
                <Image
                  src={item.icon}
                  alt={item.name}
                  width={item.width}
                  height={item.height}
                />
                <span className="text-sm text-foreground mt-2">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-semibold mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(9)].map((_, i) => (
              <div key={i} className="bg-muted rounded-lg p-6">
                <h3 className="text-xl font-medium mb-2">
                  Featured Product {i + 1}
                </h3>
                <p className="text-gray-600">
                  This is a brief description of Featured Product {i + 1}. Click
                  to learn more.
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
