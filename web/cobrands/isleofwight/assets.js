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
    attributes: {
        central_asset_id: 'central_asset_id',
        site_code: 'site_code'
    },
    min_resolution: 0.00001,
    asset_id_field: 'asset_id',
    geometryName: 'msGeometry',
    srsName: "EPSG:27700",
    strategy_class: OpenLayers.Strategy.FixMyStreet,
    body: "Isle of Wight Council"
};

var bin_code_to_type = {
    'DOG': 'dog bin',
    'LITT': 'litter bin'
};

var pin_prefix = fixmystreet.pin_prefix || document.getElementById('js-map-data').getAttribute('data-pin_prefix');

var labeled_default = {
    fillColor: "#FFFF00",
    fillOpacity: 0.6,
    strokeColor: "#000000",
    strokeOpacity: 0.8,
    strokeWidth: 2,
    pointRadius: 6
};

var labeled_select = {
    externalGraphic: pin_prefix + "pin-spot.png",
    fillColor: "#55BB00",
    graphicWidth: 48,
    graphicHeight: 64,
    graphicXOffset: -24,
    graphicYOffset: -56,
    backgroundGraphic: pin_prefix + "pin-shadow.png",
    backgroundWidth: 60,
    backgroundHeight: 30,
    backgroundXOffset: -7,
    backgroundYOffset: -22,
    popupYOffset: -40,
    graphicOpacity: 1.0,

    label: "${asset_id}",
    labelOutlineColor: "white",
    labelOutlineWidth: 3,
    labelYOffset: 65,
    fontSize: '15px',
    fontWeight: 'bold'
};

var labeled_stylemap = new OpenLayers.StyleMap({
  'default': new OpenLayers.Style(labeled_default),
  'select': new OpenLayers.Style(labeled_select)
});

fixmystreet.assets.add($.extend(true, {}, defaults, {
    select_action: true,
    stylemap: labeled_stylemap,
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
    asset_item: "bin",
    filter_key: 'feature_type_code',
    filter_value: 'LITT',
    actions: {
        asset_found: function(asset) {
          var id = asset.attributes.asset_id || '';
          if (id !== '') {
              var code = asset.attributes.feature_type_code;
              var asset_name = bin_code_to_type[code] || this.fixmystreet.asset_item;
              $('.category_meta_message').html('You have selected ' + asset_name + ' <b>' + id + '</b>');
          } else {
              $('.category_meta_message').html('You can pick a <b class="asset-spot">' + this.fixmystreet.asset_item + '</b> from the map &raquo;');
          }
        },
        asset_not_found: function() {
           $('.category_meta_message').html('You can pick a <b class="asset-spot">' + this.fixmystreet.asset_item + '</b> from the map &raquo;');
        }
    }
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
    road: true,
    asset_category: [
      "Pothole"
    ],
    http_options: {
        params: {
            TYPENAME: "carriageways"
        }
    },
    non_interactive: true,
    usrn: {
        attribute: 'central_asset_id',
        field: 'central_asset_id'
    },
    max_resolution: {
        'isleofwight': 6.614596562526458,
        'fixmystreet': 4.777314267158508
    },
    asset_item_message: '',
    stylemap: new OpenLayers.StyleMap({
        'default': new OpenLayers.Style({
            fill: false,
            stroke: false,
        })
    })
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
