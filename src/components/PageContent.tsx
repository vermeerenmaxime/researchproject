export const PageContent = ({ children }: any) => {
  return (
    <section className="bg-slate-900/95 text-white ">
      <div className="p-8 grid gap-8 max-w-[900px]">{children}</div>
    </section>
  );
};
