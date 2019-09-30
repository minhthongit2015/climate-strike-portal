
const mongoose = require('mongoose');

const { ObjectId } = mongoose.Types;

const {
  User, Category
} = require('./db');

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

const users = [
  {
    name: 'Trần Huyền Diệu',
    username: 'huyendieu',
    password: 'alphateam',
    socials: { fb: '100010123869389' }
  },
  {
    name: 'Huỳnh Cao Hữu Linh',
    username: 'huulinh',
    password: 'alphateam',
    socials: { fb: '100004405993641' }
  },
  {
    name: 'Nguyễn Thị Chung Trà',
    username: 'phatra',
    password: 'alphateam',
    socials: { fb: '100008247301333' }
  },
  {
    name: 'Trần Nguyễn Diễm Linh',
    username: 'linhtran',
    password: 'alphateam',
    socials: { fb: '100011207474424' }
  },
  {
    name: 'Đinh Thị Kim Loan',
    username: 'loankim',
    password: 'alphateam',
    socials: { fb: '100005064845279' }
  },
  {
    name: 'Trần Nguyễn Minh Thông',
    username: 'thongtran',
    password: 'alphateam',
    socials: { fb: '100010281495813' }
  },
  {
    name: 'Nguyễn Tấn Đạt',
    username: 'tandat',
    password: 'alphateam',
    socials: { fb: '100010377552925' }
  }
];
generateId(users, 100);

const categories = [
  {
    name: 'Bức tranh Trái Đất',
    type: 'EarthPicture'
  },
  {
    name: 'Khí hậu',
    type: 'Climate'
  },
  {
    name: 'Sinh vật',
    type: 'Organisms'
  },
  {
    name: 'Ô nhiễm',
    type: 'Pollution'
  },

  {
    name: 'Điều bạn có thể làm',
    type: 'WhatYouCanDo'
  },
  {
    name: 'Khí hậu',
    type: 'ForClimate'
  },
  {
    name: 'Sinh vật',
    type: 'ForOrganisms'
  },
  {
    name: 'Ô nhiễm',
    type: 'ForPollution'
  },

  {
    name: 'Điều bạn muốn biết?',
    type: 'YourQuestion'
  },
  {
    name: 'Khí hậu',
    type: 'QClimate'
  },
  {
    name: 'Sinh vật',
    type: 'QOrganisms'
  },
  {
    name: 'Ô nhiễm',
    type: 'QPollution'
  }
];
generateId(categories, 200);
mapParent(categories, [
  [1, 2, 4]
]);
mapParent(categories, [
  [5, 6, 8]
]);
mapParent(categories, [
  [9, 10, 12]
]);

module.exports = async () => {
  await User.collection.drop();
  // await User.deleteMany({}).exec();
  await Promise.all(
    users.map(async (user) => {
      const userToSave = { ...user };
      const userId = userToSave.id;
      delete userToSave.id;
      const savedUser = await User.findByIdAndUpdate(
        userId,
        { ...userToSave },
        { upsert: true }
      ).exec();
      return savedUser;
    })
  );
  const savedUsers = await Promise.all(
    users.map(user => User.findById(user.id))
  );

  await Category.collection.drop();
  // await Category.deleteMany({}).exec();
  await Promise.all(
    categories.map(async (category) => {
      const categoryToSave = { ...category };
      const categoryId = categoryToSave.id;
      delete categoryToSave.id;
      const savedCategory = await Category.findByIdAndUpdate(
        categoryId,
        categoryToSave,
        { upsert: true }
      ).exec();
      return savedCategory;
    })
  );
  const savedCategories = await Promise.all(
    categories.map(category => Category.findById(category.id))
  );

  return {
    users: savedUsers,
    categories: savedCategories
  };
};
