define(["dojo/topic"], function(topic) {
	/*
	* Custom Javascript to be executed while the application is initializing goes here
	*/
    // use esri request module to fetch map service legend info
    // https://developers.arcgis.com/javascript/3/jsapi/esri.request-amd.html    
    require(["esri/request"], function(esriRequest) {
            'use strict';
            // function to get legend info in json format
            function requestLegendJson(url) {
                // request object
                var requestHandle = esriRequest({
                    url: url,
                    content: { f: "json" },
                    handleAs: 'json',
                    callbackParamName: 'callback'
                });
                // make request
                requestHandle.then(function (response) {
                    // legend container element
                    var legendElement = $('#customLegend');
                    // layers in response                        
                    var layers = response.layers;
                    // loop through each item in layers                    
                    for (var _iterator = layers, _isArray = Array.isArray(_iterator), _i = 0, _iterator = _isArray ? _iterator : _iterator[Symbol.iterator]();;) {
                        var _ref;

                        if (_isArray) {
                            if (_i >= _iterator.length) break;
                            _ref = _iterator[_i++];
                        } else {
                            _i = _iterator.next();
                            if (_i.done) break;
                            _ref = _i.value;
                        }

                        var item = _ref;

                        // default layer name
                        var layerName = item.layerName;
                        // loop through legend properties
                        for (var _iterator2 = item.legend, _isArray2 = Array.isArray(_iterator2), _i2 = 0, _iterator2 = _isArray2 ? _iterator2 : _iterator2[Symbol.iterator]();;) {
                            var _ref2;

                            if (_isArray2) {
                                if (_i2 >= _iterator2.length) break;
                                _ref2 = _iterator2[_i2++];
                            } else {
                                _i2 = _iterator2.next();
                                if (_i2.done) break;
                                _ref2 = _i2.value;
                            }

                            var element = _ref2;

                            // open legend list element
                            var legendContent = "<ul>";
                            // if the label element is empty, we'll use item.layerName as the name of the legend element
                            // if it is not, we'll use the label property of the legeng as the name for the legend element
                            if (element.label === " " || element.label === "") {
                                legendContent += '<li>' + String(layerName) + '</li>';
                            } else {
                                legendContent += '<li>' + String(element.label) + '</li>';
                            }
                            // create image element
                            legendContent += '<li><img height=' + String(element.height) + ' width=' + String(element.width) + ' src="data:' + String(element.contentType) + ';base64,' + String(element.imageData) + '" alt="legend icon representing ' + String(layerName) + '" /></li>'; // close list element
                            legendContent += "</ul>";
                            // append legend item to legend
                            legendElement.append(legendContent);
                        } // end for element of item.legend                                             
                    } // end for item of layers                           
                }, // end function(response)
                function (error) {
                    console.warn('Error creating legend element for url ' + String(url));
                    console.warn("Error: ", error.message);
                    // feel free to update error reporting code
                });
            } // end requestLegendJson(url)            
            
            // Map Service Legend Urls
            var someMapServiceLegendUrl = 'https://[some_domain]/arcgis/rest/services/[some_service]/MapServer/legend';
            var householdMedianIncomeLegendUrl = 'http://server.arcgisonline.com/arcgis/rest/services/Demographics/USA_Median_Household_Income/MapServer/legend';
            // fake url to see how error function is called
            var fakeLegendUrl = 'http://server.arcgisonline.com/arcgis/rest/services/Demographics/Living Index/MapServer/legend';
                        
            // call functions to get legend JSON and construct legend elements       
            requestLegendJson(someMapServiceLegendUrl);
            requestLegendJson(householdMedianIncomeLegendUrl);  
            requestLegendJson(fakeLegendUrl);
        }); // end require(["esri/request"], function(esriRequest) {})
        
        // Viewport Width
        const viewportWidth = $(window).width();
        // Custom Legend Button
        // create this element in the index.html underneath <div id="map>
        const customLegendBtn = $('#customLegendBtn');       
        
        // Custom Legend - add display/hide functionality to Legend button
        // create <div id="customLegend> element in the index.html underneath <div id="map>
        customLegendBtn.click(function() {            
            $('#customLegend').toggle();
        });

	// The application is ready
	topic.subscribe("tpl-ready", function(){
		/*
		* Custom Javascript to be executed when the application is ready goes here
		*/
        // Last Data Update Text
        const lastDataUpdateDate = '8-30-2018' // update text to last data update date
        // Element that will contain the last data update text
        const dataUpdateText = `<span id="dataUpdate">Data Last Updated: ${lastDataUpdateDate}</span>`;
        // Mobile title page element
        const ccpaMobileTitlePage = $('#mobileIntro');
        // Header Element
        const ccpaHeader = $('#header');
        // Viewport Width
        const viewportWidth = $(window).width();
        // Custom Legend Button
        const customLegendBtn = $('#customLegendBtn');
        // element that contains addtional tabs
        const moreTabsAnchorElement = $('a.dropdown-toggle');
        
        // add "More Tabs" text to tab element
        // this is a personal preference. I think it is nice to let people
        // know that this element contains additional tabs
        moreTabsAnchorElement.append('<span>More Tabs</span>');  
    
        // Custom Legend - If screen width is above breakpoint, display legend button
        if (viewportWidth > 768) {
            customLegendBtn.show();
        } else {
            $('#mobileThemeList li.mobileTitleThemes').click(function() {
                customLegendBtn.show(); // show legend button once map is visible below breakpoint
            });
        }
        
        // Append last data update text to appropriate element based upon viewport size
        $(document).ready(function() {
            // above breakpoint
            if (viewportWidth > 768 ) {
                ccpaHeader.append(dataUpdateText);
            } else {
                ccpaMobileTitlePage.prepend(dataUpdateText); // below breakpoint    
            }
        });

        // place last data update text on header if screen size changes to above breakpoint    
        $(window).resize(function() {
            if ($(window).width() > 768) {
                ccpaHeader.append(dataUpdateText);
            }
        });        
        
	});

	// Tab navigation.  This is fired anytime the tab is selected/changed.
	topic.subscribe("story-tab-navigation", function(index){
		/*
		* Custom Javascript to be executed when a tab is selected goes here
		*/
    });
});
