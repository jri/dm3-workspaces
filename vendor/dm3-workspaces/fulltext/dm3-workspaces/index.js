function(doc) {

    if (doc.type != "Topic" || doc.topic_type != "Workspace") {
        return
    }

    var ret = new Document();

    ret.add(doc.fields[0].content, {store: "yes"});

    return ret;
}
