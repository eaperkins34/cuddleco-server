module.exports = function(sequelize, DataTypes ){
    return sequelize.define('user', {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.CHAR(12),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING, 
            allowNull: false
        }
    })
}
