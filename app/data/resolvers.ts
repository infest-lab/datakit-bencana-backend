import PointService from '../models/PointService';
import DemandService from '../models/DemandService';
import SupplyService from '../models/SupplyService';
import ActivityService from '../models/ActivityService';
import DemographyService from '../models/DemographyService';
import UserService from '../models/UserService';
import config from '../config/config';
import { pubsub } from "../index";

const DEMAND_ADDED = 'DEMAND_ADDED';
const SUPPLY_ADDED = 'SUPPLY_ADDED';
const ACTIVITY_ADDED = 'ACTIVITY_ADDED';
const DEMOGRAPHY_ADDED = 'DEMOGRAPHY_ADDED';

function validRequest({headers}: any){
	if(typeof headers['x-api-key'] !== undefined && headers['x-api-key'] !== ''){
		if(config.registeredApiKeys.indexOf(headers['x-api-key']) !== -1) return true;
	}
	return false;
}

const resolvers = {
	Subscription: {
        demandAdded: {
            subscribe: () => pubsub.asyncIterator([DEMAND_ADDED])
        },
        supplyAdded: {
            subscribe: () => pubsub.asyncIterator([SUPPLY_ADDED])
        },
        activityAdded: {
            subscribe: () => pubsub.asyncIterator([ACTIVITY_ADDED])
        },
        demographyAdded: {
            subscribe: () => pubsub.asyncIterator([DEMOGRAPHY_ADDED])
        }
    },
	Query:{
		point(_:any, {id}:any, context:any){
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
			return PointService.get(id);
		},
		points(_:any, args:any, context:any){
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
			
			let params = {
				limit: 50,
				skip: 0,
				orderBy: 'name',
				asc: true
			}
			if(args) params = args;	
			return PointService.list(params);
		},
		search(_:any, args:any, context:any){
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
			
			return PointService.search(args.q);
		},
		pointsByCategory(_:any, {category}: any, context:any){
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
			
			return PointService.byCategory(category);
		},
		getUser(_:any, {email}:any, context:any){
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
			
			return UserService.byEmail(email);
		},
		getUsers(_:any, args:any, context:any){
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
			
			var params = {
				limit: 50,
				skip: 0,
				orderBy: 'name',
				asc: true
			}
			if(args) params = args;
			return UserService.list(params);
		},
		demands(_:any, {pointId}:any, context:any){
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
			
			return DemandService.byPoint(pointId);
		},
		supplies(_:any, {pointId}:any, context:any){
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
			
			return SupplyService.byPoint(pointId);
		},
		activities(_:any, {pointId}:any, context:any){
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
			
			return SupplyService.byPoint(pointId);
		},
		lastDemography(_:any, {pointId}:any, context:any){
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
			
			return DemographyService.last(pointId);
		},
		statistik(_:any, args:any, context:any){
				if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
			
			return PointService.statistik();
		},
	},
	Mutation:{
		createPoint(_:any, {input}:any, context:any){
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
			
			return PointService.add(input);
		},
		addDemand(_:any, {input}:any, context:any){	
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
							
		    return DemandService.add(input).then(created => {
		    	pubsub.publish(DEMAND_ADDED, { demandAdded: created });
		    	return created;
		    }).catch(err=>{
		    	return new Error(err);
		    });
		},
		verifyDemand(_:any, {id}:any, context:any){
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
						
		    return DemandService.verify(id);
		},
		closeDemand(_:any, {id}:any, context:any){	
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
					
		    return DemandService.close(id);
		},
		addSupply(_:any, {input}:any, context:any){
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
			
			return SupplyService.add(input).then(created => {
		    	pubsub.publish(SUPPLY_ADDED, { supplyAdded: created });
		    	return created;
		    });
		},
		verifySupply(_:any, {id}:any, context:any){
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
						
		    return SupplyService.verify(id);
		},
		addActivity(_:any, {input}:any, context:any){
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
			
			pubsub.publish(ACTIVITY_ADDED, { activityAdded: input });
			return ActivityService.add(input).then(created => {
		    	pubsub.publish(ACTIVITY_ADDED, { activityAdded: created });
		    	return created;
		    });
		},
		verifyActivity(_:any, {id}:any, context:any){
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
						
		    return ActivityService.verify(id);
		},
		addDemography(_:any, {input}:any, context:any){
				if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
			
			return DemographyService.add(input).then(created => {
		    	pubsub.publish(DEMOGRAPHY_ADDED, { demographyAdded: created });
		    	return created;
		    });
		},
		verifyDemography(_:any, {id}:any, context:any){	
			if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
				
		    return DemographyService.verify(id);
		},
		createUser(_:any, {input}:any, context:any){
				if(!validRequest(context)) return new Error('Forbidden Access. It needs valid api key for authentication');
			
			return UserService.add(input);
		}		
	},//end of Mutation

	Point:{
		demands(point:any){
			return PointService.getDemands(point._id);
		},
		supplies(point:any){
			return PointService.getSupplies(point._id);
		},
		demographies(point:any){
			return PointService.getDemographies(point._id);
		},
		activities(point:any){
			return PointService.getActivities(point._id);
		},
		lastDemography(point:any){
			return DemographyService.last(point._id);
		}
	},//end of Point

	Demand:{
		user(demand:any){
			return DemandService.getUser(demand.user);
		}
	},
	Supply:{
		user(supply:any){
			return SupplyService.getUser(supply.user);
		}
	},
	Demography:{
		user(demography:any){
			return DemographyService.getUser(demography.user);
		}
	},
	Activity:{
		user(activity:any){
			return ActivityService.getUser(activity.user);
		}
	}
}

export default resolvers;