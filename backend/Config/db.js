const mongoose = require("mongoose");
const dotenv = require("dotenv");
MONGO_URI="mongodb+srv://akshadakadam088:Mrunalissk123@cluster0.iedwid1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
dotenv.config();

const connectDB = async () => {
    const test = MONGO_URI;
    console.log(test);
    try {
        const conn = await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error: ${error.message}`);
        process.exit();
    }
};

module.exports = connectDB;








// const mongoose = require("mongoose");

// const connectDB = async () => {
//     try {
//         console.log('Mongo URI:', process.env.MONGO_URI);  // Log the URI to verify it
//         const conn = await mongoose.connect(process.env.MONGO_URI, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true,
//         });

//         console.log(`MongoDB Connected: ${conn.connection.host}`);
//     } catch (error) {
//         console.log(`Error: ${error.message}`);
//         process.exit();
//     }
// };

// module.exports = connectDB;
