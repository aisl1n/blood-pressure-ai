const Footer = () => {
  return (
    <div className="bg-accent fixed bottom-0 w-full gap-1 p-6">
      <p className="text-xs font-medium">
        © {new Date().getFullYear()} Copyright ARTERIO
      </p>
      <p className="text-muted-foreground text-xs font-medium">
        Todos os direitos reservados.
      </p>
    </div>
  );
};

export default Footer;
