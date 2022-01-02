'use strict';


import { DataTypes } from 'sequelize'
import  {database}  from '../config/sequelize.js'

export const Post = database.define('Post', {
    idUser: DataTypes.INTEGER,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    attachment: DataTypes.STRING,
    likes: DataTypes.INTEGER
})