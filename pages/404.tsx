import Footer from "@/components/perso/footer/Footer";
import Nav from "@/components/tailwindui/nav/Nav";
import { MobileMenuProvider } from "@/context/MobileMenuContext";

const Custom404 = () => {
  return (
    <MobileMenuProvider>
      <div>
        <Nav />
        <main>
          <h1>404 - Page Not Found</h1>
        </main>
        <Footer />
      </div>
    </MobileMenuProvider>
  );
};

export default Custom404;
