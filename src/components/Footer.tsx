import logo from "@/assets/logo-esfera.png";

const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <img src={logo} alt="Esfera Soluções Digitais" className="h-8" />
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Esfera Soluções Digitais. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
