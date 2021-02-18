import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

export const firebaseConfig = {
	apiKey: 'AIzaSyC12h2Rsd6tod-MvKfN7vLHep7baeWQOdA',
	authDomain: 'arnolsegchez-2cafe.firebaseapp.com',
	projectId: 'arnolsegchez-2cafe',
	storageBucket: 'arnolsegchez-2cafe.appspot.com',
	messagingSenderId: '29014856330',
	appId: '1:29014856330:web:d21cbd2af23373052bd373',
	measurementId: 'G-35EMF3BJ2E',
};

firebase.initializeApp(firebaseConfig)

export const db = firebase.firestore()
export const auth = firebase.auth()