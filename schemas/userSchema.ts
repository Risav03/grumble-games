import mongoose, {Schema, model, models} from 'mongoose';

type UserType = {
    walletId:string,
    username:string,
    lastGuess:Date
}

const UserSchema = new Schema<UserType>({
    walletId:{type:String, required:true},
    username: {type:String, default:""},
    lastGuess: {type:Date}
  }, {collection: "User"})

  const User = models.User || model('User', UserSchema);

  export default User