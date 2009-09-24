function dm3_workspaces() {
    this.name = "dm3-workspaces"
    css_stylesheet("vendor/dm3-workspaces/style/dm3-workspaces.css")
}

dm3_workspaces.prototype = {

    init: function() {
        var workspaces = db.view("deepamehta3/by_type", {key: "Workspace"})
        // update DB: create default workspace
        if (workspaces.rows.length == 0) {
            var fields = [{id: "Name", show_label: true, type: "single line", content: "Default"}]
            create_topic("Workspace", fields, "PlainDocument")
            workspaces = db.view("deepamehta3/by_type", {key: "Workspace"})
        }
        // update GUI: create workspace selector
        var select = $("<select>").attr("id", "workspace_select")
        for (var i = 0, row; row = workspaces.rows[i]; i++) {
            select.append($("<option>").attr("id", row.id).text(row.value))
        }
        var workspace_div = $("<div>").attr("id", "workspace_form").text("Workspace ").append(select)
        $("#upper_toolbar").prepend(workspace_div)
    },

    // Note: we use the pre_create hook to let the "Workspaces" field be saved also if the user cancels the initial editing.
    pre_create: function(doc) {
        if (doc.type == "Topic") {
            doc.fields.push({
                id: "Workspaces",
                show_label: false,
                type: "relation",
                related_type: "Workspace"
            })
        } else {
            // TODO: handle relations too
        }
    },

    // Note: we must use the post_create hook to create the relation because at pre_create the document has no ID yet.
    post_create: function(doc) {
        if (doc.type == "Topic") {
            var workspace_id = $("#workspace_select option:selected").attr("id")
            // Note: workspace_id is undefined in case the doc is the (just created) default workspace itself.
            if (workspace_id) {
                create_relation(doc._id, workspace_id)
            }
        } else {
            // TODO: assign relations to a workspace
        }
    }
}
