module.exports = {
    dialect: 'postgres',
    host: '192.168.0.104',
    username: 'postgres',
    password: 'docker',
    database: 'gobarber',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
};
