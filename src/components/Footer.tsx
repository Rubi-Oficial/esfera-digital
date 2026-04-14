const Footer = () => {
  return (
    <footer className="border-t border-border py-10">
      <div className="container px-4 md:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="font-heading text-lg font-bold">
          <span className="text-foreground">ESFERA</span>
          <span className="text-gradient ml-1 text-sm">Soluções Digitais</span>
        </div>
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Esfera Soluções Digitais. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
