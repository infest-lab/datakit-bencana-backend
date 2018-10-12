import * as mongoose from 'mongoose';
const moment = require('moment-timezone');

import {
	IPoint,
	IDemand,
	ISupply,
	IActivity,
	IDemography,
	IUserProfile,
	IUser
} from './Interfaces';
import {
	IPointDocument,
	IDemandDocument,
	ISupplyDocument,
	IActivityDocument,
	IDemographyDocument,
	IUserProfileDocument,
	IUserDocument
} from './Documents';

import PointModel from './PointModel';
import DemandModel from './DemandModel';
import SupplyModel from './SupplyModel';
import ActivityModel from './ActivityModel';
import DemographyModel from './DemographyModel';
import UserModel from './UserModel';

class PointService {
    constructor(
    	private PointModel: mongoose.Model<IPointDocument>,
    	private DemandModel: mongoose.Model<IDemandDocument>,
    	private SupplyModel: mongoose.Model<ISupplyDocument>,
    	private ActivityModel: mongoose.Model<IActivityDocument>,
    	private DemographyModel: mongoose.Model<IDemographyDocument>,
    	private UserModel: mongoose.Model<IUserDocument>
    ) {
        moment.tz.setDefault("Asia/Jakarta");
    }
    getDate(){ 
        return moment().format('YYYY-MM-DDTHH:mm:ssZz');
    }
    add(point:IPoint){
    	return this.PointModel.create(point);
    }
    get(id:string){
    	return this.PointModel.findById(id);
    }
    list({ skip = 0, limit = 50 , orderBy = 'name', asc = true} = {}){
		return this.PointModel.find().sort({ orderBy: (asc) ? 1:-1 })
		.skip(+skip)
		.limit(+limit);
    }
    getAll(){
        return this.PointModel.find();
    }
    search(q:string){    	
    	return this.PointModel.find({
    		$or:[
    			{name: new RegExp('^'+q+'$', "i")},
    			{address:new RegExp('^'+q+'$', "i")},
    			{description:new RegExp('^'+q+'$', "i")}
    		]});
    }
    byCategory(category:string){
    	return this.PointModel.find({category: category});
    }
    getDemands(id:string){
    	return this.DemandModel.find({point:id});
    }
    getSupplies(id:string){
    	return this.SupplyModel.find({point:id});
    }
    getActivities(id:string){
    	return this.ActivityModel.find({point:id});
    }
    getDemographies(id:string){
    	return this.DemographyModel.find({point:id});
    }
    statistik(){
        return {
            pointsCount: this.PointModel.countDocuments(),
            demandsCount: this.DemandModel.countDocuments(),
            suppliesCount: this.SupplyModel.countDocuments(),
            activitiesCount: this.ActivityModel.countDocuments()
        }
    }    

}

export default new PointService(
	PointModel,
	DemandModel,
	SupplyModel,
	ActivityModel,
	DemographyModel,
	UserModel
);