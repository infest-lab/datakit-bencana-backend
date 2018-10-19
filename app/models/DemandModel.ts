import {Document, model, Model, Schema} from 'mongoose';

import {IDemandDocument} from './Documents';

const demandSchema = new Schema({
	name: String,
	qty: Number,
	unit: String,
	createdAt: Date,
	modifiedAt: Date,
	verified: Boolean,
	verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
	closed: Boolean,
	closedBy: { type: Schema.Types.ObjectId, ref: 'User' },
	point: { type: Schema.Types.ObjectId, ref: 'Point' },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const DemandModel:Model<IDemandDocument> = model<IDemandDocument>('Demand', demandSchema);

export default DemandModel;