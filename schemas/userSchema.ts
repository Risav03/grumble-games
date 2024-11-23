import mongoose, {Schema, model, models} from 'mongoose';

type UserType = {
    walletId:string,
    username:string,
    nextGuess:Date,
    points:number
}

const UserSchema = new Schema<UserType>({
    walletId:{type:String, required:true, unique:true},
    username: {type:String, default:""},
    nextGuess: {type:Date},
    points: {type:Number, default:0}
  }, {collection: "User"})

  const User = models.User || model('User', UserSchema);

  export default User