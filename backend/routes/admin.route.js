import express from "express";
import expressAsyncHandler from "express-async-handler";
import Order from "../models/order.js";
import User from "../models/user.js";
import Article from "../models/article.js";

const router = express.Router();

// router.get(
//   "/summary",

//   expressAsyncHandler(async (req, res) => {
//     const orders = await Order.aggregate([
//       {
//         $group: {
//           _id: null,
//           numOrders: { $sum: 1 },
//           totalSales: { $sum: "$totalPrice" },
//         },
//       },
//     ]);
//     const users = await User.aggregate([
//       {
//         $group: {
//           _id: null,
//           numUsers: { $sum: 1 },
//         },
//       },
//     ]);
//     const dailyOrders = await Order.aggregate([
//       {
//         $group: {
//           _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
//           orders: { $sum: 1 },
//           sales: { $sum: "$totalPrice" },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ]);
//     const productCategories = await Article.aggregate([
//       {
//         $group: {
//           _id: "$category",
//           count: { $sum: 1 },
//         },
//       },
//     ]);
//     res.send({ users, orders, dailyOrders, productCategories });
//   })
// );

// router.get(
//   "/mine",

//   expressAsyncHandler(async (req, res) => {
//     const orders = await Order.find({ user: req.user._id });
//     res.send(orders);
//   })
// );
// router.get(
//   "/:id",

//   expressAsyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       res.send(order);
//     } else {
//       res.status(404).send({ message: "Order Not Found" });
//     }
//   })
// );
// router.put(
//   "/:id/pay",
//   expressAsyncHandler(async (req, res) => {
//     const order = await Order.findById(req.params.id);
//     if (order) {
//       order.isPaid = true;
//       order.paidAt = Date.now();
//       order.paymentResult = {
//         id: req.body.id,
//         status: req.body.status,
//         update_time: req.body.update_time,
//         email_address: req.body.email_address,
//       };
//       const updatedOrder = await order.save();
//       res.send({ message: "Order Paid", order: updatedOrder });
//     } else {
//       res.status(404).send({ message: "Order Not Found" });
//     }
//   })
// );
// export default router;

// router.get(
//   "/summary",
//   expressAsyncHandler(async (req, res) => {
//     const orders = await Order.aggregate([
//       {
//         $group: {
//           _id: null,
//           numOrders: { $sum: 1 },
//           totalSales: { $sum: "$amount" },
//         },
//       },
//     ]);
//     const users = await User.aggregate([
//       {
//         $group: {
//           _id: null,
//           numUsers: { $sum: 1 },
//         },
//       },
//     ]);
//     const dailyOrders = await Order.aggregate([
//       {
//         $group: {
//           _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
//           orders: { $sum: 1 },
//           sales: { $sum: "$amount" },
//         },
//       },
//       { $sort: { _id: 1 } },
//     ]);
//     const productCategories = await Article.aggregate([
//       {
//         $group: {
//           _id: "$marque",
//           count: { $sum: 1 },
//         },
//       },
//     ]);
//     res.send({ users, orders, dailyOrders, productCategories });
//   })
// );
router.get(
  "/summary",
  expressAsyncHandler(async (req, res) => {
    const countProducts = await Order.countDocuments();
    if (countProducts) {
      const orders = await Order.aggregate([
        {
          $group: {
            _id: null,
            numOrders: { $sum: 1 },
            totalSales: { $sum: "$amount" },
          },
        },
      ]);
      const users = await User.aggregate([
        {
          $group: {
            _id: null,
            numUsers: { $sum: 1 },
          },
        },
      ]);
      const dailyOrders = await Order.aggregate([
        {
          $group: {
            _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            orders: { $sum: 1 },
            sales: { $sum: "$amount" },
          },
        },
        { $sort: { _id: 1 } },
      ]);
      const productCategories = await Article.aggregate([
        {
          $group: {
            _id: "$marque",
            count: { $sum: 1 },
          },
        },
      ]);
      res.send({ users, orders, dailyOrders, productCategories });
    }
  })
);

export default router;
