import * as mongoose from 'mongoose';
const moment = require('moment-timezone');

import {IActivity} from './Interfaces';
import {IActivityDocument, IUserDocument} from './Documents';
import ActivityModel from './ActivityModel';
import UserModel from './UserModel';

class ActivityService {
    constructor(private ActivityModel: mongoose.Model<IActivityDocument>, private UserModel: mongoose.Model<IUserDocument>) {
        moment.tz.setDefault("Asia/Jakarta");
    }
    getDate(){ 
        return moment().format('YYYY-MM-DDTHH:mm:ssZ');
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
    verify(id:string, user:string){
    	return this.ActivityModel.findById(id)
    	.then(activity=>{
            if(user != activity.user){
                activity.verified = true;
                activity.verifiedBy = user;
                activity.modifiedAt = this.getDate();
                return activity.save();
            }/*else return new Error('Error verify');*/		
    	})/*.catch((err:any)=>{
    		if(err) return new Error('Error verify');
    	})*/
    }
    getUser(id:string){
    	return this.UserModel.findById(id);
    }
    byPoint(id:string){
        return this.ActivityModel.find({point:id}).sort({_id: -1});
    }
}

export default new ActivityService(ActivityModel, UserModel);