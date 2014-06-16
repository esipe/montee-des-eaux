var mapPanel, tree, address_ip;

address_ip = "http://mapserver.esipe.geonef.fr/montee-des-eaux/project";

function waterLevel(name, layer){
	return new OpenLayers.Layer.WMS(name,
        address_ip, {
            layers: layer,
            transparent: true,
            format: "image/png"
        }, {
                isBaseLayer: false,
                buffer: 0
            }
    );
}

var waterLevel10 = waterLevel("Niveau Eau &agrave; 10 m&egrave;tres","Niveau 10");
waterLevel10.setVisibility(false);

var waterLevel20 = waterLevel("Niveau Eau &agrave; 20 m&egrave;tres","Niveau 20");
waterLevel20.setVisibility(false);

var waterLevel30 = waterLevel("Niveau Eau &agrave; 30 m&egrave;tres","Niveau 30");
waterLevel30.setVisibility(false);

var waterLevel40 = waterLevel("Niveau Eau &agrave; 40 m&egrave;tres","Niveau 40");
waterLevel40.setVisibility(false);

var waterLevel50 = waterLevel("Niveau Eau &agrave; 50 m&egrave;tres","Niveau 50");
waterLevel50.setVisibility(false);

var waterLevel60 = waterLevel("Niveau Eau &agrave; 60 m&egrave;tres","Niveau 60");
waterLevel60.setVisibility(false);

var waterLevel70 = waterLevel("Niveau Eau &agrave; 70 m&egrave;tres","Niveau 70");


