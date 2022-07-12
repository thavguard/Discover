import { FC } from "react";
import AppRouter from "./AppRouter.tsx/AppRouter";
import Header from "./components/Header/Header";
import "./style/index.scss";

const App: FC = () => {
  return (
    <div id="container">
      <Header />
      <div className="content">
        <AppRouter />
      </div>
    </div>
  );
};

export default App;
