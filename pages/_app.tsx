import "../assets/css/global.css";
import type { AppProps } from "next/app";
import { Layout } from "../src/components/Layout";

function App({ Component, pageProps }: AppProps) {
  // const getLayout = Component.getLayout || ((page) => page);

  return (
    <Layout>
      <Component {...pageProps}></Component>
    </Layout>
  );
}

export default App;
