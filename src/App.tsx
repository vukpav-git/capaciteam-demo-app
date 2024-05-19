import "./styles/global.css";

import { Box } from "@mui/material";
import { IntlProvider } from "react-intl";
import { Provider, useSelector } from "react-redux";

import Table from "./components/Table/Table";
import TopNav from "./components/TopNav/TopNav";
import messages_en from "./lang/en.json";
import messages_ga from "./lang/ga.json";
import type { TLanguage } from "./models/Types";
import store from "./store";

const messages = {
  en: messages_en,
  ga: messages_ga,
};

const App = () => {
  const locale: TLanguage = useSelector((state: any) => state.locale) || "en";

  return (
    <IntlProvider
      defaultLocale="en"
      locale={locale}
      messages={messages[locale]}
    >
      <Box className="App">
        <TopNav />
        <Table />
      </Box>
    </IntlProvider>
  );
};

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWrapper;
