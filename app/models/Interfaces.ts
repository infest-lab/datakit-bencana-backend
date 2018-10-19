interface IPoint {
	name: String;
	description: String;
	category: String;
	address: String;
	latitude: Number;
	longitude: Number;
	survivors: Number;
	contact: String;
	phone: String;
	notes: String;
	verified: Boolean;
	verifiedBy: String;
	user: String;
	createdAt: Date;
	modifiedAt: Date;
}

interface IDemand {
	name: String;
	qty: Number;
	unit: String;
	verified: Boolean;
	verifiedBy: String;
	closed: Boolean;
	closedBy: String;
	user: String;
	point: String;
	createdAt: Date;
	modifiedAt: Date;
}

interface ISupply{
	name: String;
	qty: Number;
	unit: String;
	verified: Boolean;
	verifiedBy: String;
	user: String;
	point: String;
	createdAt: String;
	modifiedAt: String;
}

interface IActivity{
	name: String;
	description: String;
	date: String;
	verified: Boolean;
	verifiedBy: String;
	user: String;
	point: String;
	createdAt: Date;
	modifiedAt: Date;
}

interface IDemography{
	male: Number;
	female: Number;
	difable: Number;
	children: Number;
	lansia: Number;
	adult: Number;
	verified: Boolean;
	verifiedBy: String;
	user: String;
	point: String;
	createdAt: Date;
	modifiedAt: Date;
}
interface IUserProfile{
	gender: String;
	nickname: String;
	picture: String;
	sub: String;
}
interface IUser{
	name: String;
	email: String;
	phone: String;
	profile: IUserProfile;
	createdAt: Date;
	modifiedAt: Date;
}

interface ICategory{
	_id: String
	pointCount: Number
}

export {
	IPoint,
	IDemand,
	ISupply,
	IActivity,
	IDemography,
	IUserProfile,
	IUser,
	ICategory
}
//export default IPerson