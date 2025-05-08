import { Sequelize, DataTypes } from 'sequelize';
import path from 'path';

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.resolve('backend', 'data', 'users.sqlite'),
  logging: false
});

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  accountType: { type: DataTypes.STRING },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  businessName: { type: DataTypes.STRING },
  contact: { type: DataTypes.STRING },
  operatingHours: { type: DataTypes.STRING }
}, {
  timestamps: false
});

await sequelize.sync();

export { sequelize, User };
