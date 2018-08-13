const firebase = require('firebase');
require('firebase/firestore');

const createHub = require('./hub');

var config = {
  apiKey: 'AIzaSyCfEkKczf2IVYVpRMkTedr6qKnvrzkmGhI',
  authDomain: 'yong-home.firebaseapp.com',
  databaseURL: 'https://yong-home.firebaseio.com',
  projectId: 'yong-home',
  storageBucket: 'yong-home.appspot.com',
  messagingSenderId: '226610311495'
};
firebase.initializeApp(config);

let db = firebase.firestore();
const settings = { timestampsInSnapshots: true };
db.settings(settings);

let quotes = db.collection('quotes');

// quotes.get().then(snap => snap.forEach(doc => console.log(doc.id, doc.data())));

// quotes.onSnapshot(snap =>
// {
//     console.log(snap)
//   snap.forEach(doc => console.log('realtime', doc.data()))
//  }
// );

// quotes.add({
//   author: 'David Willson',
//   content: 'blue lake',
//   createdAt: firebase.firestore.FieldValue.serverTimestamp()
// });

let hub = createHub(db.collection('quotes'));
hub.stream.subscribe(a => console.log(a));

hub.exists(d => d.content == 'updtedd').then(console.log);

// hub.updateById('qmpfCkASLNMIuDncTLPu', {content: 'updatedd'})
