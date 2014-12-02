/**
 * Created by Sridhar on 11/24/2014.
 */

/**
 * Defined as this is used by many controllers
 * create removes updates tabs, currentTarget and prevTarget
 */


app.service('tabService', function ($rootScope) {
    /**
     * @type {Array} array of tabs core content
     */
    var tabs = [];
    /**
     * @type {number} Active Tab ID defaults to 1
     */
    var currentTarget = 1;
    /**
     * @type {number} previous active tab defaults to -1
     * required in order to update data
     */
    var prevTarget = -1;
    /**
     * @returns {Array} returns tabs to controllers
     */
    this.getTabs = function () {
        return tabs;
    }

    /**
     * on change or create updates the currentTarget and previousTarget accordingly
     * @param val the id of active tab
     */
    this.updateTargets = function (val) {
        console.log("before update");
        console.log("prev " + prevTarget);
        console.log("curr " + currentTarget);
        prevTarget = currentTarget;
        currentTarget = val;
        console.log("before update");
        console.log("prev " + prevTarget);
        console.log("curr " + currentTarget);
        console.log("update complete");
    }
    /**
     * inserts a new tab objects into tabs
     * @param name - file name
     * @param shortname - file type
     *
     * others initialized to empty strings as the initial data is empty
     */

    this.insertTab = function (name, shortname) {
        var top = tabs.length + 1;
        setAllInactive();
        tabs.push({
            ID: top,
            name: name,
            shortName: shortname,
            code: "",
            input: "",
            output: "",
            active: true
        });
        console.log("inserted " + tabs.length);
        this.updateTargets(top);
    };

    /**
     * sets all tabs to inactive used by insert tab
     */
    var setAllInactive = function () {
        angular.forEach(this.tabs, function (tab) {
            tab.active = false;
        });
    }

    /**
     * @returns {number} returns the active Tab ID nothing but currentTarget
     */
    this.getActiveTab = function () {
        return currentTarget;
    }

    /**
     * removes tab object
     * @param id removes tab from tabs for given value
     */

    this.deleteTab = function (id) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].ID == id) {
                tabs.splice(i, 1);
                break;
            }
        }
    }
    /**
     * returns the tab object for given ID
     * @param id tab ID
     * @returns {*} tab object for given ID
     */

    this.getTab = function (id) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].ID == id) {
                return tabs[i];
            }
        }
    }

    /**
     * return the tab array index for given ID
     * @param id tab ID
     * @returns {number} array index in tabs Array
     */
    var getTabNumber = function (id) {
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].ID == id)
                return i;
        }

        return -1;
    };
    /**
     * Sets codeData for prevTarget tab code variable
     * @param content - string from view which is sent by controller
     */
    this.setCode = function (content) {
        if (prevTarget != -1)
            tabs[prevTarget - 1].code = content;
    }
    /**
     * Sets content for prevTarget tab input variable
     * @param content - string from view which is sent by controller
     */


    this.setInput = function (content) {
        if (prevTarget != -1)
            tabs[prevTarget - 1].input = content;
    }
    /**
     * Sets content for prevTarget tab output variable
     * @param content - string from view which is sent by controller
     */

    this.setOutput = function (content) {
        if (prevTarget != -1)
            tabs[prevTarget - 1].output = content;
    }
    /**
     * @returns {*} code variable data for the current tab
     */

    this.getCode = function () {
        return tabs[currentTarget - 1].code;
    }
    /**
     * @returns {*} input variable data for the current tab
     */

    this.getInput = function () {
        return tabs[currentTarget - 1].input;
    }
    /**
     * @returns {*} output variable data for the current tab
     */

    this.getOutput = function () {
        return tabs[currentTarget - 1].output;
    }

    /*this.setCode=function(content,id){
     var i=getTabNumber(id);
     if(i!=-1){
     tabs[i].code=content;
     }
     }

     this.setInput=function(content,id){
     var i=getTabNumber(id);
     if(i!=-1){
     tabs[i].input=content;
     }
     }

     this.setOutput=function(content,id){
     var i=getTabNumber(id);
     if(i!=-1){
     tabs[i].output=content;
     }
     }

     this.getInput=function(id){
     var i=getTabNumber(id);
     if(i!=-1){
     return tabs[i].input;
     }
     }

     this.getCode=function(id){
     var i=getTabNumber(id);
     if(i!=-1){
     return tabs[i].code;
     }
     }

     this.getOutput=function(id){
     var i=getTabNumber(id);
     if(i!=-1){
     return tabs[i].output;
     }
     }
     */

    /**
     * broadcast for file data using the $rootscope communication between controllers
     */
   /* this.broadcastItem = function () {
        $rootScope.$broadcast('handleBroadcast');
    }
*/
})
;