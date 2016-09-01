/**
 *
 * Reference Code
 *
 * BoundMomentumEasing API
 *
 * */

window.BoundMomentumEasing = function() {
    
    var me = this ;
    
    me.momentum = new MomentumEasing,
    me.bounce = new BounceEasing;
};

BoundMomentumEasing.prototype.__proto__ = Easing.prototype ;

~function() {

	var proto = this;

	proto.minVelocity = .01,
	proto.minMomentumValue = 0,
	proto.maxMomentumValue = 0;

	proto.setStartTime = function(startTime){
	    
	    var me = this ;
	    
	    me.momentum.startTime = startTime,
	    me.startTime = startTime;
	}

	proto.isEnded = function(){
	    
	    var me = this,
	        momentum = me.momentum;
	    
	    if(!me.isOutOfBound){
	        
	        if(Math.abs(momentum.velocity) < me.minVelocity){
	            
	            return true ;
	        }
	    }
	    
	    if(me.isBouncingBack){
	        
	        if (Math.round(me.bounce.getValue()) === (momentum.startVelocity > 0 ? me.minMomentumValue :  me.maxMomentumValue)){

	            return true ;
	        }
	    }
	    
	    return false ;
	}

	proto.reset = function(){
	    
	    var me = this ;
	    
	    me.lastValue = null;

	    me.isBouncingBack = false;

	    me.isOutOfBound = false;
	}
	    
	proto.getValue = function(){
	    
	    var me = this,
	        momentum = me.momentum,
	        bounce = me.bounce,
	        startVelocity = momentum.startVelocity,
	        direction = startVelocity > 0 ? 1 : -1,
	        minValue = me.minMomentumValue,
	        maxValue = me.maxMomentumValue,
	        boundedValue = (direction == 1) ? minValue : maxValue,
	        lastValue = me.lastValue,
	        value, velocity;
	    
	    if (startVelocity === 0){
	        
	        return me.startValue;
	    }
	    
	    if (!me.isOutOfBound){
	        
	        value = momentum.getValue();
	        velocity = momentum.velocity;
	        
	        if(maxValue === undefined){
	            
	            if(value > minValue){
	                
	                return value ;
	            }
	        }

	        if (value >= minValue && value <= maxValue){
	            
	            return value;
	        }

	        me.isOutOfBound = true;
	 
	        bounce.startTime = Date.now(),
	        bounce.startVelocity = velocity,
	        bounce.startValue = boundedValue;
	    }
	    
	    value = bounce.getValue();

	    if (!me.isEnded()){
	        
	        if (!me.isBouncingBack){
	            
	            if (lastValue !== null){
	                
	                if ((direction == 1 && value < lastValue) || (direction == -1 && value > lastValue)) {
	                    
	                    me.isBouncingBack = true;
	                    
	                }
	            }
	            
	        }
	    }

	    me.lastValue = value;

	    return value;
	}

}.call(BoundMomentumEasing.prototype);
