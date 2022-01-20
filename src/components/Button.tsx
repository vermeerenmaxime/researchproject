export const Button = ({ props, children, icon, onClick }: any) => {
  return (
    <div
      {...props}
      onClick={onClick}
      className="bg-white/10 px-4 py-2 rounded-sm text-sm hover:bg-white/20 transition-all cursor-pointer grid grid-flow-col items-center gap-2"
    >
      <div className="">{children}</div>
      {icon}
    </div>
  );
};
