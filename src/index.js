import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'typeface-poppins';
import { BrowserRouter } from 'react-router-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FirebaseAppProvider } from 'reactfire';

export const firebaseConfig = {
	apiKey: 'AIzaSyC12h2Rsd6tod-MvKfN7vLHep7baeWQOdA',
	authDomain: 'arnolsegchez-2cafe.firebaseapp.com',
	projectId: 'arnolsegchez-2cafe',
	storageBucket: 'arnolsegchez-2cafe.appspot.com',
	messagingSenderId: '29014856330',
	appId: '1:29014856330:web:d21cbd2af23373052bd373',
	measurementId: 'G-35EMF3BJ2E',
};

export const stripePromise = loadStripe(
	'pk_test_51IHyESK1UQqe4VM9rp9pLlfYlYW7xxZ7bZqnzeHdKKLnPIIdsiQSRFMDJToDezMZsBHDhx3V9Vc58GXuUegSLZN100VSf13UQF'
);

ReactDOM.render(
	<React.StrictMode>
		<FirebaseAppProvider firebaseConfig={firebaseConfig}>
			<Elements stripe={stripePromise}>
				<BrowserRouter>
					<App />
				</BrowserRouter>
			</Elements>
		</FirebaseAppProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
