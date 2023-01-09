import { ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { store } from "./store/store";
import { theme } from "./theme/theme";

const container = document.getElementById("root")!;
const root = createRoot(container);


root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <ChakraProvider theme={theme}>
                    <App/>
                </ChakraProvider>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
