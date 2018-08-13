const Rx = require('rxjs/Rx');
const R = require('ramda');

const createHub = ref => {
  let _data = [];

  const getAll = () =>
    ref.get().then(snap => {
      let array = [];
      snap.forEach(doc => array.push({ _id: doc.id, ...doc.data() }));
      return array;
    });


  const stream = Rx.Observable.create(obs =>
    ref.onSnapshot(() => getAll().then(array => obs.next(array)))
  );

  stream.subscribe(array => _data == array);

  const exists = predFn => R.findIndex(predFn, _data) != -1;
  const notExists = R.complement(exists);
  const list = () => _data;
  const add = newData => ref.add(newData);
  const removeById = id => ref.doc(id).delete();
  const updateById = (id, patch) => ref.doc(id).update(patch);

  return {
    stream,
    exists,
    notExists,
    list,
    add,
    removeById,
    updateById
  };
};

module.exports = createHub;
