(function(){

if (!fixmystreet.maps) {
    return;
}

var defaults = {
    http_options: {
        url: "https://tilma.staging.mysociety.org/mapserver/iow",
        params: {
            SERVICE: "WFS",
            VERSION: "1.1.0",
            REQUEST: "GetFeature",
            SRSNAME: "urn:ogc:def:crs:EPSG::27700"
        }
    },
    format_class: OpenLayers.Format.GML.v3.MultiCurveFix,
    asset_type: 'spot',
    max_resolution: {
        'isleofwight': 0.5291677250021167,
        'fixmystreet': 1.194328566789627
    },
    min_resolution: 0.00001,
    asset_id_field: 'CentralAssetId',
    attributes: {
        central_asset_id: 'CentralAssetId',
        asset_details: 'FeatureId'
    },
    geometryName: 'msGeometry',
    srsName: "EPSG:27700",
    strategy_class: OpenLayers.Strategy.FixMyStreet,
    body: "Isle of Wight Council"
};

fixmystreet.assets.add($.extend(true, {}, defaults, {
    asset_category: [
        "Empty Bin",
        "Litter Bin Overflowing"
    ],
    http_options: {
        params: {
            TYPENAME: "bins"
        }
    },
    max_resolution: {
        'isleofwight': 6.614596562526458,
        'fixmystreet': 4.777314267158508
    },
    usrn: {
        attribute: 'SITE_CODE',
        field: 'site_code'
    },
    asset_item: "bin",
    filter_key: 'feature_type_code',
    filter_value: 'LITT'
}));

fixmystreet.assets.add($.extend(true, {}, defaults, {
    asset_category: [
      "Dog Bin Overflowing"
    ],
    http_options: {
        params: {
            TYPENAME: "bins"
        }
    },
    max_resolution: {
        'isleofwight': 6.614596562526458,
        'fixmystreet': 4.777314267158508
    },
    usrn: {
        attribute: 'SITE_CODE',
        field: 'site_code'
    },
    asset_item: "bin",
    filter_key: 'feature_type_code',
    filter_value: 'DOG'
}));

fixmystreet.assets.add($.extend(true, {}, defaults, {
    asset_category: [
        "Soft Verge Damaged/Overrun"
    ],
    http_options: {
        params: {
            TYPENAME: "verges"
        }
    },
    max_resolution: {
        'isleofwight': 6.614596562526458,
        'fixmystreet': 4.777314267158508
    },
    usrn: {
        attribute: 'SITE_CODE',
        field: 'site_code'
    },
    stylemap: new OpenLayers.StyleMap({
        'default': new OpenLayers.Style({
            stroke: false,
            fillColor: "#FFFF00",
            fillOpacity: 0.5
        })
    }),
    asset_item: "verge",
}));

fixmystreet.assets.add($.extend(true, {}, defaults, {
    http_options: {
        params: {
            TYPENAME: "streets"
        }
    },
    max_resolution: {
        'isleofwight': 6.614596562526458,
        'fixmystreet': 4.777314267158508
    },
    always_visible: true,
    non_interactive: true,
    usrn: {
        attribute: 'SITE_CODE',
        field: 'site_code'
    },
    stylemap: new OpenLayers.StyleMap({
        'default': new OpenLayers.Style({
            fill: false,
            strokeColor: "#5555FF",
            strokeOpacity: 0.1,
            strokeWidth: 7
        })
    })
}));


})();
