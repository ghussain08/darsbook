import React, { ReactNode } from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { createMemoryHistory, History } from 'history';
import { RootState } from '../redux/store';
import { configureStore } from '@reduxjs/toolkit';
import { reducer } from '../redux/store';
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

const customRender = (ui: ReactNode, options: ICustomRenderOptions) => {
    const { initialEntries = ['/'], initialIndex = 0 } = options;
    const history = createMemoryHistory({ initialEntries, initialIndex });
    const store = configureStore({ reducer, preloadedState: options.initialState });
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
export * from '@testing-library/react';

// override render method
export { customRender as render };
