
import { auth } from '../Components/firebase';
const API = 'http://localhost:4000';


/**
 * A helper function to fetch data from your API.
 * It sets the Firebase auth token on the request.
 */
export async function fetchFromAPI(endpointURL, opts) {
  const { method, body } = { method: 'POST', body: null, ...opts };

  const user = auth.currentUser;
  // GetIdToken for JWT AUTH
  const token = user && (await user.getIdToken());
  const res = await fetch(`${API}/${endpointURL}`, {
    method,
    ...(body && { body: JSON.stringify(body) }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
}


const formatter = new Intl.NumberFormat('de-DE', {
  style: "currency",
  currency: "EUR"
})

export  function formatCurrency(amount) {
  return formatter.format(amount/1000)
}

export function timeConverter(UNIX_timestamp){
  let a = new Date(UNIX_timestamp * 1000);
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let year = a.getFullYear();
  let month = months[a.getMonth()];
  let date = a.getDate();
  let hour = a.getHours();
  let min = a.getMinutes();
  let sec = a.getSeconds();
  let time = date + '-' + month + '-' + year + ',  ' + hour + ':' + min + ':' + sec ;
  return time;
}