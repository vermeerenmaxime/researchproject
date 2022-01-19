export const PageContent = ({ children, props }: any) => {
  return (
    <section className="bg-slate-900/95 text-white ">
      <div className="p-8 grid gap-4 grid-flow-row max-w-[900px]" >
        {children}
      </div>
    </section>
  );
};
