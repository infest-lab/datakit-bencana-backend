import {Document, model, Model, Schema} from 'mongoose';

import {IUserDocument} from './Documents';

const UserProfileSchema = new Schema({
	gender: String,
	nickname: String,
	picture: String,
	sub: String,
	updated_at: Date
});
const UserSchema = new Schema({
	name: String,
	email: String,
	phone: String,
	profile: UserProfileSchema,
	createdAt: String,
	modifiedAt: String,
	verified: Boolean
});

const UserModel: Model<IUserDocument> = model<IUserDocument>('User', UserSchema);

export default UserModel;