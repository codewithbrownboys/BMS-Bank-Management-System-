const mongoose = require("mongoose")


const ledgerSchema = new mongoose.Schema({
    account : {
        type : mongoose.Schema.Types.ObjectId,
        ref:"account",
        required:[true,"ledger is present here"],
        index:true,
        immutable:true


    },
amount : {
    type:Number,
    required:true,
    immutable:true


},

transaction:{
  type:mongoose.Schema.Types.ObjectId,
  required:[true,"ledger must be associated with the transaction"],
  ref:"transaction",
  index:true,
  immutable:true
},

type:{
    type: String,
    enums:{
        values:["CREDIT","DEBIT"],
        message: "important message need to be read"
    },
    required:[true,"type is important"],
    immutable:true
    
    
}


})

function preventledermodification(){
    throw new error("ledger import are immutable you cannot change ")

}

ledgerSchema.pre("findoneAndUpdtae",preventledermodification);
ledgerSchema.pre("deleteOne",preventledermodification);
ledgerSchema.pre("deleteOne",preventledermodification);
ledgerSchema.pre("remove",preventledermodification);
ledgerSchema.pre("updateMany",preventledermodification);
ledgerSchema.pre("deleteMany",preventledermodification);


const ledgerModel = mongoose.model('ledger',ledgerSchema);

module.exports = ledgerModel;