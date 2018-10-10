import * as mongoose from 'mongoose';
let moment = require('moment-timezone');

import {IActivity} from './Interfaces';
import {IActivityDocument, IUserDocument} from './Documents';
import ActivityModel from './ActivityModel';
import UserModel from './UserModel';

class ActivityService {
    constructor(private ActivityModel: mongoose.Model<IActivityDocument>, private UserModel: mongoose.Model<IUserDocument>) {
        moment.tz.setDefault("Asia/Jakarta");
    }
    getDate(){ 
        return moment().format('YYYY-MM-DDTHH:mm:ssZz');
    }
    get(id:string){
    	return this.ActivityModel.findById(id);
    }
    getAll(){
        return this.ActivityModel.find();
    }
    add(activity:IActivity){
    	activity.verified = false;
		activity.createdAt = this.getDate();
		activity.modifiedAt = this.getDate();
    	return this.ActivityModel.create(activity);
    }
    verify(id:string){
    	return this.ActivityModel.findById(id)
    	.then(activity=>{
    		activity.verified = true;
    		activity.modifiedAt = this.getDate();
    		return activity.save();
    	}).catch(err=>{
    		return false;
    	})
    }
    getUser(id:string){
    	return this.UserModel.findById(id);
    }
    byPoint(id:string){
        return this.ActivityModel.find({point:id}).sort({_id: -1});
    }
}

export default new ActivityService(ActivityModel, UserModel);