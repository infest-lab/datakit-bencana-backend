import * as mongoose from 'mongoose';
import {
	IPoint,
	IDemand,
	ISupply,
	IActivity,
	IDemography,
	IUserProfile,
	IUser
} from './Interfaces';

interface IPointDocument extends IPoint, mongoose.Document {}
interface IDemandDocument extends IDemand, mongoose.Document {}
interface ISupplyDocument extends ISupply, mongoose.Document {}
interface IActivityDocument extends IActivity, mongoose.Document {}
interface IDemographyDocument extends IDemography, mongoose.Document {}
interface IUserProfileDocument extends IUserProfile, mongoose.Document {}
interface IUserDocument extends IUser, mongoose.Document {}

export {
	IPointDocument,
	IDemandDocument,
	ISupplyDocument,
	IActivityDocument,
	IDemographyDocument,
	IUserProfileDocument,
	IUserDocument
}