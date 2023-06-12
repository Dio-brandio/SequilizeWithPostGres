'use strict';

module.exports = {
	OK: {code:200,message:"Success"},
	EntryCreated: {code:201,message:"Successfully created"},
	BadRequest: {code:400,message:"Bad request"},
	Unauthorized: {code:401,message:"You are Unauthorized"},
	Forbidden: {code:403,message:"This is forbidden"},
	ResourceNotFound: {code:404,message:"Not Found"},
	MethodNotAllowed: {code:405,message:"Method not allowed"},
	Conflict: {code:409,message:"Some Confilec has occurred"},
	TokenInvalid: {code:412,message:"Token is invalid"},
	CouponInvalid: {code:501,message:"Invalid coupon"},
	InternalServer: {code:500,message:"There is server error"},
	Invalid:{code:402,message:"Invalid"},
	NotActive:{code:406,message:"Not active"},
	Banned:{code:511,message:"Banned"},
	NotApproved:{code:408,message:"Not approved"},
	NoService: {code:502,message:"Service not available"},
	InvalidOTP: {code:503,message:"OTP is invalid"},
	MobileNotVerified: {code:504,message:"Mobile Number is not verified"},
	Caching: {code:508,message:"Cache"},
	DistanceLimit: {code:429,message:"Distance"},
	Insufficient: {code:510,message:"Insufficient"},
};