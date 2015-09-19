define(['jquery', 'text!./templates/l2U.html', 'text!./templates/l3W.html','modules/List/List', 'modules/View/View', 'modules/Item/Item', 'kendo'],
	function($, l2U, l3W, list, view, item){
		'use strict';

	function getJLayout (type){
		var layoutHtml;
		switch (type){
			case "2U":  layoutHtml = $(l2U);
									break;
			case "3W":  layoutHtml = $(l3W);
									break;
			default:    layoutHtml = $(l3W);
		}
		return $(layoutHtml);
	}

	function createLayout (type, selector){
		var jLayout = getJLayout(type);
		var container = $(selector);
		container.css({
			width: "100%",
			height: "100%"
		});
		jLayout.appendTo(selector);
        list.createListView($("#newAdd"));
        view.createMiddleView($("#sch"));
        item.createRightView($("#calHere"));

        list.addFunctionForChanges(view.openNewTab);
        list.addFunctionForChanges(item.emptyRightSide);
        view.addFunctionForChanges(list.getListView);
        view.addFunctionForOpenItem(item.openItem);
        item.addFunctionForChanges(list.getListView);
        item.addFunctionForChanges(view.openNewTab);

        jLayout.kendoSplitter({
            orientation: "horizontal",
            panes: [
                { collapsible: true, size: "30%", max: "30%" },
                { collapsible: false },
                { collapsible: true, size: "40%", max: "40%" }
            ]
        });
	}

	return {
		createLayout: createLayout
    }
});