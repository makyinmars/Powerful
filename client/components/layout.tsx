import Navbar from "./navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="h-full flex flex-col">
      {/* Header */}

      <header className="flex items-center justify-around h-12 pt-5">
        <Navbar />
      </header>

      {/* Main */}

      <main className="h-full">{children}</main>

      {/* Footer */}

      <footer className="h-40 flex items-center justify-center flex-col">
        <a className="title-brand" href="https://github.com/makyfj/Powerful">
          Source Code {"♥️"}
        </a>
        <p className="title-brand">Copyright Powerful &copy; 2021</p>
      </footer>
    </div>
  );
};

export default Layout;
