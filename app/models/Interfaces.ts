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
	user: String;
	createdAt: String;
	modifiedAt: String;
}

interface IDemand {
	name: String;
	qty: Number;
	unit: String;
	verified: Boolean;
	closed: Boolean;
	user: String;
	point: String;
	createdAt: String;
	modifiedAt: String;
}

interface ISupply{
	name: String;
	qty: Number;
	unit: String;
	verified: Boolean;
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
	user: String;
	point: String;
	createdAt: String;
	modifiedAt: String;
}

interface IDemography{
	male: Number;
	female: Number;
	difable: Number;
	children: Number;
	lansia: Number;
	adult: Number;
	verified: Boolean,
	user: String;
	point: String;
	createdAt: String;
	modifiedAt: String;
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
	createdAt: String;
	modifiedAt: String;
}

export {
	IPoint,
	IDemand,
	ISupply,
	IActivity,
	IDemography,
	IUserProfile,
	IUser
}
//export default IPerson