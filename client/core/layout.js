define(['jquery', 'text!./templates/l2U.html', 'text!./templates/l3W.html','modules/List/List', 'modules/View/View', 'modules/Item/Item', 'kendo'], 
	function($, l2U, l3W, list, view, item){
		'use strict';
	//console.log($);
	
	function getJLayout (type){
		var layoutHtml;
		switch (type){
			case "2U":  layoutHtml = $(l2U); //
									break;
			case "3W":  layoutHtml = $(l3W); //
									break;
			default:    layoutHtml = $(l3W);
		}
		return $(layoutHtml);
	}

	function createLayout (type, selector){ //for now its "3W", "#container"
		var jLayout = getJLayout(type); //will return l3W.html
		var container = $(selector); //"#container"
		container.css({
			width: "100%",
			height: "100%"
		});
		jLayout.appendTo(selector);
		//jLayout.appendTo(selector);
		list.createLogo($("#megaStore"));
		list.createListView($("#windowButton"));
        list.createAddButton($("#newAdd"));
        view.createMiddleView($("#sch"));
        item.createRightView($("#calHere"));

        list.addFunctionForChanges(view.openNewTab);
        list.addFunctionForChanges(item.emptyRightSide);
        view.addFunctionForChanges(list.getListView);
        view.addFunctionForOpenItem(item.openItem);
        item.addFunctionForChanges(list.getListView);
        item.addFunctionForChanges(view.openNewTab)
		//the craetion of kendo from libery vendours of kendoSplitter
		jLayout.kendoSplitter({
		panes: [
               { min: "250px", collapsible: true, size: "250px" },//123
               { collapsible: false },//4
               { min: "350px", collapsible: true, size: "450px" }//,resizable: true }//5
                ]});

$("#left-pane").kendoSplitter({
			orientation: "vertical",
			panes: [
                            { collapsible: true,size:"150px",resizable:true },//top
                            { min: "350px",collapsible: false, size: "450px",resizable:true  },
                            { collapsible: true, resizable: false, size: "100px" }
                        ]
			
		});


				
	}

	return {
		createLayout: createLayout
	}
});