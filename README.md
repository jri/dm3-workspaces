
DeepaMehta 3 Workspaces Plugin
==============================

Adds the capability to structure the knowledge base thematically.


Requirements
------------

* A DeepaMehta 3 installation  
  <http://github.com/jri/deepamehta3>


Installation
------------

1.  Go to your DeepaMehta 3 installation directory:
        cd deepamehta3

2.  Download DeepaMehta 3 Workspaces Plugin:
        couchapp vendor install git://github.com/jri/dm3-workspaces.git

3.  Activate the plugin by adding one line to DeepaMehta's `_attachments/javascript/plugins.js`:
        add_plugin("vendor/dm3-workspaces/script/dm3_workspaces.js")

4.  Add additional stuff by copying two directories:
        cp -r vendor/dm3-workspaces/views/dm3-workspaces_by-name views
        cp -r vendor/dm3-workspaces/fulltext/dm3-workspaces fulltext

5.  Upload changes to CouchDB:
        couchapp push http://localhost:5984/deepamehta3-db


Usage
-----

1.  Visit DeepaMehta 3 in your webbrowser (resp. press reload):
        http://localhost:5984/deepamehta3-db/_design/deepamehta3/index.html

2.  You'll find a "Workspace" selector in the upper left corner.  
    By default, newly created documents are assigned to the selected workspace.  
    In the edit form a document may be assigned to arbitrary workspaces.


Version History
---------------

`v0.2` -- Dec  1, 2009 -- Basic functionality. Requires DeepaMehta 3 v0.2


------------
Jörg Richter  
Dec 1, 2009
