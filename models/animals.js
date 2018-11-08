module.exports = (sequelize,DataTypes) => {
    return sequelize.define('animal', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        age: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        cat: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
        personality: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.STRING,
            allowNull: false
        }
    })
}