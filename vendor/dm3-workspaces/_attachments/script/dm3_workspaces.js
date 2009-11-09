function dm3_workspaces() {
    css_stylesheet("vendor/dm3-workspaces/style/dm3-workspaces.css")
    topic_type_icons["Workspace"] = create_image("vendor/dm3-workspaces/images/star.png")
}

dm3_workspaces.prototype = {

    init: function() {

        var workspaces = this.get_all_workspaces()
        create_default_workspace(this)
        create_workspace_selector(this)
        create_workspace_dialog(this)

        function create_default_workspace(module) {
            if (workspaces.rows.length == 0) {
                module.create_workspace("Default")
                workspaces = module.get_all_workspaces()
            }
        }

        function create_workspace_selector(module) {
            // update model
            current_workspace_id = workspaces.rows[0].id
            // update GUI
            var select = $("<select>").attr("id", "workspace_select").change(module.workspace_selected)
            var workspace_selector = $("<div>").attr("id", "workspace_form").text("Workspace ").append(select)
            $("#upper_toolbar").prepend(workspace_selector)
            module.update_workspace_selector(workspaces)
        }

        function create_workspace_dialog(module) {
            var workspace_dialog = $("<div>").attr("id", "workspace_dialog")
            var input = $("<input>").attr({id: "workspace_name", size: 30})
            workspace_dialog.append("Name:")
            workspace_dialog.append($("<form>").submit(module.do_create_workspace).append(input))
            $("body").append(workspace_dialog)
            $("#workspace_dialog").dialog({modal: true, autoOpen: false, draggable: false, resizable: false, width: 350,
                title: "New Workspace", buttons: {"OK": module.do_create_workspace}})
        }
    },

    // Note: we use the pre_create hook to let the "Workspaces" field be saved also if the user cancels the initial editing.
    pre_create: function(doc) {
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
    },

    // Note: we must use the post_create hook to create the relation because at pre_create the document has no ID yet.
    post_create: function(doc) {
        // Note 1: we do not relate search results to a workspace. Otherwise the search result would appear
        // as relation when displaying the workspace. That's because an "Auxiliray" relation is not be
        // created if there is another relation already.
        // Note 2: we do not relate workspaces to a workspace. This would be contra-intuitive.
        if (doc.type == "Topic" && doc.topic_type != "Search Result" && doc.topic_type != "Workspace") {
            var workspace_id = $("#workspace_select option:selected").attr("value")
            // Note: workspace_id is undefined in case the doc is the (just created) default workspace itself.
            if (workspace_id) {
                create_relation(doc._id, workspace_id)
            }
        } else {
            // TODO: assign relations to a workspace
        }
    },



    /************************************************************************************************/
    /**************************************** Custom Methods ****************************************/
    /************************************************************************************************/



    get_all_workspaces: function() {
        return db.view("deepamehta3/by_type", {key: "Workspace"})
    },

    create_workspace: function(name) {
        var fields = [
            {id: "Name",        model: {type: "text"}, view: {editor: "single line"}, content: name},
            {id: "Description", model: {type: "text"}, view: {editor: "multi line"},  content: ""}
        ]
        return create_topic("Workspace", fields, {}, "PlainDocument")
    },

    workspace_selected: function() {
        var value = $("#workspace_select option:selected").attr("value")
        log("workspace_selected: " + value)
        if (value == "_new") {
            dm3_workspaces.prototype.new_workspace()
            dm3_workspaces.prototype.update_workspace_selection()
        } else if (value == "") {
            dm3_workspaces.prototype.update_workspace_selection()
        } else {
            current_workspace_id = value
        }
    },

    new_workspace: function() {
        $("#workspace_dialog").dialog("open")
    },

    do_create_workspace: function() {
        $("#workspace_dialog").dialog("close")
        var name = $("#workspace_name").val()
        current_workspace_id = dm3_workspaces.prototype.create_workspace(name)._id
        dm3_workspaces.prototype.update_workspace_selector()
        dm3_workspaces.prototype.update_workspace_selection()
        return false
    },

    update_workspace_selector: function(workspaces) {
        if (!workspaces) {
            workspaces = this.get_all_workspaces()
        }
        var select = $("#workspace_select").empty()
        for (var i = 0, row; row = workspaces.rows[i]; i++) {
            select.append($("<option>").attr("value", row.id).text(row.value))
        }
        select.append($("<option>").attr("value", "").text("--------------"))
        select.append($("<option>").attr("value", "_new").text("New Workspace..."))
    },

    update_workspace_selection: function() {
        $("#workspace_select").val(current_workspace_id)
    }
}
