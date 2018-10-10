import {Document, model, Model, Schema} from 'mongoose';

import {IDemandDocument} from './Documents';

const demandSchema = new Schema({
	name: String,
	qty: Number,
	unit: String,
	createdAt: String,
	modifiedAt: String,
	verified: Boolean,
	closed: Boolean,
	point: { type: Schema.Types.ObjectId, ref: 'Point' },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const DemandModel:Model<IDemandDocument> = model<IDemandDocument>('Demand', demandSchema);

export default DemandModel;