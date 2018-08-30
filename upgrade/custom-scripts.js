define(["dojo/topic"], function(topic) {
	/*
	* Custom Javascript to be executed while the application is initializing goes here
	*/

	// The application is ready
	topic.subscribe("tpl-ready", function(){
		/*
		* Custom Javascript to be executed when the application is ready goes here
		*/
        // Last Data Update Text
        var lastDataUpdateDate = '4-19-2017' // update text to last data update date
        // Element that will contain the last data update text
        var dataUpdateText = '<span id="dataUpdate">Data Last Updated: ' + lastDataUpdateDate + '</span>';
        // Mobile title page element
        var ccpaMobileTitlePage = $('#mobileIntro');
        // Header Element
        var ccpaHeader = $('#header');
        // Viewport Width
        var viewportWidth = $(window).width();
        // Custom Legend Button
        var customLegendBtn = $('#customLegendBtn');        
    
        // Append last data update text to appropriate element based upon viewport size
        $(document).ready(function() {
            // above breakpoint
            if (viewportWidth >= 769 ) {
                ccpaHeader.append(dataUpdateText);
            } else {
                ccpaMobileTitlePage.prepend(dataUpdateText); // below breakpoint    
            }
        });

        // place last data update text on header if screen size changes to above breakpoint    
        $(window).resize(function() {
            if (viewportWidth >= 769) {
                ccpaHeader.append(dataUpdateText);
            }
        });        
        
        // Custom Legend - If screen width is above breakpoint, display legend button
        if (viewportWidth > 768) {
            customLegendBtn.show();
        } else {
            $('#mobileThemeList .mobileTitleThemes').click(function() {
                customLegendBtn.show(); // show legend button once map is visible below breakpoint
            });
        }        
        
        // Custom Legend - add display/hide functionality to Legend button
        customLegendBtn.click(function () {
             $('#customLegend').toggle(); // hide/show legend when legend button clicked
        });
	});
});