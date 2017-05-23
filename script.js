startRouting();

// this array holds the routes configuration


/*
* get the URL and convert it into URL Tree
*/
function parseURL(){
	this.URLTree = [];	// this will holds the tree nodes
	this.routerState = []; // this will holds the currently activated routes
	this.navigators;

	var pathName = window.location.pathname;
	var URLparts = pathName.substring(1,pathName.length-1).split("/");
	
	for (var i = 0; i < URLparts.length; i++) {
		this.URLTree.push(URLparts[i]);
	}
}


/* The Root Method whill be called when ever there is navigating*/
function startRouting(){
	parseURL();
	//buildRouterStateTree();
	setNavigators();
}

function setNavigators(){
	this.navigators = document.querySelectorAll(".navigator");
}


function navigate(to, sourceElement){
	changeURL(to);
	viewComponent(to);
	checkActivatedRoute();
}


/*
* go over all the navigators and check if they are activated or not
*/
function checkActivatedRoute(){
	for (var i = 0; i < this.navigators.length; i++) {
		if(window.location.href.indexOf(this.navigators[i].children[0].innerHTML) != -1){
			this.navigators[i].className = "active";
		}else{
			this.navigators[i].className = "";
		}
	}
}

/*
* change the URL without reloading the pagr
*/
function changeURL(to){
	window.history.pushState('page2', 'Title', to);
}


/*
* this function is responsible for viewing the component
*/
function viewComponent(to){
	var activatedRoute = recognizePath(to);
	var outlet = getRouterOutlet();
	outlet.innerHTML = activatedRoute.component;
}

/* This function return the <router-outlet> element*/
function getRouterOutlet(){
	return document.getElementsByTagName("router-outlet")[0];
}

function recognizePath(to){
	return this.routesConfiguration.find(function(item){
		if(item.path === to){
			return item;
		}
	});
}

var HomeComponent = `
<div class='container'>
	<h3> Home Page </h3>
	<p>
		this is the home page<br>
		to navigate to the next page press on the tabs above
	</p>
</div>
`;

var ViewComponent = 
`
<div class='container'>
	<h3> View Page </h3>
	<p>
		we listed the items you want to view select one of them
	</p>
	<ul class='list-group'>
		<a class='list-group-item'> Product One </a>
		<a class='list-group-item'> Product Two </a>
		<a class='list-group-item'> Product Three </a>
	</ul>
</div>
`;

var EditComponent = 
`
<div class='container'>
	<h2> Editing Page </h2>
	<p> This page is for editing Products </p>
</div>
`;

// this array holds the routes configuration
var routesConfiguration = [
	{
		path : 'Home',
		component : HomeComponent
	},
	{
		path : 'View',
		component: ViewComponent
	},
	{
		path : 'Edit',
		component : EditComponent
	}
];	

