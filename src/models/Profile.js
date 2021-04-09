let data = {
    name: "Gabriel",
    avatar: "https://avatars.githubusercontent.com/u/23700451?s=400&u=edd3e561e54e9d491c2b37b19669fe83850c0279&v=4",
    "monthly-budget": 3000,
    "hours-per-day": 5,
    "days-per-week": 5,
    "vacation-per-year": 4,
    "hour-value": 75
}

module.exports = {
    get(){
        return data;
    },
    update(newData){
        data = newData;
    }
}