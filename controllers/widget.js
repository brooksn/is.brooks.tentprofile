$.init = function(params) {
	$.title.setText('');
	$.entity.setText('');
	$.bio.setText('');
	var entity = Alloy.createModel('entity');
	entity.fetch({
		query : 'SELECT * FROM entities WHERE entity="' + params.entity + '" LIMIT 1'
	});
	var entityjson = entity.toJSON();
	if (entityjson.name) {
		$.title.setText(entityjson.name);
	} else {
		if (params.entity.substr(0, 8) === 'https://') {
			$.title.setText(params.entity.substr(8));
		} else if (params.entity.substr(0, 7) === 'http://') {
			$.title.setText(params.entity.substr(7));
		}
	}
	if (params.image) {
		$.avatar.setImage(params.image);
	} else if (entityjson.local_avatar) {
		$.avatar.setImage(Titanium.Filesystem.applicationDataDirectory + entityjson.local_avatar);
	} else {
		$.avatar.setImage(WPATH('profile.png'));
	}
	if (entityjson.bio) {
		$.bio.setText(entityjson.bio);
	} else {
		$.bio.setText('');
	}
	$.entity.setText(params.entity);
};
$.bringToFront = function() {
	$.container.setZIndex(10);
};
$.show = function() {
	$.container.show();
};
$.hide = function() {
	$.container.hide();
};
function containerClick(e) {
	if (e.source.id === 'container' || e.source.id === 'shadow') {
		$.container.hide();
	}
}
