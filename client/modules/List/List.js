define(['jquery', 'text!./list.html', 'text!./button.html', 'text!./addWindow.html', 'text!./editWindow.html', 'core/request', 'kendo'], function($, list, button, addWindow, editWindow, request){

    var updateFunctions = [];
    var listView = $(list);
    var addListButton = $(button);
    var addListWindow;
    var editListWindow;

    var openAddWindow = function(){
        addListWindow = $(addWindow);
        addListWindow.appendTo('body');
        addListWindow.kendoWindow({
            width: "600px",
            title: "Create New List",
            actions: [
                "Close"
            ],
            close: function(){
                var dialog = addListWindow.data("kendoWindow");
                dialog.destroy();
                addListWindow.remove();
                getListView();
            },
            modal: true
        });

        var dialog = addListWindow.data("kendoWindow");
        dialog.center();

        addListWindow.find("#listDialogAddSubmit").kendoButton({
            click: function(){
                var dialog = addListWindow.data("kendoWindow");
                dialog.destroy();
                request.addList(addListWindow.find("input").val()).then(function(){
                    getListView();
                });
            }
        });
    };

    var openEditWindow = function(listName){
        if(listName != undefined && listName != ""){
            editListWindow = $(editWindow);
            editListWindow.appendTo('body');
            editListWindow.kendoWindow({
                width: "600px",
                title: "Edit List Name",
                actions: [
                    "Close"
                ],
                close: function(){
                    var dialog = editListWindow.data("kendoWindow");
                    dialog.destroy();
                    editListWindow.remove();
                    getListView();
                },
                modal: true
            });

            var dialog = editListWindow.data("kendoWindow");
            dialog.center();

            editListWindow.find("input").val(listName);

            editListWindow.find("#listDialogEditSubmit").kendoButton({
                click: function(){
                    var dialog = editListWindow.data("kendoWindow");
                    dialog.destroy();
                    request.editList(listName,editListWindow.find("input").val()).then(function(){
                        getListView();
                    });
                }
            });

            editListWindow.find("#listDialogEditRemove").kendoButton({
                click: function(){
                    var dialog = editListWindow.data("kendoWindow");
                    dialog.destroy();
                    request.removeList(listName).then(function(){
                        getListView();
                    });
                }
            });
        }
    };

    var createListView = function(selector){
		//var elem = document.createElement("img");
		//elem.setAttribute("src", "http://superlistapp.com/wp-content/uploads/2014/08/SuperlistLogo-text1-300x48.png");
		//elem.setAttribute("height", "40");
		//elem.setAttribute("width", "150");
		//elem.setAttribute("alt", "Flower");
        //$(elem).appendTo(selector);
        listView.appendTo(selector);
        //addListButton.appendTo(selector);

        //addListButton.kendoButton({
          //  click: function(e) {
            //    openAddWindow();
            //}
       // });


        listView.kendoListView({
            template: '<div class="listView"><span class="title">#:title#</span><button></button><p>#:count#</p></div>',
            selectable: true,
            change: function(){
                var select = this.select();
                for(var i=0; i<updateFunctions.length; i++){
                    updateFunctions[i]($(select[0]).find(".title").html());
                }
            }
        });

        getListView();
    };
	var createLogo = function(selector){
		var elem = document.createElement("img");
		elem.setAttribute("src", "http://superlistapp.com/wp-content/uploads/2014/08/SuperlistLogo-text1-300x48.png");
		elem.setAttribute("height", "40");
		elem.setAttribute("width", "150");
		elem.setAttribute("alt", "Flower");
        $(elem).appendTo(selector);
    
    };

	    var createAddButton = function(selector){

        //$("<h1>Lists</h1>").appendTo(selector);
        //listView.appendTo(selector);
        addListButton.appendTo(selector);

        addListButton.kendoButton({
            click: function(e) {
                openAddWindow();
            }
        });

        //listView.kendoListView({
           // template: '<div class="listView"><span class="title">#:title#</span><button></button><p>#:count#</p></div>',
            //selectable: true,
            //change: function(){
              //  var select = this.select();
                //for(var i=0; i<updateFunctions.length; i++){
                  //  updateFunctions[i]($(select[0]).find(".title").html());
                //}
           // }
        //});

        //getListView();
    };
    var getListView = function(listName){
        request.getListView().then(function(data){
            var list = listView.data("kendoListView");
            var dataSource = new kendo.data.DataSource({
                data: data
            });
            list.setDataSource(dataSource);
            list.refresh();

            if(listName){
                $(list.element).find(".title").each(function(){
                    if($(this).html() == listName)
                        list.select($(this).parent());
                });
            }


            $(".listView button").kendoButton({
                spriteCssClass: "k-icon k-i-pencil",
                click: function(e) {
                    openEditWindow($(e.event.target).closest(".listView").find(".title").html());
                }
            });

            for(var i=0; i<updateFunctions.length; i++){
                updateFunctions[i]('');
            }
        })
    };

    var addFunctionForChanges = function(func){
        updateFunctions.push(func);
    };

    return {
        createListView: createListView,
		createAddButton: createAddButton,
        getListView: getListView,
        addFunctionForChanges: addFunctionForChanges,
		createLogo: createLogo
    }

});