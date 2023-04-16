import Transaction from "../models/TransactionModel.js";
import User from "../models/userSchema.js";

export const addTransactionController = async (req, res) => {
    try{
        const {title, amount, description, date, category, userId, transactionType } = req.body;

        // console.log(title, amount, description, date, category, userId, transactionType);

        if(!title || !amount || !description || !date || !category || !transactionType){
            return res.status(408).json({
                success: false,
                messages: "Please Fill all fields"
            })
        }

        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }

        let newTransaction = await Transaction.create({
            title: title,
            amount: amount,
            category: category,
            description: description,
            date: date,
            user: userId,
            transactionType: transactionType

        })

        user.transactions.push(newTransaction);

        user.save();

        return res.status(200).json({
            success: true,
            message: "Transaction Added Successfully"
        })


    }catch(err){
        return res.status(401).json({
            success: false,
            messages: err.message
        })
    }
}


export const getAllTransactionController = async (req, res) => {
    try{

        const userId = req.params.id;
        // console.log(userId);

        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        
        const transactions = await Transaction.find({ user: userId });
        
        // console.log(transactions);

        return res.status(200).json({
            success: true,
            transactions: transactions
        });


    }catch(err){
        return res.status(401).json({
            success: false,
            messages: err.message
        })
    }
}


export const deleteTransactionController = async (req, res) => {
    try{

        const transactionId = req.params.id;
        const userId = req.body.userId;

        console.log(transactionId, userId);

        const user = await User.findById(userId);

        
        if(!user){
            return res.status(400).json({
                success: false,
                message: "User not found"
            })
        }
        const transactionElement = await Transaction.findByIdAndDelete(transactionId);

        if(!transactionElement){
            return res.status(400).json({
                success: false,
                message: "transaction not found"
            })
        }

        const transactionArr = user.transactions.filter((transaction) => transaction._id === transactionId);
        

        user.transactions = transactionArr;

        user.save();

        // await transactionElement.remove();

        return res.status(200).json({
            success: true,
            message: `Transaction successfully deleted`,
        })


    }catch(err){
        return res.status(401).json({
            success: false,
            messages: err.message
        })
    }
}