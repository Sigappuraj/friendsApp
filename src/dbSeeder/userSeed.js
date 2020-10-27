const User = require("../models/userModel");
//const { studentSeeder } = require("./studentSeed");

const newTeacher = {
    firstName: "red",
    lastName: "raj",
    email: "test@gmail.com",
    password: "123456$@"
};

const userSeeder = async() => {
    await User.sync({ force: true });

    try {
        const result = await User.create(newTeacher);
        console.log(result.get());
        const { id } = result.get();
        //studentSeeder(id);
    } catch (e) {
        console.error(e);
    }
};

userSeeder();