const {Observable} = require('rxjs/Rx');

const snapshotToArray = snap => {
  let array = [];
  snap.forEach(doc => array.push({ _id: doc.id, ...doc.data() }));
  firstFetch = true;
  return array;
};

const createHub = ref => {
  const fetchAll = () => ref.get().then(snapshotToArray);

  const stream = () =>
    Observable.create(obs =>
      ref.onSnapshot(() => fetchAll().then(array => obs.next(array)))
    );

  const findById = id =>
    ref
      .doc(id)
      .get()
      .then(snapshotToArray);

  const findByProp = prop => {
    let [key, value] = Object.entries(prop)[0];
    return ref
      .where(key, '==', value)
      .get()
      .then(snapshotToArray);
  };

  const existsByProp = prop =>
    findByProp(prop).then(found => found && found.length > 0);

  const add = newData => ref.add(newData).then(docRef => docRef.id);

  const addIfPropNotExists = (newData, prop) =>
    existsByProp(prop).then(
      exists => (exists ? 'Record Exists' : add(newData))
    );

  const deleteById = id => ref.doc(id).delete();
  const updateById = (id, patch) => ref.doc(id).update(patch);

  return {
    stream,
    fetchAll,
    findById,
    findByProp,
    existsByProp,
    add,
    addIfPropNotExists,
    deleteById,
    updateById
  };
};

module.exports = createHub;
