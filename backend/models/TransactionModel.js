import mongoose from "mongoose";


const transactionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
        
    },

    amount: {
        type: Number,
        required: [true, "Amount is required"],
        default: 0,
    },

    category: {
        type: String,
        required: [true, "Category is required"],
        
    },

    description: {
        type: String,
        required: [true, "Description is required"],
        
    },
    transactionType: {
        type: String,
        required: [true, "Transaction Type is required"],
        
    },

    date: {
        type: Date,
        required: [true, "Date is required"],
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    createdAt: {
        type: Date,
        default: new Date(),
    }

});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;