import React, { ReactNode } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { Router } from "react-router";
import { createMemoryHistory, History } from "history";
import { RootState } from "../app/store";
import { configureStore } from "@reduxjs/toolkit";
import { reducer } from "../app/store";
import coreQuery from "./core-rtk-query";
interface ICustomRenderOptions {
    initialState?: Partial<RootState>;
    initialEntries?: string[];
    initialIndex?: number;
}

interface IProviderOptions {
    children: ReactNode;
    store: any;
    history: History;
}

const AllTheProviders = (props: IProviderOptions) => {
    return (
        <Provider store={props.store}>
            <Router history={props.history}>{props.children}</Router>
        </Provider>
    );
};

const defaultOptions = { initialEntries: ["/"], initialIndex: 0 };
const customRender = (ui: ReactNode, options: ICustomRenderOptions = defaultOptions) => {
    const { initialEntries = ["/"], initialIndex = 0 } = options;
    const history = createMemoryHistory({ initialEntries, initialIndex });
    const store = configureStore({
        reducer,
        preloadedState: options.initialState,
        middleware: (getDefaultMiddlewares) => getDefaultMiddlewares().concat(coreQuery.middleware),
    });
    return {
        ...render(
            <AllTheProviders {...options} store={store} history={history}>
                {ui}
            </AllTheProviders>
        ),
        store,
        history,
    };
};

// re-export everything
export * from "@testing-library/react";

// override render method
export { customRender as render };
