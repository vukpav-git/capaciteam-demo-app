import "./styles/App.css";

import { Provider } from "react-redux";

import Table from "./components/Table/Table";
import TopNav from "./components/TopNav/TopNav";
import store from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <TopNav />
        <Table />
      </div>
    </Provider>
  );
};

export default App;
