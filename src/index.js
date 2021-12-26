import dayjs from 'dayjs';
import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import React, { Suspense } from 'react';
import Spinner from 'react-bootstrap/Spinner';
import ReactDOM from 'react-dom';
import { initReactI18next } from 'react-i18next';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './index.css';

import 'config/dayjs';
import { i18nConfiguration, webpackBackend } from 'config/i18n';
import Faq from 'faq';
import Home from 'home';
import Loader from 'loader';
import Navigation from 'navigation';

// eslint-disable-next-line import/no-named-as-default-member
i18n
	.use( webpackBackend )
	.use( LanguageDetector )
	.use( initReactI18next )
	.init( {
		...i18nConfiguration( [ 'app', 'pdf', 'config' ] ),
	} );

i18n.on( 'languageChanged', ( newLanguage ) => {
	require( 'dayjs/locale/' + newLanguage );
	dayjs.locale( newLanguage );
	dayjs.updateLocale( newLanguage, {
		weekStart: 1, // Week starts on Monday
	} );
} );

const loadingComponent = (
	<Spinner
		className="position-absolute top-50 start-50"
		animation="border"
		variant="primary"
		role="status"
	>
		<span className="visually-hidden">Loading...</span>
	</Spinner>
);

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<Suspense fallback={ loadingComponent }>
				<Routes>
					<Route path="/" element={ <Navigation /> }>
						<Route index element={ <Home /> } />
						<Route path="configuration" element={ <Loader /> } />
						<Route path="faq" element={ <Faq /> } />
					</Route>
				</Routes>
			</Suspense>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById( 'root' ),
);
