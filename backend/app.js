import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import categorieRouter from "./routes/categorie.route.js";
import scategorieRouter from "./routes/scategorie.route.js";
import articleRouter from "./routes/article.route.js";
import userRouter from "./routes/user.route.js";
import paymentRouter from "./routes/payment.route.js";
import orderRouter from "./routes/order.route.js";
import adminRouter from "./routes/admin.route.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb" }));
app.use(cors());
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connexion à la base de données réussie");
  })
  .catch((err) => {
    console.log("Impossible de se connecter à la base de données", err);
    process.exit();
  });
app.use("/api/categories", categorieRouter);
app.use("/api/scategories", scategorieRouter);
app.use("/api/articles", articleRouter);
app.use("/api/users", userRouter);
app.use("/api/payment", paymentRouter);
app.use("/api/orders", orderRouter);
app.use("/api/admin", adminRouter);
app.get("/", (req, res) => {
  res.send("bonjour");
});
app.listen(process.env.PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`);
});
