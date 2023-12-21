import mongoose, { Schema } from 'mongoose';
import aggregatePaginate from 'mongoose-aggregate-paginate-v2';

const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
      require: [true, 'is requied'],
    },
    thumnail: {
      type: String,
    },
    deiscription: {
      type: String,
    },
    duration: {
      type: String,
    },
    view: {
      type: String,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

videoSchema.plugin(aggregatePaginate);
export const Video = mongoose.model('Video', videoSchema);
