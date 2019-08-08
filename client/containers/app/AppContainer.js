import React, {Component} from 'react';
import { hot } from 'react-hot-loader';

import { IntlProvider } from "react-intl";
import AppLocale from '../../lang';
// Import custom components
import MainRouter from '../../routers/routes';


class AppContainer extends Component {

    render() {

        const { locale, loginUser } = this.props;
        const currentAppLocale = AppLocale['en'];
    
        return (
            <IntlProvider
                locale={currentAppLocale.locale}
                messages={currentAppLocale.messages}
                >
                <MainRouter />
            </IntlProvider>
        );
    }
}

export default hot(module)(AppContainer);