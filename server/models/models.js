const sequalize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequalize.define('usersdb', {
  userId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userName: { type: DataTypes.STRING, allowNull: false },
  userEmail: { type: DataTypes.STRING, unique: true },
  userPassword: { type: DataTypes.STRING, allowNull: false },
  userRole: { type: DataTypes.STRING, defaultValue: 'USER' },
});

const Profile = sequalize.define('profilesdb', {
  profileId: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  profileName: { type: DataTypes.STRING, allowNull: false },
  profileGender: { type: DataTypes.STRING, allowNull: false },
  profileBirthday: { type: DataTypes.STRING, allowNull: false },
  profileCity: { type: DataTypes.STRING, allowNull: false },
  // UserId: {
  //   type: DataTypes.INTEGER,
  //   allowNull: false,
  //   // references: { model: User, key: userId },
  // },
  profileForUser: { type: DataTypes.INTEGER, allowNull: false },
});

User.hasMany(
  Profile
  // {
  //   // foreignKey: 'UserId',
  // }
);
Profile.belongsTo(User);
// User.hasMany(Profile, { foreignKey: 'userId', sourceKey: 'profileId' });
// Profile.belongsTo(User, { foreignKey: 'userId', targetKey: 'profileId' });

module.exports = {
  User,
  Profile,
};
