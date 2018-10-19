import {Document, model, Model, Schema} from 'mongoose';

import {IDemographyDocument} from './Documents';

const demographySchema = new Schema({
	male: Number,
	female: Number,
	difable: Number,
	children: Number,
	lansia: Number,
	adult: Number,
	createdAt: Date,
	modifiedAt: Date,
	verified: Boolean,
	verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
	point: { type: Schema.Types.ObjectId, ref: 'Point' },
	user: { type: Schema.Types.ObjectId, ref: 'User' },
});

const DemographyModel: Model<IDemographyDocument> = model<IDemographyDocument>('Demography', demographySchema);

export default DemographyModel;