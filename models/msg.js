var relativeDate = require('relative-date');
var crypto = require('crypto');

exports.List = function() {
	this.list = [];
	
	this.add = function(message) {
		this.list.unshift(message);
	};
	
	this.getLength = function() {
		return this.list.length;
	};
	
	this.getList = function() {
		return this.list;
	};
};

exports.Message = function(text) {
	this.text = text;
	this.posted_at = new Date();
	this.posted_by = {
		"username": "sylvain",
		"complete_name": "Sylvain Filteau",
		"avatar_url": "http://www.gravatar.com/avatar/" + crypto.createHash('md5').update("cidsphere@gmail.com".toLowerCase()).digest("hex")
	};
	
	this.getFormatedPostedAt = function() {
		var dt = this.posted_at;
		return relativeDate(dt);
	};
}