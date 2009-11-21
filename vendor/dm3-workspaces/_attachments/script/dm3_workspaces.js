function dm3_workspaces() {

    css_stylesheet("vendor/dm3-workspaces/style/dm3-workspaces.css")
    topic_type_icons["Workspace"] = create_image("vendor/dm3-workspaces/images/star.png")



    /**************************************************************************************************/
    /**************************************** Overriding Hooks ****************************************/
    /**************************************************************************************************/



    this.init = function() {

        var workspaces = get_all_workspaces()
        create_default_workspace()
        create_workspace_selector()
        create_workspace_dialog()

        function create_default_workspace() {
            if (workspaces.rows.length == 0) {
                create_workspace("Default")
                workspaces = get_all_workspaces()
            }
        }

        function create_workspace_selector() {
            var select = $("<div>").attr("id", "workspace_select")
            var workspace_selector = $("<div>").attr("id", "workspace_form").text("Workspace ").append(select)
            $("#upper_toolbar").prepend(workspace_selector)
            ui.menu("workspace_select", workspace_selected)
            update_workspace_selector(workspaces)
        }

        function create_workspace_dialog() {
            var workspace_dialog = $("<div>").attr("id", "workspace_dialog")
            var input = $("<input>").attr({id: "workspace_name", size: 30})
            workspace_dialog.append("Name:")
            workspace_dialog.append($("<form>").submit(do_create_workspace).append(input))
            $("body").append(workspace_dialog)
            $("#workspace_dialog").dialog({modal: true, autoOpen: false, draggable: false, resizable: false, width: 350,
                title: "New Workspace", buttons: {"OK": do_create_workspace}})
        }
    }

    // Note: we use the pre_create hook to let the "Workspaces" field be saved also if the user cancels the initial editing.
    this.pre_create = function(doc) {
        if (doc.type == "Topic") {
            doc.fields.push({
                id: "Workspaces",
                model: {
                    type: "relation",
                    related_type: "Workspace"
                },
                view: {
                    editor: "checkboxes"
                }
            })
        } else {
            // TODO: handle relations too
        }
    }

    // Note: we must use the post_create hook to create the relation because at pre_create the document has no ID yet.
    this.post_create = function(doc) {
        // Note 1: we do not relate search results to a workspace. Otherwise the search result would appear
        // as relation when displaying the workspace. That's because an "Auxiliray" relation is not be
        // created if there is another relation already.
        // Note 2: we do not relate workspaces to a workspace. This would be contra-intuitive.
        if (doc.type == "Topic" && doc.topic_type != "Search Result" && doc.topic_type != "Workspace") {
            var workspace_id = ui.menu_item("workspace_select").value
            // Note: workspace_id is undefined in case the doc is the (just created) default workspace itself.
            if (workspace_id) {
                create_relation(doc._id, workspace_id)
            }
        } else {
            // TODO: assign relations to a workspace
        }
    }



    /************************************************************************************************/
    /**************************************** Custom Methods ****************************************/
    /************************************************************************************************/



    function get_all_workspaces() {
        return db.view("deepamehta3/by_type", {key: "Workspace"})
    }

    function create_workspace(name) {
        var fields = [
            {id: "Name",        model: {type: "text"}, view: {editor: "single line"}, content: name},
            {id: "Description", model: {type: "text"}, view: {editor: "multi line"},  content: ""}
        ]
        var workspace = create_raw_topic("Workspace", fields, {}, "PlainDocument")
        save_document(workspace)
        return workspace
    }

    function workspace_selected(menu_item) {
        var value = menu_item.value
        log("Workspace selected: " + value)
        if (value == "_new") {
            new_workspace()
        }
    }

    function new_workspace() {
        $("#workspace_dialog").dialog("open")
    }

    function do_create_workspace() {
        $("#workspace_dialog").dialog("close")
        var name = $("#workspace_name").val()
        var workspace_id = create_workspace(name)._id
        update_workspace_selector()
        select_workspace(workspace_id)
        return false
    }

    function update_workspace_selector(workspaces) {
        if (!workspaces) {
            workspaces = get_all_workspaces()
        }
        ui.empty_menu("workspace_select")
        for (var i = 0, row; row = workspaces.rows[i]; i++) {
            ui.add_menu_item("workspace_select", {label: row.value, value: row.id})
        }
        ui.add_menu_separator("workspace_select")
        ui.add_menu_item("workspace_select", {label: "New Workspace...", value: "_new", is_trigger: true})
    }

    function select_workspace(workspace_id) {
        ui.select_menu_item("workspace_select", workspace_id)
    }
}
