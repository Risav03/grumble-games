import mongoose, {Schema, model, models} from 'mongoose';

interface ILeaderboard extends Document {
    walletId: string;
    username: string;
    time: number;
    expiresAt: Date; // Explicit expiration time
  }

const LeaderboardSchema = new Schema<ILeaderboard>({
    walletId: { type: String, required: true },
    username: { type: String, default: "" },
    time: { type: Number, required: true },
    expiresAt: { 
      type: Date, 
      index: { expires: 0 }, // This creates a TTL index
      default: function() {
        // Set expiration to the end of the current day in GMT
        const expiration = new Date();
        expiration.setUTCHours(24, 0, 0, 0); // Next day at 00:00 GMT
        return expiration;
      }
    }
  }, { 
    collection: "Leaderboard",
    timestamps: true 
  });

  const Leaderboard = models.Leaderboard || model('Leaderboard', LeaderboardSchema);

  export default Leaderboard