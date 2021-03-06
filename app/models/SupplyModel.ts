import {Document, model, Model, Schema} from 'mongoose';

import {ISupplyDocument} from './Documents';

const supplySchema = new Schema({
	name: String,
	qty: Number,
	unit: String,
	createdAt: Date,
	modifiedAt: Date,
	verified: Boolean,
	verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
	point: { type: Schema.Types.ObjectId, ref: 'Point' },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const SupplyModel: Model<ISupplyDocument> = model<ISupplyDocument>('Supply', supplySchema);

export default SupplyModel;