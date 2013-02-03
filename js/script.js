$(function() {
	
	var users = {};
	var userLabels = [];
	var searchPeople = _.debounce(function(query, process)
	{
		$.get( $('#country-input').data('source'), { s: query }, function ( data ) 
		{
			users = {};
			userLabels = [];

			data = $.parseJSON(data);

			_.each( data, function( item, ix, list )
			{
				if ( _.contains( users, item.label ) )
				{
					item.label = item.label + ' #' + item.id;
				}

				users[ item.label ] = {
					label: item.label,
					id: item.id,
					name: item.id + ', ' + item.label,
					email: item.email,
					photo: item.photo,
				}

				userLabels.push( item.label );
			});
			if (userLabels.length == 0) $("#country-input").css('background-image','url("img/cross.png")');
			else $("#country-input").css('background-image','url("img/tick.png")');
			process( userLabels );
			
		});
	}, 300);

	$( "#country-input" ).typeahead({
		matcher: function () { return true; },
		source: function ( query, process ) {
			$("#country-input").css('background-image','url("img/ajax-loader.gif")');
			searchPeople( query, process);
		},
		updater: function (item)
		{
			$('#countryName').val( users[ item ].label );
			$('#countryEmail').val( users[ item ].email );
			$('#countryId').val( users[ item ].id );

			return item;
		},
		highlighter: function(item)
		{
			var p = users[ item ];
			var itm = ''
				+ "<div class='typeahead_wrapper'>"
				+ "<img class='typeahead_photo' src='" + p.photo + "' />"
				+ "<div class='typeahead_labels'>"
				+ "<div class='typeahead_primary'>" + p.name + "</div>"
				+ "<div class='typeahead_secondary'>" + p.email + "</div>"
				+ "</div>"
				+ "</div>";
			return itm;
		}
	});
});