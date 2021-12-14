import "../styles/tailwind.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { store } from "../app/store";
import { wrapper } from "../app/store";

let persistor = persistStore(store);

export function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);
