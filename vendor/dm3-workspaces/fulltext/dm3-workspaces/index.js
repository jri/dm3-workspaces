function(doc) {

    if (doc.type != "Topic" || doc.topic_type != "Workspace") {
        return
    }

    var ret = new Document();

    ret.add(doc.topic_type, {store: "yes", index: "not_analyzed"})
    ret.add(doc.fields[0].content, {store: "yes"});

    return ret;
}
