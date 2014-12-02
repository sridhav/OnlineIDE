/**
 * Created by Sridhar on 11/23/2014.
 */

app.controller('mainController', function ($scope, tabService) {

});

/**
 * Controller for header data is a http call to database using php
 * gets the header items
 */

app.controller('headerDataController', function ($scope, $http) {
    /**
     * @param $http angular js $http object
     * @returns {Array} of header items;
     */
    var getHeaderItems = function ($http) {
        var items = [];
        $http.post("php/header_items.php").success(function (response) {
            items = response;
        });
        return items;
    }
    //$scope.headerItems = getHeaderItems();

});

/**
 * gets the file related data also an http call using php
 * gets the file types from database
 *
 * It also does a insertion of new tab
 *
 * It also does a broadcast inorder to invoke the tabController for updating data on insertion
 * as the codeData, inputData and outputData are in tabController
 *
 * broadcast is done using the tabService.broadcastItem();
 *
 */

app.controller('fileDataController', function ($scope, tabService) {


});

/**
 * Core implementation for tabs uploading dynamically
 * mostly uses tabService
 *
 * this controller handles the broadCast send by fileDataController in order to update
 * data on insertion
 *
 */

app.controller('tabController', function ($scope, $window, $http, tabService) {
    /**
     * initializer here initializes the tabs to be loaded
     */
    function init() {
        $scope.tabs = tabService.getTabs();

        $scope.code = CodeMirror.fromTextArea(document.getElementById("code"), {
            lineNumbers: true,
            autoCloseBrackets: true,
            mode: "text/x-csrc"
        });

        $scope.input = CodeMirror.fromTextArea(document.getElementById("input"), {
            lineNumbers: true,
            autoCloseBrackets: true
        });
        $scope.output = CodeMirror.fromTextArea(document.getElementById("output"), {
            lineNumbers: true,
            autoCloseBrackets: true
        });
        //code.setOption("theme","night");
        var resizer = function () {
            var wid = window.innerWidth;
            if (wid > 700) {
                var val = $("#codeCol")[0].outerHTML;
                val.replace("</tr><tr>", "");
                $("#codeCol")[0].outerHTML.replace("</tr><tr>");
                console.log($("#codeCol")[0].outerHTML);
                $("#codeCol").attr("rowspan", "2");
                $scope.code.setSize(wid / 2, 640);
                $scope.input.setSize(wid / 2, 300);
                $scope.output.setSize(wid / 2, 300);
            }
            else {
                var val = $("#codeCol")[0].outerHTML;
                $("#codeCol")[0].outerHTML.replace("</td>", "</td></tr><tr>");
                $("#codeCol").removeAttr("rowspan");
                console.log($("#codeCol")[0].outerHTML);
                code.setSize(wid, 300);
                input.setSize(wid, 300);
                output.setSize(wid, 300);
            }
        }
        resizer();
        $(window).resize(resizer);


        /**
         * @param $http angular js http object
         * @returns An Object with Array of file type shortname and long name eg : {[{name:python,shortName:py}]} {{name: string, shortName: string}[]}
         */

        var getFileTypes = function ($http) {
            var types = [{name: 'sridhar', shortName: 'java'}];
            $http.post("php/file_types.php").success(function (response) {
                types = response;
            });
            return types;
        }

        $scope.types = [
            {fullName: 'sridhar', shortName: 'java'},
            {fullName: 'sridhar', shortName: 'java'},
            {fullName: 'sridhar', shortName: 'java'}
        ];
    }

    init();


    /**
     *  Gets the file and type from view
     *  inserts as a new tab in tabService
     *  then sends a broadcast signal to all controllers using tabService
     */
    $scope.insertTab = function () {
        var name = $scope.newFile;
        var short = "java";
        if(!name){
            alert("Enter File Name");
            return;
        }
        tabService.insertTab(name, short);
        $scope.newFile= '';
        update();
    };


    /**
     *  updates the data
     *   both set and get methods are used
     *   1. updation to be done to tabService for previous Tab
     *   2. get Values from current tab using  tabService
     */
    var update = function () {
        tabService.setCode($scope.code.getValue());
        tabService.setInput($scope.input.getValue());
        tabService.setOutput($scope.output.getValue());
        $scope.code.setValue(tabService.getCode());
        $scope.input.setValue(tabService.getInput());
        $scope.output.setValue(tabService.getOutput());
    }


    $scope.save = function () {
        $http.post("php/save_file.php").success(function (response) {
            alert("saved")
        });
    }

    $scope.saveToLocal = function () {

    }


    /*$scope.insertTab=function(){
     var name=$scope.newFile.name;
     var short=$scope.newFile.short;
     tabService.insertTab(name,short);
     $scope.newFile.name='';
     $scope.newFile.short='';
     }*/


    /**
     * when user changes the tab this function is called from ng-click in the view
     */
    $scope.change = function () {
        console.log("change triggered");
        var i = active();
        tabService.updateTargets(i);
        update();
    }
    /**
     * @returns ID returns the Tab ID that is active
     */
    var active = function () {
        return $scope.tabs.filter(function (tab) {
            return tab.active;
        })[0].ID;
    }

    /*
     $scope.updateContent=function(prevTab, activeTab){
     console.log($scope.codeData.getValue());
     console.log(prevTab);
     tabService.setCode(editor.getSession().getValue(),prevTab);
     tabService.setInput(input.getSession().getValue(),prevTab);
     tabService.setOutput(output.getSession().getValue(),prevTab);
     editor.setValue(tabService.getCode(activeTab));
     input.setValue(tabService.getInput(activeTab));
     output.setValue(tabService.getOutput(activeTab));
     }
     */

    /**
     * Deletes the Tab for given tab
     * @param id of the tab
     */

    $scope.deleteTab = function (id) {
        tabService.deleteTab(id);
    }
});
