import * as mongoose from 'mongoose';
const moment = require('moment-timezone');

import {ISupply} from './Interfaces';
import {ISupplyDocument, IUserDocument} from './Documents';
import SupplyModel from './SupplyModel';
import UserModel from './UserModel';

class SupplyService {
    constructor(private SupplyModel: mongoose.Model<ISupplyDocument>, private UserModel: mongoose.Model<IUserDocument>) {
        moment.tz.setDefault("Asia/Jakarta");
    }
    getDate(){ 
        return moment().format('YYYY-MM-DDTHH:mm:ssZz');
    }
    get(id:string){
    	return this.SupplyModel.findById(id);
    }
    getAll(){
        return this.SupplyModel.find();
    }
    add(supply:ISupply){
    	supply.verified = false;
		supply.createdAt = this.getDate();
		supply.modifiedAt = this.getDate();
    	return this.SupplyModel.create(supply);
    }
    verify(id:string){
    	return this.SupplyModel.findById(id)
    	.then(supply=>{
    		supply.verified = true;
    		supply.modifiedAt = this.getDate();
    		return supply.save();
    	}).catch(err=>{
    		return false;
    	})
    }
    getUser(id:string){
    	return this.UserModel.findById(id);
    }
    byPoint(id:string){
        return this.SupplyModel.find({point:id}).sort({_id: -1});
    }
}

export default new SupplyService(SupplyModel, UserModel);