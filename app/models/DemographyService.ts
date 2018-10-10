import * as mongoose from 'mongoose';
let moment = require('moment-timezone');

import {IDemography} from './Interfaces';
import {IDemographyDocument, IUserDocument} from './Documents';
import DemographyModel from './DemographyModel';
import UserModel from './UserModel';

class DemographyService {
    constructor(private DemographyModel: mongoose.Model<IDemographyDocument>, private UserModel: mongoose.Model<IUserDocument>) {
        moment.tz.setDefault("Asia/Jakarta");
    }
    getDate(){ 
        return moment().format('YYYY-MM-DDTHH:mm:ssZz');
    }
    get(id:string){
    	return this.DemographyModel.findById(id);
    }
    getAll(){
        return this.DemographyModel.find();
    }
    add(biography:IDemography){
    	biography.verified = false;
		biography.createdAt = this.getDate();
		biography.modifiedAt = this.getDate();
    	return this.DemographyModel.create(biography);
    }
    verify(id:string){
    	return this.DemographyModel.findById(id)
    	.then(biography=>{
    		biography.verified = true;
    		biography.modifiedAt = this.getDate();
    		return biography.save();
    	}).catch(err=>{
    		return false;
    	})
    }
    getUser(id:string){
    	return this.UserModel.findById(id);
    }
}

export default new DemographyService(DemographyModel, UserModel);