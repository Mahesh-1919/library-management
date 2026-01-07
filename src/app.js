import express from "express";
import authRoutes from "./routes/auth.route.js";
import bookRoutes from "./routes/book.route.js";
import borrowRoutes from "./routes/borrow.route.js";
import reportRoutes from "./routes/report.route.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./docs/swagger.js";

const app = express();
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/borrow", borrowRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
