{
    "version": 8,
    "container": "map",
    "name": "Basic Template",
    "metadata": {
        "mapbox:origin": "basic-template-v1",
        "mapbox:autocomposite": true,
        "mapbox:type": "template",
        "mapbox:sdk-support": {
            "js": "0.46.0",
            "android": "6.0.0",
            "ios": "4.0.0"
        }
    },
    "center": [2.3176, 48.8665],
    "zoom": 12,
    "bearing": 0,
    "pitch": 0,
    "sources": {
        "china": {
            "type": "vector",
            "scheme": "tms",
            "tiles": [
                "../maptile/{z}/{x}/{y}.pbf"
            ]
        }
    },
    "sprite": "../sprites/sprites/sprite",
    "glyphs": "../fonts/{fontstack}/{range}.pbf",
    "layers": [
        {
            "id": "background",
            "type": "background",
            "layout": {},
            "paint": {
                "background-color": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    5,
                    "hsl(38, 43%, 89%)",
                    7,
                    "hsl(38, 48%, 86%)"
                ]
            }
        },
        {
            "id": "national_park",
            "type": "fill",
            "source": "mapbox-streets",
            "source-layer": "landuse_overlay",
            "filter": ["==", "class", "national_park"],
            "layout": {},
            "paint": {
                "fill-color": "hsl(78, 51%, 73%)",
                "fill-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    5,
                    0,
                    6,
                    0.5
                ]
            }
        },
        {
            "id": "landuse",
            "type": "fill",
            "source": "mapbox-streets",
            "source-layer": "landuse",
            "filter": ["in", "class", "hospital", "park", "pitch", "school"],
            "layout": {},
            "paint": {
                "fill-color": [
                    "match",
                    ["get", "class"],
                    "park",
                    "hsl(78, 51%, 73%)",
                    "pitch",
                    "hsl(78, 51%, 73%)",
                    "hospital",
                    "hsl(0, 56%, 89%)",
                    "school",
                    "hsl(25, 45%, 85%)",
                    "hsla(0, 0%, 0%, 0)"
                ],
                "fill-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    5,
                    0,
                    6,
                    1
                ]
            }
        },
        {
            "id": "waterway",
            "type": "line",
            "source": "mapbox-streets",
            "source-layer": "waterway",
            "minzoom": 8,
            "filter": [
                "all",
                ["==", "$type", "LineString"],
                ["in", "class", "canal", "river"]
            ],
            "layout": {"line-join": "round", "line-cap": "round"},
            "paint": {
                "line-color": "hsl(205, 76%, 70%)",
                "line-width": [
                    "interpolate",
                    ["exponential", 1.3],
                    ["zoom"],
                    8.5,
                    0.1,
                    20,
                    8
                ],
                "line-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    8,
                    0,
                    8.5,
                    1
                ]
            }
        },
        {
            "id": "water",
            "type": "fill",
            "source": "mapbox-streets",
            "source-layer": "water",
            "layout": {},
            "paint": {
                "fill-color": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    5,
                    "hsl(205, 76%, 67%)",
                    7,
                    "hsl(205, 76%, 70%)"
                ]
            }
        },
        {
            "id": "aeroway-polygon",
            "type": "fill",
            "source": "mapbox-streets",
            "source-layer": "aeroway",
            "filter": [
                "all",
                ["==", "$type", "Polygon"],
                ["in", "type", "helipad", "runway", "taxiway"]
            ],
            "layout": {},
            "paint": {"fill-color": "hsl(0, 0%, 77%)"}
        },
        {
            "id": "aeroway-line",
            "type": "line",
            "source": "mapbox-streets",
            "source-layer": "aeroway",
            "filter": [
                "all",
                ["==", "$type", "LineString"],
                ["in", "type", "runway", "taxiway"]
            ],
            "layout": {},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    10,
                    0.5,
                    18,
                    20
                ],
                "line-color": "hsl(0, 0%, 77%)"
            }
        },
        {
            "id": "building",
            "type": "fill",
            "source": "mapbox-streets",
            "source-layer": "building",
            "minzoom": 15,
            "filter": [
                "all",
                ["!=", "type", "building:part"],
                ["==", "underground", "false"]
            ],
            "layout": {},
            "paint": {
                "fill-color": "hsl(38, 28%, 77%)",
                "fill-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    15.5,
                    0,
                    16,
                    1
                ]
            }
        },
        {
            "id": "pedestrian-path",
            "type": "line",
            "source": "mapbox-streets",
            "source-layer": "road",
            "minzoom": 14,
            "filter": [
                "all",
                ["==", "$type", "LineString"],
                [
                    "all",
                    ["!=", "type", "platform"],
                    ["in", "class", "path", "pedestrian"]
                ]
            ],
            "layout": {"line-join": "round", "line-cap": "round"},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    14,
                    [
                        "match",
                        ["get", "class"],
                        "pedestrian",
                        1,
                        "path",
                        0.75,
                        0.75
                    ],
                    20,
                    ["match", ["get", "class"], "pedestrian", 8, "path", 5, 5]
                ],
                "line-color": [
                    "match",
                    ["get", "type"],
                    "sidewalk",
                    "hsl(38, 35%, 80%)",
                    "crossing",
                    "hsl(38, 35%, 80%)",
                    "hsl(38, 28%, 70%)"
                ]
            }
        },
        {
            "id": "tunnel",
            "type": "line",
            "source": "mapbox-streets",
            "source-layer": "road",
            "filter": [
                "all",
                ["==", "$type", "LineString"],
                [
                    "all",
                    ["!=", "type", "service:parking_aisle"],
                    ["==", "structure", "tunnel"],
                    [
                        "in",
                        "class",
                        "link",
                        "motorway",
                        "motorway_link",
                        "primary",
                        "secondary",
                        "service",
                        "street",
                        "street_limited",
                        "tertiary",
                        "track",
                        "trunk"
                    ]
                ]
            ],
            "layout": {"line-join": "round"},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    [
                        "match",
                        ["get", "class"],
                        "motorway",
                        0.5,
                        "trunk",
                        0.5,
                        "primary",
                        0.5,
                        "secondary",
                        0.01,
                        "tertiary",
                        0.01,
                        "street",
                        0,
                        "street_limited",
                        0,
                        "motorway_link",
                        0,
                        "service",
                        0,
                        "track",
                        0,
                        "link",
                        0,
                        0
                    ],
                    12,
                    [
                        "match",
                        ["get", "class"],
                        "motorway",
                        3,
                        "trunk",
                        3,
                        "primary",
                        3,
                        "secondary",
                        2,
                        "tertiary",
                        2,
                        "street",
                        0.5,
                        "street_limited",
                        0.5,
                        "motorway_link",
                        0.5,
                        "service",
                        0,
                        "track",
                        0,
                        "link",
                        0,
                        0
                    ],
                    18,
                    [
                        "match",
                        ["get", "class"],
                        "motorway",
                        30,
                        "trunk",
                        30,
                        "primary",
                        30,
                        "secondary",
                        24,
                        "tertiary",
                        24,
                        "street",
                        12,
                        "street_limited",
                        12,
                        "motorway_link",
                        12,
                        "service",
                        10,
                        "track",
                        10,
                        "link",
                        10,
                        10
                    ]
                ],
                "line-color": [
                    "match",
                    ["get", "class"],
                    "street",
                    "hsl(38, 100%, 98%)",
                    "street_limited",
                    "hsl(38, 100%, 98%)",
                    "service",
                    "hsl(38, 100%, 98%)",
                    "track",
                    "hsl(38, 100%, 98%)",
                    "link",
                    "hsl(38, 100%, 98%)",
                    "hsl(0, 0%, 100%)"
                ],
                "line-dasharray": [0.2, 0.2]
            }
        },
        {
            "id": "road",
            "type": "line",
            "source": "mapbox-streets",
            "source-layer": "road",
            "filter": [
                "all",
                ["==", "$type", "LineString"],
                [
                    "all",
                    ["!=", "type", "service:parking_aisle"],
                    ["!in", "structure", "bridge", "tunnel"],
                    [
                        "in",
                        "class",
                        "link",
                        "motorway",
                        "motorway_link",
                        "primary",
                        "secondary",
                        "service",
                        "street",
                        "street_limited",
                        "tertiary",
                        "track",
                        "trunk"
                    ]
                ]
            ],
            "layout": {"line-join": "round", "line-cap": "round"},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    [
                        "match",
                        ["get", "class"],
                        "motorway",
                        0.5,
                        "trunk",
                        0.5,
                        "primary",
                        0.5,
                        "secondary",
                        0.01,
                        "tertiary",
                        0.01,
                        "street",
                        0,
                        "street_limited",
                        0,
                        "motorway_link",
                        0,
                        "service",
                        0,
                        "track",
                        0,
                        "link",
                        0,
                        0
                    ],
                    12,
                    [
                        "match",
                        ["get", "class"],
                        "motorway",
                        3,
                        "trunk",
                        3,
                        "primary",
                        3,
                        "secondary",
                        2,
                        "tertiary",
                        2,
                        "street",
                        0.5,
                        "street_limited",
                        0.5,
                        "motorway_link",
                        0.5,
                        "service",
                        0,
                        "track",
                        0,
                        "link",
                        0,
                        0
                    ],
                    18,
                    [
                        "match",
                        ["get", "class"],
                        "motorway",
                        30,
                        "trunk",
                        30,
                        "primary",
                        30,
                        "secondary",
                        24,
                        "tertiary",
                        24,
                        "street",
                        12,
                        "street_limited",
                        12,
                        "motorway_link",
                        12,
                        "service",
                        10,
                        "track",
                        10,
                        "link",
                        10,
                        10
                    ]
                ],
                "line-color": [
                    "match",
                    ["get", "class"],
                    "street",
                    "hsl(38, 100%, 98%)",
                    "street_limited",
                    "hsl(38, 100%, 98%)",
                    "service",
                    "hsl(38, 100%, 98%)",
                    "track",
                    "hsl(38, 100%, 98%)",
                    "link",
                    "hsl(38, 100%, 98%)",
                    "hsl(0, 0%, 100%)"
                ]
            }
        },
        {
            "id": "bridge-case",
            "type": "line",
            "source": "mapbox-streets",
            "source-layer": "road",
            "filter": [
                "all",
                ["==", "$type", "LineString"],
                [
                    "all",
                    ["!=", "type", "service:parking_aisle"],
                    ["==", "structure", "bridge"],
                    [
                        "in",
                        "class",
                        "link",
                        "motorway",
                        "motorway_link",
                        "primary",
                        "secondary",
                        "service",
                        "street",
                        "street_limited",
                        "tertiary",
                        "track",
                        "trunk"
                    ]
                ]
            ],
            "layout": {"line-join": "round"},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    10,
                    1,
                    16,
                    2
                ],
                "line-color": "hsl(38, 48%, 86%)",
                "line-gap-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    [
                        "match",
                        ["get", "class"],
                        "motorway",
                        0.5,
                        "trunk",
                        0.5,
                        "primary",
                        0.5,
                        "secondary",
                        0.01,
                        "tertiary",
                        0.01,
                        "street",
                        0,
                        "street_limited",
                        0,
                        "motorway_link",
                        0,
                        "service",
                        0,
                        "track",
                        0,
                        "link",
                        0,
                        0
                    ],
                    12,
                    [
                        "match",
                        ["get", "class"],
                        "motorway",
                        3,
                        "trunk",
                        3,
                        "primary",
                        3,
                        "secondary",
                        2,
                        "tertiary",
                        2,
                        "street",
                        0.5,
                        "street_limited",
                        0.5,
                        "motorway_link",
                        0.5,
                        "service",
                        0,
                        "track",
                        0,
                        "link",
                        0,
                        0
                    ],
                    18,
                    [
                        "match",
                        ["get", "class"],
                        "motorway",
                        30,
                        "trunk",
                        30,
                        "primary",
                        30,
                        "secondary",
                        24,
                        "tertiary",
                        24,
                        "street",
                        12,
                        "street_limited",
                        12,
                        "motorway_link",
                        12,
                        "service",
                        10,
                        "track",
                        10,
                        "link",
                        10,
                        10
                    ]
                ]
            }
        },
        {
            "id": "bridge",
            "type": "line",
            "source": "mapbox-streets",
            "source-layer": "road",
            "filter": [
                "all",
                ["==", "$type", "LineString"],
                [
                    "all",
                    ["!=", "type", "service:parking_aisle"],
                    ["==", "structure", "bridge"],
                    [
                        "in",
                        "class",
                        "link",
                        "motorway",
                        "motorway_link",
                        "primary",
                        "secondary",
                        "service",
                        "street",
                        "street_limited",
                        "tertiary",
                        "track",
                        "trunk"
                    ]
                ]
            ],
            "layout": {"line-join": "round", "line-cap": "round"},
            "paint": {
                "line-width": [
                    "interpolate",
                    ["exponential", 1.5],
                    ["zoom"],
                    5,
                    [
                        "match",
                        ["get", "class"],
                        "motorway",
                        0.5,
                        "trunk",
                        0.5,
                        "primary",
                        0.5,
                        "secondary",
                        0.01,
                        "tertiary",
                        0.01,
                        "street",
                        0,
                        "street_limited",
                        0,
                        "motorway_link",
                        0,
                        "service",
                        0,
                        "track",
                        0,
                        "link",
                        0,
                        0
                    ],
                    12,
                    [
                        "match",
                        ["get", "class"],
                        "motorway",
                        3,
                        "trunk",
                        3,
                        "primary",
                        3,
                        "secondary",
                        2,
                        "tertiary",
                        2,
                        "street",
                        0.5,
                        "street_limited",
                        0.5,
                        "motorway_link",
                        0.5,
                        "service",
                        0,
                        "track",
                        0,
                        "link",
                        0,
                        0
                    ],
                    18,
                    [
                        "match",
                        ["get", "class"],
                        "motorway",
                        30,
                        "trunk",
                        30,
                        "primary",
                        30,
                        "secondary",
                        24,
                        "tertiary",
                        24,
                        "street",
                        12,
                        "street_limited",
                        12,
                        "motorway_link",
                        12,
                        "service",
                        10,
                        "track",
                        10,
                        "link",
                        10,
                        10
                    ]
                ],
                "line-color": [
                    "match",
                    ["get", "class"],
                    "street",
                    "hsl(38, 100%, 98%)",
                    "street_limited",
                    "hsl(38, 100%, 98%)",
                    "service",
                    "hsl(38, 100%, 98%)",
                    "track",
                    "hsl(38, 100%, 98%)",
                    "link",
                    "hsl(38, 100%, 98%)",
                    "hsl(0, 0%, 100%)"
                ]
            }
        },
        {
            "id": "admin-state-province",
            "type": "line",
            "source": "mapbox-streets",
            "source-layer": "admin",
            "minzoom": 2,
            "filter": ["all", ["==", "maritime", 0], [">=", "admin_level", 3]],
            "layout": {"line-join": "round", "line-cap": "round"},
            "paint": {
                "line-dasharray": [
                    "step",
                    ["zoom"],
                    ["literal", [2, 0]],
                    7,
                    ["literal", [2, 2, 6, 2]]
                ],
                "line-width": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    7,
                    0.75,
                    12,
                    1.5
                ],
                "line-opacity": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    2,
                    0,
                    3,
                    1
                ],
                "line-color": [
                    "step",
                    ["zoom"],
                    "hsl(0, 0%, 80%)",
                    4,
                    "hsl(0, 0%, 65%)"
                ]
            }
        },
        {
            "id": "admin-country",
            "type": "line",
            "source": "mapbox-streets",
            "source-layer": "admin",
            "minzoom": 1,
            "filter": [
                "all",
                ["<=", "admin_level", 2],
                ["==", "disputed", 0],
                ["==", "maritime", 0]
            ],
            "layout": {"line-join": "round", "line-cap": "round"},
            "paint": {
                "line-color": "hsl(0, 0%, 50%)",
                "line-width": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    3,
                    0.5,
                    10,
                    2
                ]
            }
        },
        {
            "id": "admin-country-disputed",
            "type": "line",
            "source": "mapbox-streets",
            "source-layer": "admin",
            "minzoom": 1,
            "filter": [
                "all",
                ["<=", "admin_level", 2],
                ["==", "disputed", 1],
                ["==", "maritime", 0]
            ],
            "layout": {"line-join": "round"},
            "paint": {
                "line-color": "hsl(0, 0%, 50%)",
                "line-width": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    3,
                    0.5,
                    10,
                    2
                ],
                "line-dasharray": [1.5, 1.5]
            }
        },
        {
            "id": "road-label",
            "type": "symbol",
            "source": "mapbox-streets",
            "source-layer": "road_label",
            "minzoom": 12,
            "filter": [
                "in",
                "class",
                "link",
                "motorway",
                "pedestrian",
                "primary",
                "secondary",
                "street",
                "street_limited",
                "tertiary",
                "trunk"
            ],
            "layout": {
                "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    9,
                    [
                        "match",
                        ["get", "class"],
                        "motorway",
                        10,
                        "trunk",
                        10,
                        "primary",
                        10,
                        "secondary",
                        10,
                        "tertiary",
                        10,
                        9
                    ],
                    20,
                    [
                        "match",
                        ["get", "class"],
                        "motorway",
                        15,
                        "trunk",
                        15,
                        "primary",
                        15,
                        "secondary",
                        15,
                        "tertiary",
                        15,
                        14
                    ]
                ],
                "text-max-angle": 30,
                "text-font": ["Roboto Regular", "Arial Unicode MS Regular"],
                "symbol-placement": "line",
                "text-padding": 1,
                "text-rotation-alignment": "map",
                "text-pitch-alignment": "viewport",
                "text-field": ["get", "name_en"]
            },
            "paint": {
                "text-color": "hsl(0, 0%, 0%)",
                "text-halo-color": "hsl(0, 0%, 100%)",
                "text-halo-width": 1
            }
        },
        {
            "id": "poi-label",
            "type": "symbol",
            "source": "mapbox-streets",
            "source-layer": "poi_label",
            "filter": ["<=", "scalerank", 3],
            "layout": {
                "text-line-height": 1.1,
                "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    10,
                    11,
                    18,
                    13
                ],
                "icon-image": ["concat", ["get", "maki"], "-11"],
                "text-max-angle": 38,
                "text-font": ["Roboto Regular", "Arial Unicode MS Regular"],
                "text-padding": 2,
                "text-offset": [0, 0.75],
                "text-anchor": "top",
                "text-field": ["get", "name_en"],
                "text-max-width": 8
            },
            "paint": {
                "text-color": "hsl(38, 19%, 29%)",
                "text-halo-color": "hsla(0, 0%, 100%, 0.75)",
                "text-halo-width": 1,
                "text-halo-blur": 0.5
            }
        },
        {
            "id": "airport-label",
            "type": "symbol",
            "source": "mapbox-streets",
            "source-layer": "airport_label",
            "filter": ["<=", "scalerank", 2],
            "layout": {
                "text-line-height": 1.1,
                "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    10,
                    12,
                    18,
                    18
                ],
                "icon-image": [
                    "step",
                    ["zoom"],
                    ["concat", ["get", "maki"], "-11"],
                    13,
                    ["concat", ["get", "maki"], "-15"]
                ],
                "text-font": ["Roboto Regular", "Arial Unicode MS Regular"],
                "text-padding": 2,
                "text-offset": [0, 0.75],
                "text-anchor": "top",
                "text-field": [
                    "step",
                    ["zoom"],
                    ["get", "ref"],
                    14,
                    ["get", "name_en"]
                ],
                "text-max-width": 9
            },
            "paint": {
                "text-color": "hsl(38, 19%, 29%)",
                "text-halo-color": "hsl(0, 0%, 100%)",
                "text-halo-width": 1
            }
        },
        {
            "id": "place-neighborhood-suburb-label",
            "type": "symbol",
            "source": "mapbox-streets",
            "source-layer": "place_label",
            "minzoom": 12,
            "maxzoom": 15,
            "filter": ["in", "type", "neighbourhood", "suburb"],
            "layout": {
                "text-field": ["get", "name_en"],
                "text-transform": "uppercase",
                "text-letter-spacing": 0.15,
                "text-max-width": 8,
                "text-font": ["Roboto Regular", "Arial Unicode MS Regular"],
                "text-padding": 3,
                "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    12,
                    11,
                    16,
                    16
                ]
            },
            "paint": {
                "text-halo-color": "hsl(0, 0%, 100%)",
                "text-halo-width": 1,
                "text-color": "hsl(38, 62%, 21%)"
            }
        },
        {
            "id": "place-town-village-hamlet-label",
            "type": "symbol",
            "source": "mapbox-streets",
            "source-layer": "place_label",
            "minzoom": 6,
            "maxzoom": 14,
            "filter": ["in", "type", "hamlet", "town", "village"],
            "layout": {
                "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    5,
                    ["match", ["get", "type"], "town", 9.5, 8],
                    16,
                    ["match", ["get", "type"], "town", 20, 16]
                ],
                "text-font": [
                    "step",
                    ["zoom"],
                    ["literal", ["Roboto Regular", "Arial Unicode MS Regular"]],
                    12,
                    [
                        "match",
                        ["get", "type"],
                        "town",
                        [
                            "literal",
                            ["Roboto Medium", "Arial Unicode MS Regular"]
                        ],
                        [
                            "literal",
                            ["Roboto Regular", "Arial Unicode MS Regular"]
                        ]
                    ]
                ],
                "text-max-width": 7,
                "text-field": ["get", "name_en"]
            },
            "paint": {
                "text-color": "hsl(0, 0%, 0%)",
                "text-halo-blur": 0.5,
                "text-halo-color": "hsl(0, 0%, 100%)",
                "text-halo-width": 1
            }
        },
        {
            "id": "place-city-label-minor",
            "type": "symbol",
            "source": "mapbox-streets",
            "source-layer": "place_label",
            "minzoom": 1,
            "maxzoom": 14,
            "filter": ["all", ["!has", "scalerank"], ["==", "type", "city"]],
            "layout": {
                "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    5,
                    12,
                    16,
                    22
                ],
                "text-font": [
                    "literal",
                    ["Roboto Medium", "Arial Unicode MS Regular"]
                ],
                "text-max-width": 10,
                "text-field": ["get", "name_en"]
            },
            "paint": {
                "text-color": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    5,
                    "hsl(0, 0%, 33%)",
                    6,
                    "hsl(0, 0%, 0%)"
                ],
                "text-halo-blur": 0.5,
                "text-halo-color": "hsl(0, 0%, 100%)",
                "text-halo-width": 1.25
            }
        },
        {
            "id": "place-city-label-major",
            "type": "symbol",
            "source": "mapbox-streets",
            "source-layer": "place_label",
            "minzoom": 1,
            "maxzoom": 14,
            "filter": ["all", ["==", "type", "city"], ["has", "scalerank"]],
            "layout": {
                "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    5,
                    ["step", ["get", "scalerank"], 14, 4, 12],
                    16,
                    ["step", ["get", "scalerank"], 30, 4, 22]
                ],
                "text-font": [
                    "step",
                    ["zoom"],
                    ["literal", ["Roboto Medium", "Arial Unicode MS Regular"]],
                    10,
                    [
                        "step",
                        ["get", "scalerank"],
                        ["literal", ["Roboto Bold", "Arial Unicode MS Bold"]],
                        5,
                        [
                            "literal",
                            ["Roboto Medium", "Arial Unicode MS Regular"]
                        ]
                    ]
                ],
                "text-max-width": 10,
                "text-field": ["get", "name_en"]
            },
            "paint": {
                "text-color": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    5,
                    "hsl(0, 0%, 33%)",
                    6,
                    "hsl(0, 0%, 0%)"
                ],
                "text-halo-blur": 0.5,
                "text-halo-color": "hsl(0, 0%, 100%)",
                "text-halo-width": 1.25
            }
        },
        {
            "id": "state-label",
            "type": "symbol",
            "source": "mapbox-streets",
            "source-layer": "state_label",
            "minzoom": 4,
            "maxzoom": 8,
            "layout": {
                "text-line-height": 1.2,
                "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    4,
                    ["step", ["get", "area"], 8, 20000, 9, 80000, 10],
                    9,
                    ["step", ["get", "area"], 14, 20000, 18, 80000, 23]
                ],
                "text-transform": "uppercase",
                "text-font": ["Roboto Black", "Arial Unicode MS Bold"],
                "text-padding": 1,
                "text-field": [
                    "step",
                    ["zoom"],
                    [
                        "step",
                        ["get", "area"],
                        ["get", "abbr"],
                        80000,
                        ["get", "name_en"]
                    ],
                    5,
                    ["get", "name_en"]
                ],
                "text-letter-spacing": 0.2,
                "text-max-width": 6
            },
            "paint": {
                "text-color": "hsl(38, 7%, 64%)",
                "text-halo-width": 1,
                "text-halo-color": "hsl(0, 0%, 100%)"
            }
        },
        {
            "id": "country-label",
            "type": "symbol",
            "source": "mapbox-streets",
            "source-layer": "country_label",
            "minzoom": 1,
            "maxzoom": 8,
            "layout": {
                "text-field": ["get", "name_en"],
                "text-max-width": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    0,
                    5,
                    3,
                    6
                ],
                "text-font": [
                    "step",
                    ["zoom"],
                    ["literal", ["Roboto Medium", "Arial Unicode MS Regular"]],
                    4,
                    ["literal", ["Roboto Bold", "Arial Unicode MS Bold"]]
                ],
                "text-size": [
                    "interpolate",
                    ["linear"],
                    ["zoom"],
                    2,
                    ["step", ["get", "scalerank"], 13, 3, 11, 5, 9],
                    9,
                    ["step", ["get", "scalerank"], 35, 3, 27, 5, 22]
                ]
            },
            "paint": {
                "text-halo-width": 1.5,
                "text-halo-color": "hsl(0, 0%, 100%)",
                "text-color": "hsl(0, 0%, 0%)"
            }
        }
    ],
    "created": "2018-09-20T03:02:37.656Z",
    "id": "cjm9zqpn610962soz1l6h5mu8",
    "modified": "2018-09-20T03:02:37.656Z",
    "owner": "hufuxin011",
    "visibility": "private",
    "draft": false
}