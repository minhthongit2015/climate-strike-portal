const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

function generateId(array, start = 100) {
  array.forEach((element, index) => {
    element.id = new ObjectId((start + index).toString().padStart(24, '0'));
  });
}

function mapParent(array, info = []) {
  info.forEach((subInfo) => {
    const [parentIndex, start, end] = subInfo;
    const parent = array[parentIndex - 1];
    parent.children = [];
    array.slice(start - 1, end)
      .forEach((element) => {
        element.parent = parent.id;
        parent.children.push(element.id);
      });
  });
}

module.exports = {
  generateId,
  mapParent
};
