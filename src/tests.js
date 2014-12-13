/*
 Unit tests for derevo.js
 */

var testData = [
    {
        name     : "Adam",
        selected : false,
        children : [
            {
                name     : "Cain",
                selected : false,
                children : [
                    {
                        name     : "Methushael",
                        selected : false,
                        children : [
                            {
                                name     : "Adah",
                                selected : false,
                                children : [
                                ]
                            },
                            {
                                name     : "Lamech",
                                selected : false,
                                children : [
                                ]
                            },
                            {
                                name     : "Zillah",
                                selected : false,
                                children : [
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name     : "Abel",
                selected : false,
                children : [
                ]
            },
            {
                name     : "Seth",
                selected : false,
                children : [
                    {
                        name     : "Noah",
                        selected : false,
                        children : [
                            {
                                name     : "Shem",
                                selected : false,
                                children : [
                                ]
                            },
                            {
                                name     : "Ham",
                                selected : false,
                                children : [
                                ]
                            },
                            {
                                name     : "Japheth",
                                selected : false,
                                children : [
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        name     : "Rumpelstiltskin",
        selected : false,
        children : [
        ]
    }
];

var testData2 = [
    {
        name     : "Adam",
        selected : false,
        children : [
            {
                name     : "Cain",
                selected : false,
                children : [
                    {
                        name     : "Methushael",
                        selected : false,
                        children : [
                            {
                                name     : "Adah",
                                selected : false,
                                children : [
                                ]
                            },
                            {
                                name     : "Lamech",
                                selected : false,
                                children : [
                                ]
                            },
                            {
                                name     : "Zillah",
                                selected : false,
                                children : [
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                name     : "Abel",
                selected : false,
                children : [
                ]
            },
            {
                name     : "Seth",
                selected : false,
                children : [
                    {
                        name     : "Noah",
                        selected : false,
                        children : [
                            {
                                name     : "Shem",
                                selected : false,
                                children : [
                                ]
                            },
                            {
                                name     : "Ham",
                                selected : false,
                                children : [
                                ]
                            },
                            {
                                name     : "Japheth",
                                selected : false,
                                children : [
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

var testData3 = [
    {
        name     : "Test1",
        selected : false,
        deferred : true,
        children : [
            {
                name     : "Test11",
                selected : false,
                deferred : true,
                children : [
                    {
                        name     : "Test111",
                        selected : false,
                        children : [
                        ]
                    }
                ]
            },
            {
                name     : "Test12",
                selected : false,
                children : [
                ]
            }
        ]
    },
    {
        name     : "Test2",
        selected : false,
        deferred : true,
        children : [
        ]
    }
];

function newTreeController(id, data) {
    return new derevo.SelectTreeController(id, data);
    //return new derevo.TreeController(id, data);
}

test("Test Element Construction", function() {

    var tree = new derevo.TreeController("testTree");

    var node = tree._createTreeNode("4-4L-5", {
        name     : "Tester",
        selected : false,
        children : [
        ]
    });

    // Node is:
    // <div class="box"><div class="node">4-4L-5LTester</div></div>
    // <ul style="background: ..."></ul>

    equal(derevo.hasClassName(node, "tree-element"), true);
    equal(node.children.length, 2);
    equal(derevo.hasClassName(node.children[0], "box"), true);
    equal(node.children[0].children.length, 1);
    equal(derevo.hasClassName(node.children[0].children[0], "node"), true);
    equal(node.children[1].tagName.toLowerCase(), "ul");
});

test("Test Construction and Update", function() {

    try {
        newTreeController("unknown_id");
        ok(false, "Unknown root element should throw an error");
    } catch(e) {
        equal("" + e, "Error: Could not find root element")
    }

    var root_element = derevo.$("testTree");

    root_element.innerHTML = "test123";

    var tree = newTreeController("testTree");

    equal(root_element.innerHTML, "");

    equal(JSON.stringify(tree._data), "{}");

    tree.update(derevo.cloneData(testData));

    // Test index lookup
    equal(tree.getDataItem("0").name, "Adam", "Check Adam");
    equal(tree.getDataItem("0-0").name, "Cain", "Check Cain");
    equal(tree.getDataItem("0-0-0L-1").name, "Lamech", "Check Lamech");
    equal(tree.getDataItem("0-1").name, "Abel", "Check Abel");
    equal(tree.getDataItem("0-2L").name, "Seth", "Check Seth");
    equal(tree.getDataItem("0-2L-0L-1").name, "Ham", "Check Ham");
    equal(tree.getDataItem("1L").name, "Rumpelstiltskin", "Check Rumpelstilskin");
    equal(tree.getDataItem("5"), undefined, "Check out-of-bounds1");
    equal(tree.getDataItem("0-2L-0L-1-0"), undefined, "Check out-of-bounds2");

    tree.getDomElement("0");

    equal(tree.getDomElement("0")._derevo_index, "0", "Check element 0");
    equal(tree.getDomElement("0-0-0L")._derevo_index, "0-0-0L", "Check element 0-0-0L");
    equal(tree.getDomElement("0-2-0-1")._derevo_index, "0-2L-0L-1", "Check element 0-2-0-1");
    equal(tree.getDomElement("5"), undefined, "Check element out-of-bounds1");
    equal(tree.getDomElement("0-2L-0L-1-0"), undefined, "Check element out-of-bounds2");

    // Check update

    tree.insertChild('', {
        name     : "Tester1",
        selected : false,
        children : [
        ]
    });

    tree.insertChild("0-1", {
        name     : "Tester2",
        selected : false,
        children : [
        ]
    });


    tree.insertChild("0-2-0", {
        name     : "Tester3",
        selected : false,
        children : [
        ]
    });

    equal(tree.getDomElement("0")._derevo_index, "0", "Check root element");
    equal(tree.getDomElement("1")._derevo_index, "1", "Check old last element");
    equal(tree.getDomElement("2")._derevo_index, "2L", "Check tester1 element");
    equal(tree.getDomElement("0-1-0")._derevo_index, "0-1-0L", "Check tester2 element");
    equal(tree.getDomElement("0-2-0-2")._derevo_index, "0-2L-0L-2", "Check sibling tester3 element");
    equal(tree.getDomElement("0-2-0-3")._derevo_index, "0-2L-0L-3L", "Check tester3 element");

    // Load another tree (only one root node at first)

    tree.update(derevo.cloneData(testData2));

    // This requires the old root node to be moved

    tree.insertChild('', {
        name     : "Tester1",
        selected : false,
        children : [
        ]
    });

    tree.insertChild("0-1", {
        name     : "Tester2",
        selected : false,
        children : [
        ]
    });


    tree.insertChild("0-2-0", {
        name     : "Tester3",
        selected : false,
        children : [
        ]
    });

    equal(tree.getDomElement("0")._derevo_index, "0", "Check root element");
    equal(tree.getDomElement("1")._derevo_index, "1L", "Check tester1 element");
    equal(tree.getDomElement("0-1-0")._derevo_index, "0-1-0L", "Check tester2 element");
    equal(tree.getDomElement("0-2-0-2")._derevo_index, "0-2L-0L-2", "Check sibling tester3 element");
    equal(tree.getDomElement("0-2-0-3")._derevo_index, "0-2L-0L-3L", "Check tester3 element");

    // Delete elements from the tree

    tree.deleteChild("1");
    tree.deleteChild("0-1-0");
    tree.deleteChild("0-2-0-1");

    equal(tree.getDataItem("1"), undefined, "Check delete tester1 data item");
    equal(tree.getDataItem("0-1-0"), undefined, "Check delete tester2 data item");
    equal(tree.getDataItem("0-2-0-1").name, "Japheth", "Check delete Ham data item");
    equal(tree.getDomElement("0-2-0-1")._derevo_index, "0L-2L-0L-1", "Check delete Ham dom items1");
    equal(tree.getDomElement("0-2-0-2")._derevo_index, "0L-2L-0L-2L", "Check delete Ham dom items2");
});

test("Test Deferred Expansion", function() {

    var tree = newTreeController("testTree", derevo.cloneData(testData3));

    equal(tree.getDomElement("0-0"), undefined);

    // Simulate click event
    derevo.bind(tree._options.event_handler.branchToggle, tree)
        (tree.getDomElement("0"));

    equal(tree.getDomElement("0-0")._derevo_index, "0-0");
    equal(tree.getDomElement("0-1")._derevo_index, "0-1L");
    equal(tree.getDomElement("0-0-0"), undefined);

    derevo.bind(tree._options.event_handler.branchToggle, tree)
        (tree.getDomElement("0-0"));

    equal(tree.getDomElement("0-0-0")._derevo_index, "0-0-0L");

    equal(tree.getDomElement("1-0"), undefined);

    derevo.bind(tree._options.event_handler.branchToggle, tree)
        (tree.getDomElement("1"));

    equal(tree.getDomElement("1-0"), undefined);
});

test("Test Selection", function() {

    var tree = new derevo.SelectTreeController("testTree", derevo.cloneData(testData));

    // Simulate click event
    var click = function (index) {
        var tickbox = derevo.findChildren(tree.getDomElement(index), "input", 1)[0];
        tickbox.checked = !tickbox.checked;
        derevo.bind(tree._options.event_handler.tickToggle, tree)
            (index, tickbox, tree.getDataItem(index));
    },
    check = function (index) {
        var tickbox = derevo.findChildren(tree.getDomElement(index), "input", 1)[0];
        return tickbox.checked;
    };

    click("0-2");

    // Check parent is selected indeed
    equal(check("0-2"), true);

    // Check all children are selected
    equal(check("0-2-0"), true);
    equal(check("0-2-0-0"), true);
    equal(check("0-2-0-1"), true);
    equal(check("0-2-0-2"), true);

    equal(check("0"), false);

    click("0-0");

    // Check all children are selected
    equal(check("0-0-0"), true);
    equal(check("0-0-0-0"), true);
    equal(check("0-0-0-1"), true);
    equal(check("0-0-0-2"), true);

    equal(check("0"), false);

    click("0-1");

    // Root should now be selected since all children are selected
    equal(check("0"), true);

    click("0-0");

    // Check all children are deselected
    equal(check("0-0-0"), false);
    equal(check("0-0-0-0"), false);
    equal(check("0-0-0-1"), false);
    equal(check("0-0-0-2"), false);

    // Root is deselected
    equal(check("0"), false);

    // All other siblings are still selected
    equal(check("0-1"), true);
    equal(check("0-2-0"), true);
    equal(check("0-2-0-0"), true);
    equal(check("0-2-0-1"), true);
    equal(check("0-2-0-2"), true);
});

test("Test Tree Update", function() {

    var data = derevo.cloneData(testData),
        tree = newTreeController("testTree", data);

    equal(tree.getDataItem("1-0"), undefined, "Check Test1 data does not exist");
    equal(tree.getDomElement("1-0"), undefined, "Check Test1 element does not exist");

    // Update the data structure
    data[1].children = derevo.cloneData(testData3);

    equal(tree.getDataItem("1-0").name, "Test1", "Check Test1 data now exists");
    equal(tree.getDomElement("1-0"), undefined, "Check Test1 element does not exist");

    tree.updateBranch("1");

    equal(tree.getDataItem("1-0").name, "Test1", "Check Test1 data now exists");
    equal(tree.getDomElement("1-0")._derevo_index, "1L-0", "Check Test1 element now exist");
});

test("Test API Selection", function() {

    var tree = new derevo.SelectTreeController("testTree", derevo.cloneData(testData));

    tree.toggleChild("0-2");

    // Check parent is selected indeed
    equal(tree.getChildTickStatus("0-2"), true);

    // Check all children are selected
    equal(tree.getChildTickStatus("0-2-0"), true);
    equal(tree.getChildTickStatus("0-2-0-0"), true);
    equal(tree.getChildTickStatus("0-2-0-1"), true);
    equal(tree.getChildTickStatus("0-2-0-2"), true);

    equal(tree.getChildTickStatus("0"), false);

    tree.toggleChild("0-0");

    // Check all children are selected
    equal(tree.getChildTickStatus("0-0-0"), true);
    equal(tree.getChildTickStatus("0-0-0-0"), true);
    equal(tree.getChildTickStatus("0-0-0-1"), true);
    equal(tree.getChildTickStatus("0-0-0-2"), true);

    equal(tree.getChildTickStatus("0"), false);

    tree.toggleChild("0-1");

    // Root should now be selected since all children are selected
    equal(tree.getChildTickStatus("0"), true);

    tree.toggleChild("0-0");

    // Check all children are deselected
    equal(tree.getChildTickStatus("0-0-0"), false);
    equal(tree.getChildTickStatus("0-0-0-0"), false);
    equal(tree.getChildTickStatus("0-0-0-1"), false);
    equal(tree.getChildTickStatus("0-0-0-2"), false);

    // Root is deselected
    equal(tree.getChildTickStatus("0"), false);

    // All other siblings are still selected
    equal(tree.getChildTickStatus("0-1"), true);
    equal(tree.getChildTickStatus("0-2-0"), true);
    equal(tree.getChildTickStatus("0-2-0-0"), true);
    equal(tree.getChildTickStatus("0-2-0-1"), true);
    equal(tree.getChildTickStatus("0-2-0-2"), true);

    var list = [];
    tree.iterateSelectedChildren(function (index) {
        list.push(index);
    });
    equal(list.toString(), "0-1,0-2L,0-2L-0L,0-2L-0L-0,0-2L-0L-1,0-2L-0L-2L");

    list = [];
    tree.iterateSelectedChildren(function (index) {
        list.push(index);
    }, "0-2");
    equal(list.toString(), "0-2L,0-2L-0L,0-2L-0L-0,0-2L-0L-1,0-2L-0L-2L");
});



test("Test Deferred Expansion and selection", function() {
    var tree = new derevo.SelectTreeController("testTree", derevo.cloneData(testData3)),
        getInputElement = function (index) {
            return derevo.findChildren(tree.getDomElement(index), "input", 1)[0];
        };

    tree.getDataItem("0-0-0").selected = true;

    // Simulate click event on a branch
    derevo.bind(tree._options.event_handler.branchToggle, tree)
        (tree.getDomElement("0"));

    equal(tree.getChildTickStatus("0"), false);
    equal(getInputElement("0").indeterminate, false);
    equal(tree.getChildTickStatus("0-0"), false);
    equal(getInputElement("0-0").indeterminate, false);

    // Simulate click event on a branch
    derevo.bind(tree._options.event_handler.branchToggle, tree)
        (tree.getDomElement("0-0"));

    equal(tree.getChildTickStatus("0"), false);
    equal(getInputElement("0").indeterminate, true);
    equal(tree.getChildTickStatus("0-0"), true);
    equal(getInputElement("0-0").indeterminate, false);
    equal(tree.getChildTickStatus("0-0-0"), true);
    equal(getInputElement("0-0-0").indeterminate, false);

    tree = new derevo.SelectTreeController("testTree", derevo.cloneData(testData3));

    tree.toggleChild("0");

    // Simulate click event on a branch
    derevo.bind(tree._options.event_handler.branchToggle, tree)
        (tree.getDomElement("0"));

    equal(tree.getChildTickStatus("0"), true);
    equal(tree.getChildTickStatus("0-0"), true);
    equal(tree.getChildTickStatus("0-1"), true);

    tree = new derevo.SelectTreeController("testTree", derevo.cloneData(testData3)),
        getInputElement = function (index) {
            return derevo.findChildren(tree.getDomElement(index), "input", 1)[0];
        };

    tree.toggleChild("0-0-0L");

    equal(tree.getDomElement("0-0"), undefined);
    equal(getInputElement("0").indeterminate, true);

    // Simulate click event on a branch
    derevo.bind(tree._options.event_handler.branchToggle, tree)
        (tree.getDomElement("0"));

    equal(tree.getDomElement("0-0")._derevo_index, "0-0");
    equal(tree.getDomElement("0-1")._derevo_index, "0-1L");
    equal(tree.getDomElement("0-0-0"), undefined);

    equal(getInputElement("0").indeterminate, true);
    equal(getInputElement("0-0").indeterminate, true);

    // Simulate another click event on a branch
    derevo.bind(tree._options.event_handler.branchToggle, tree)
        (tree.getDomElement("0-0"));

    equal(tree.getDomElement("0-0-0")._derevo_index, "0-0-0L");
    equal(tree.getDomElement("1-0"), undefined);

    equal(getInputElement("0").indeterminate, true);
    // We known now all children so we can say if it is checked or not
    equal(getInputElement("0-0").indeterminate, false);

    equal(tree.getChildTickStatus("0"), false);
    equal(tree.getChildTickStatus("0-0"), true);
    equal(tree.getChildTickStatus("0-0-0"), true);

    derevo.bind(tree._options.event_handler.branchToggle, tree)
        (tree.getDomElement("1"));

    equal(tree.getDomElement("1-0"), undefined);
});
