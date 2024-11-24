import mongoose, {Schema, model, models} from 'mongoose';

type FirstType = {
    walletId:string,
    username:string,
    time:number,
}

const FirstSchema = new Schema<FirstType>({
    walletId:{type:String, required:true, unique:true},
    username: {type:String, default:""},
    time: {type:Number},
  }, {collection: "First"})

  const First = models.First || model('First', FirstSchema);

  export default First