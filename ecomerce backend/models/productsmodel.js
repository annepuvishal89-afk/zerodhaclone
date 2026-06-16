let _data = [];
let _nextId = 1;

module.exports = {
	find: async () => _data,
	create: async (obj) => {
		const item = { _id: String(_nextId++), ...obj };
		_data.push(item);
		return item;
	},
	insertMany: async (arr) => {
		const inserted = arr.map(o => ({ _id: String(_nextId++), ...o }));
		_data.push(...inserted);
		return inserted;
	},
	findByIdAndUpdate: async (id, update) => {
		const i = _data.findIndex(x => x._id == id);
		if (i === -1) return null;
		_data[i] = { ..._data[i], ...update };
		return _data[i];
	},
	findByIdAndDelete: async (id) => {
		const i = _data.findIndex(x => x._id == id);
		if (i === -1) return null;
		return _data.splice(i, 1)[0];
	}
};
