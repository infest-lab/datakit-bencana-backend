import * as mongoose from 'mongoose';
const moment = require('moment-timezone');

import {IDemography} from './Interfaces';
import {IDemographyDocument, IUserDocument} from './Documents';
import DemographyModel from './DemographyModel';
import UserModel from './UserModel';

class DemographyService {
    constructor(private DemographyModel: mongoose.Model<IDemographyDocument>, private UserModel: mongoose.Model<IUserDocument>) {
        moment.tz.setDefault("Asia/Jakarta");
    }
    getDate(){ 
        return moment().format('YYYY-MM-DDTHH:mm:ssZ');
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
    verify(id:string, user:string){
    	return this.DemographyModel.findById(id)
    	.then(biography=>{
            if(user != biography.user){
                biography.verified = true;
                biography.verifiedBy = user;
                biography.modifiedAt = this.getDate();
                return biography.save();
            }else return new Error('Error verify');  		
    	}).catch((err:any)=>{
    		if(err) return new Error('Error verify');
    	})
    }
    getUser(id:string){
    	return this.UserModel.findById(id);
    }
    last(pointId:string){
        return this.DemographyModel.find({point:pointId}).sort({_id:-1})
        .then(demo => {
            return demo[0];
        });
    }
}

export default new DemographyService(DemographyModel, UserModel);