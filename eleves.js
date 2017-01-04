// Global access
eleves = new Mongo.Collection( "eleves" );

if ( Meteor.isServer )
{
	Meteor.startup
	(
		function ()
		{

		}
	);
}

if ( Meteor.isClient )
{
	Template.eleves.helpers
	( {
		all_eleves : function ()
		{
			return eleves.find();
		}
	} );


    Template.eleves.helpers({
        pathForPost: function() {
            var eleve = this;
            var params = {
                idEleve: eleve._id,
                nomEleve: eleve.name,
                ageEleve: eleve.age
            };

            var routeName = "single";
            var path = FlowRouter.path("/:idEleve", params);

            return path;
        }
    });



    Template.eleves.events
    ({
        'click .but' : function (e, t) {
            dataNom = t.find(".nom");
            dataAge = t.find(".age");

            eleves.insert
            (
                {
                    name : dataNom.value,
                    age : dataAge.value
                }
            );
        },
        'click .suppr' : function (e, t) {
            data = this._id;
            eleves.remove( {_id : data} );
        },
        'click .update' : function (e, t) {
            dataNom = event.target.parentNode.querySelector('.update-nom');
            dataAge = event.target.parentNode.querySelector('.update-age');
            console.log(dataNom);

            eleves.update
            (
                { _id : this._id }
                ,{
                    $set : { name : dataNom.value, age : dataAge.value }
                }
            );
            dataNom.value= "";
            dataAge.value= "";
        }
    });

    FlowRouter.route('/', {
        action: function() {
            BlazeLayout.render("mainLayout", {content: "eleves"});
        }
    });

    FlowRouter.route('/:idEleve', {
        action: function(params) {
            BlazeLayout.render("mainLayout", {content: "eleveSingle"});

            Template.eleveSingle.helpers({
                sidebar: function() {
                    var id = params.idEleve;
                    return eleves.findOne({ _id : id });
                }
            });
        }
    });


}
