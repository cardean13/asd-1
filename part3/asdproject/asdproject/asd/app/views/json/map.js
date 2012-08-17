function (doc) {
	if (doc._id.substr(0,7) === "contact"){
		emit(doc._id, {
			"fname": doc.fname,
			"lname": doc.lname,
			"dname": doc.dname
		});
	}
};