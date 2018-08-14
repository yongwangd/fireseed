const firebase = require('firebase');
require('firebase/firestore');

const collectionApi = require('./index');

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

let hub = collectionApi(quotes);

hub.fetchAll().then(qs => console.log('fetchAll', qs));

hub.stream().subscribe(value => console.log('value from stream', value))

// console.log('find', hub.findByProp('author', 'updatedd'))
// .then(qs => console.log())

hub.findByProp({ content: 'updatedd' }).then(qs => console.log('find', qs));
hub
  .findByProp({ content: 'updateddsss' })
  .then(qs => console.log('find should be no', qs));
hub.existsByProp({ content: 'updatedd' }).then(qs => console.log('exists', qs));

// hub
//   .add({
//     author: 'David',
//     content: 'blue'
//   })
//   .then(a => console.log('added', a));
hub
  .addIfPropNotExists(
    {
      author: 'Jims',
      content: '5AM'
    },
    { author: 'Jims' }
  )
  .then(a => console.log('adduniq', a));

hub.deleteById('u9JVU1OzBUEmKn37UqeO').then(a => console.log('delete', a));

hub
  .updateById('qmpfCkASLNMIuDncTLPu', { author: 'dumuss' })
  .then(a => console.log(a));
