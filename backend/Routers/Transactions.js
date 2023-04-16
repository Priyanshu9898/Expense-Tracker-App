import express from 'express';
import { addTransactionController, deleteTransactionController, getAllTransactionController } from '../controllers/transactionController.js';

const router = express.Router();

router.route("/addTransaction").post(addTransactionController);

router.route("/getTransaction/:id").get(getAllTransactionController);

router.route("/deleteTransaction/:id").delete(deleteTransactionController);

export default router;