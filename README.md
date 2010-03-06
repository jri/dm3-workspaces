
DeepaMehta 3 Workspaces Plugin
==============================

The Workspaces Plugin allows you to divide the DeepaMehta 3 knowledge base into thematic subsets.
Every topic and every relation is assigned to one or more (or no) workspaces.
By switching between workspaces you can instantly reveal subsets of your knowledge base.
For every topic DeepaMehta tells you the workspace(s) it belongs to.

Furthermore, in conjunction with the DeepaMehta 3 Email plugin (<http://github.com/jri/dm3-email>)
a workspace provides the basis for distribution emails.


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

4.  Copy additional stuff:
        cp -r vendor/dm3-workspaces/views/dm3-workspaces_by-name views
        cp -r vendor/dm3-workspaces/fulltext/dm3-workspaces fulltext

5.  Upload changes to CouchDB:
        couchapp push http://localhost:5984/deepamehta3-db

6.  Check if installation was successful: visit DeepaMehta 3 in your webbrowser (resp. press reload):  
    <http://localhost:5984/deepamehta3-db/_design/deepamehta3/index.html>  
    If you see the *Workspace* menu in the upper left corner everything is OK.


Usage
-----

*   Use the *Workspace* menu to select a workspace. Every topic and relation you are
    creating is programmatically assigned to the selected workspace by default.

*   To manually change a topic's workspace assignment click the topic, then press the *Edit* button.
    Use the *Workspaces* checkboxes to select the desired workspace(s).

*   To reveal all topics of a workspace use the *Workspace* menu to select it.
    The right panel displays all of its topics.

*   To see the workspaces a topic belongs to click the topic.
    The right panel displays its workspace assignments (beside other topic details).


Updating
--------

1.  Go to your DeepaMehta 3 installation directory:
        cd deepamehta3

2.  Update DeepaMehta 3 Workspaces Plugin:
        couchapp vendor update dm3-workspaces

3.  Copy additional stuff:
        cp -r vendor/dm3-workspaces/views/dm3-workspaces_by-name views
        cp -r vendor/dm3-workspaces/fulltext/dm3-workspaces fulltext

4.  Upload changes to CouchDB:
        couchapp push http://localhost:5984/deepamehta3-db


Version History
---------------

**v0.3** -- Mar 6, 2010

* Selecting a workspace reveals its contents
* Workspace "Description" is a rich text field
* Compatible with DeepaMehta 3 v0.3

**v0.2** -- Dec 1, 2009

* Basic functionality
* Requires DeepaMehta 3 v0.2


------------
Jörg Richter  
Mar 6, 2010
