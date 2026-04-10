import express from "express";
import cors from "cors";
import studentRoutes from "./routes/student.route";

const app = express();
app.use(cors());
app.use(express.json());
app.use("/students", studentRoutes);
const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

