export const MenuLink = ({ children, props, onClick }: any) => {
  return (
    <a
      {...props}
      onClick={onClick}
      className="px-8 py-3 text-sm text-white/70 hover:bg-black/20 cursor-pointer"
    >
      {children}
    </a>
  );
};
