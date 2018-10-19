String//import * as mongoose from 'mongoose';
import {Document, model, Model, Schema} from 'mongoose';

import {IPointDocument} from './Documents';

const pointSchema = new Schema({
	name: {type: String, required: true},
	description: String,
	category: String,
	address: String,
	latitude: Number,
	longitude: Number,
	survivors: Number,
	contact: String,
	phone: String,
	notes: String,
	verified: Boolean,
	verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
	user: { type: Schema.Types.ObjectId}, 
	createdAt: Date,
	modifiedAt: Date,
	demands: [{ type: Schema.Types.ObjectId}],
	supply: [{ type: Schema.Types.ObjectId}],
	demographies: [{ type:Schema.Types.ObjectId}],
	activities: [{ type: Schema.Types.ObjectId}],
});

const PointModel: Model<IPointDocument> = model<IPointDocument>('Point', pointSchema);

export default PointModel;