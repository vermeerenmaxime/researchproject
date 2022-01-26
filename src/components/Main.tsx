export const Main = ({ children }: any) => {
    return (
      <main className="grid [grid-template-columns:16rem_calc(100vw-16rem)] w-screen h-screen overflow-x-hidden">
        {children}
      </main>
    );
  };