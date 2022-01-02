'use strict';


import { DataTypes } from 'sequelize'
import  {database}  from '../config/sequelize.js'

export const Comment = database.define('Comment', {
    content: DataTypes.INTEGER,
    date: DataTypes.STRING,
    user_id: DataTypes.STRING,
    attachment: DataTypes.STRING,
    post_id: DataTypes.INTEGER
})