Ext.onReady(function() {

    // create a map panel with some layers that we will show in our layer tree
    // below.

    var locationLayer = new OpenLayers.Layer.Vector("Location", {
        styleMap: new OpenLayers.Style({
            externalGraphic: "http://openlayers.org/api/img/marker.png",
            graphicYOffset: -25,
            graphicHeight: 25,
            graphicTitle: "${name}"
        })
    });

    mapPanel = new GeoExt.MapPanel({
        border: true,
        region: "center",
        collapsible: true,
        collapseMode: "mini",
        split: true,
	autoScroll: true,
        // we do not want all overlays, to try the OverlayLayerContainer
        map: new OpenLayers.Map({
			allOverlays: false,
			controls: [
                new OpenLayers.Control.Navigation(),
                new OpenLayers.Control.PanZoom(),
				new OpenLayers.Control.NavToolbar(),
                new OpenLayers.Control.ScaleLine(),
		new OpenLayers.Control.Permalink('permalink'),
                new OpenLayers.Control.MousePosition({
                    prefix: '<div style=\"color: white; font-size: 14px; font-weight: bold; text-align: left;\">Coordonn&eacute;es g&eacute;ographique : ',
                    suffix: '</div>',
                    separator: ' | ',
                    numDigits: 5,
                    emptyString: '<div style=\"color: white; font-size: 14px; font-weight: bold;text-align: left;\">Positionner la fl&eacute;che de la souris sur la carte pour avoir les coordonn&eacute;es</div>'
                }),
                new OpenLayers.Control.OverviewMap({
				layers :[
					new OpenLayers.Layer.WMS(
						"OpenLayers WMS", 
						"http://vmap0.tiles.osgeo.org/wms/vmap0?",
						{layers: 'basic'}
					)
				]
				}),
                new OpenLayers.Control.KeyboardDefaults(),
				new OpenLayers.Control.Attribution()
			]
		}),
        center: [2, 46],
        zoom: 7,
        layers: [
            new OpenLayers.Layer.WMS("Global Imagery",
                "http://maps.opengeo.org/geowebcache/service/wms", {
                    layers: "bluemarble",
		    format: "image/png"
                }
            ),
            locationLayer,
			waterLevel70,
			waterLevel60,
            waterLevel50,
            waterLevel40,
            waterLevel30,
            waterLevel20,
			waterLevel10,
			new OpenLayers.Layer.WMS("Villes",
                	address_ip, {
                    layers: "villes",
                    transparent: true,
                    format: "image/png"
                }, {
                    isBaseLayer: false,
                    buffer: 0
                }
            ),
			new OpenLayers.Layer.WMS("Administrations",
                address_ip, {
                    layers: "admin",
                    transparent: true,
                    format: "image/png"
                }, {
                    isBaseLayer: false,
                    buffer: 0
                }
            ),
			new OpenLayers.Layer.WMS("Nom des Administrations",
                address_ip, {
                    layers: "adminname",
                    transparent: true,
                    format: "image/png"
                }, {
                    isBaseLayer: false,
                    buffer: 0
                }
            ),
			new OpenLayers.Layer.WMS("Pays",
                address_ip, {
                    layers: "pays",
                    transparent: true,
                    format: "image/png"
                }, {
                    isBaseLayer: false,
                    buffer: 0
                }
            ),
	new OpenLayers.Layer.WMS("Nom des pays",
                address_ip, {
                    layers: "paysname",
                    transparent: true,
                    format: "image/png"
                }, {
                    isBaseLayer: false,
                    buffer: 0
                }
            ),
			new OpenLayers.Layer.WMS("Continents",
                address_ip, {
                    layers: "continent",
                    transparent: true,
                    format: "image/png"
                }, {
                    isBaseLayer: false,
                    buffer: 0
                }
            )
        ], 
tbar: [{
            xtype: "gx_geocodercombo",
            hideTrigger: true,
            layer: locationLayer,
            // To restrict the search to a bounding box, uncomment the following
            // line and change the viewboxlbrt parameter to a left,bottom,right,top
            // bounds in EPSG:4326:
            //url: "http://nominatim.openstreetmap.org/search?format=json&viewboxlbrt=15,47,17,49",
            width: 200
        }]
    });

    // create our own layer node UI class, using the TreeNodeUIEventMixin
    var LayerNodeUI = Ext.extend(GeoExt.tree.LayerNodeUI, new GeoExt.tree.TreeNodeUIEventMixin());
        
    // using OpenLayers.Format.JSON to create a nice formatted string of the
    // configuration for editing it in the UI
	var treeConfig = [{
			nodeType: "gx_baselayercontainer",
			text: 'Fond de carte'
		}, {
			nodeType: "gx_overlaylayercontainer",
			text: 'Couches de base',
			expanded: true,
			// render the nodes inside this container with a radio button,
			// and assign them the group "foo".
			loader: {
				baseAttrs: {
					radioGroup: "foo",
					uiProvider: "layernodeui"
				}
			}
		}
    ];
    // The line below is only needed for this example, because we want to allow
    // interactive modifications of the tree configuration using the
    // "Show/Edit Tree Config" button. Don't use this line in your code.


    var legendPanel = new GeoExt.LegendPanel({
        defaults: {
            labelCls: 'mylabel',
            style: 'padding:5px'
        },
        bodyStyle: 'padding:5px',
        width: 220,
        autoScroll: true,
        region: 'west',
		renderTo: "map"
    });

    treeConfig = new OpenLayers.Format.JSON().write(treeConfig, true);
	
	var tree = new Ext.tree.TreePanel({
        border: true,
        region: "west",
        title: "L&eacute;gende",
        width: 250,
        split: true,
        collapsible: true,
        collapseMode: "mini",
	contentEl: "map",
        autoScroll: true,
        // apply the tree node component plugin to layer nodes
        plugins: [
			{ptype: "gx_treenodecomponent"}
        ],
        loader: new Ext.tree.TreeLoader({
            // applyLoader has to be set to false to not interfer with loaders
            // of nodes further down the tree hierarchy
            applyLoader: false,
            uiProviders: {
                "layernodeui": LayerNodeUI
            }
        }),
		root: {
            nodeType: "async",
            // the children property of an Ext.tree.AsyncTreeNode is used to
            // provide an initial set of layer nodes. We use the treeConfig
            // from above, that we created with OpenLayers.Format.JSON.write.
            children: Ext.decode(treeConfig)
            // Don't use the line above in your application. Instead, use
            //children: treeConfig
        },
		rootVisible: false,
        lines: false
    });

	
    // dialog for editing the tree configuration
    
    new Ext.Viewport({
        layout: "fit",
        hideBorders: true,
        items: {
            layout: "border",
            deferredRender: false,
            items: [{
				region: "north",
				contentEl: "title",
				height: 250
			},legendPanel, mapPanel, tree,{
                contentEl: "desc",
                region: "east",
                bodyStyle: {"padding": "5px"},
                collapsible: true,
                collapseMode: "mini",
                split: true,
                width: 225,
                title: "D&eacute;scription",
		autoScroll: true
            }]
        }
    });
});