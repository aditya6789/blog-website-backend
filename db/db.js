import mongoose from "mongoose";
export const connectDB = async () => {
    try {
      const conn = await mongoose.connect(`mongodb+srv://paswanaditya256:TQvAs2sIIEhMzh44@cluster0.pvjorbt.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`, {
        useNewUrlParser: true,
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(error.message);
      process.exit(1);
    }
  }