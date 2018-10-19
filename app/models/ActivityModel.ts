import {Document, model, Model, Schema} from 'mongoose';
import {IActivityDocument} from './Documents';

const activitySchema = new Schema({
	name: String,
	description: String,
	date: Date,
	createdAt: Date,
	modifiedAt: Date,
	verified: Boolean,
	verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
	point: { type: Schema.Types.ObjectId, ref: 'Point' },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const ActivityModel: Model<IActivityDocument> = model<IActivityDocument>('Activity', activitySchema);

export default ActivityModel;