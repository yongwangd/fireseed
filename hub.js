const Rx = require('rxjs/Rx');
const R = require('ramda');

const createHub = ref => {
  let firstFetch = false;
  let _data = [];

  const getAll = () =>
    ref.get().then(snap => {
      let array = [];
      snap.forEach(doc => array.push({ _id: doc.id, ...doc.data() }));
      firstFetch = true;
      return array;
    });

  const stream = Rx.Observable.create(obs =>
    ref.onSnapshot(() => getAll().then(array => obs.next(array)))
  );

  stream.subscribe(array => _data == array);

  const list = () => Promise.resolve(firstFetch ? _data : getAll());
  const exists = predFn => list().then(data => R.findIndex(predFn, data) != -1);
  const add = newData => ref.add(newData);
  const removeById = id => ref.doc(id).delete();
  const updateById = (id, patch) => ref.doc(id).update(patch);

  return {
    stream,
    list,
    exists,
    add,
    removeById,
    updateById
  };
};

module.exports = createHub;
