/*** Module loadmodule ***/

var last_idalgo_modules = new Array();
for(var i=0;i<=24;i++) {
	last_idalgo_modules[i]=new Array("","");
}

function LoadModules(modules) {
	if(document.getElementById("idalgo")) {
		var area=new Array('h1','header_01','header_02','header_03','header_04','content_left','content_01','content_02','content_03','content_04','content_05','content_06','content_07','content_08','content_right','block_01','block_02','block_03','block_04','block_05','block_06','block_07','block_08','footer_01');
		for(var i=0;i<modules.length;i++) {
			if(!(last_idalgo_modules[i][0]==modules[i][0] && last_idalgo_modules[i][1]==modules[i][1])) {
				if(modules[i][1]=="clean") {
					document.getElementById('idalgo_'+area[i]).innerHTML="";
				} else {
					loadModuleTarget('idalgo_'+area[i],modules[i][0],modules[i][1]); 
				}
				last_idalgo_modules[i][0]=modules[i][0];
				last_idalgo_modules[i][1]=modules[i][1];
			}
		}
		ClickAudience();
		return false;
	}
	else {
		return true;
	}
}

function ClickAudience() {
	idalgo_audience = document.getElementById("idalgo_audience");
	if(idalgo_audience) {
		idalgo_audience.src= "/motor/cache/page/audience.html";
	}
}

function ia(module,params) { return new Array(module,params); }

var vg_loadmodule_url = "/motor/cache/page/loadmodule.php";
var vg_req = new Array(); // tableau de chargement des contenus en modules //

function loadModuleDone(target) {
	if (vg_req[target].readyState == 4) {
		if (vg_req[target].status == 200) {
			var reponse = vg_req[target].responseText;
			document.getElementById(target).innerHTML = reponse;
		} else {
			document.getElementById(target).innerHTML="Erreur ("+vg_req[target].statusText+") lors du chargement du contenu.";
		}
	}
}
function loadModule(module, args) { loadModuleTarget(module, module, args); }
function loadModuleTarget(target, module, args) {
	loadModuleTargetSplash(target, module, args, true);
}
function loadModuleTargetSplash(target, module, args, splash) {
	var url = vg_loadmodule_url+"?type=html&module="+module;
	if(args != "") url += "&args="+escape(args);
	// -- Si on veut on peut placer un message d'attente pour le chargement ici --
	if(splash) document.getElementById(target).innerHTML = '<div id="idalgo_'+module+'" style="text-align:center;background:none;background-color:white;"></div>';
	if (window.XMLHttpRequest) { vg_req[target] = new XMLHttpRequest(); vg_req[target].onreadystatechange = function() {loadModuleDone(target);}; vg_req[target].open("GET", url, true); vg_req[target].send(null); }
	else // IE/Windows ActiveX version
		if (window.ActiveXObject) { vg_req[target] = new ActiveXObject("Microsoft.XMLHTTP"); if (vg_req[target]) { vg_req[target].onreadystatechange = function() {loadModuleDone(target);}; vg_req[target].open("GET", url, true); vg_req[target].send(); } }
}

function idalgo_jsf_hideBig() {
	idalgo_img_overlay=document.getElementById("div_idalgo_img_overlay");
	idalgo_img_overlay.parentNode.removeChild(idalgo_img_overlay);
	idalgo_img_big=document.getElementById("div_idalgo_img_big");
	idalgo_img_big.parentNode.removeChild(idalgo_img_big);
}
function idalgo_jsf_showBig(img) {
	var idalgo_img_overlay = document.createElement("div");
	idalgo_img_overlay.id = "div_idalgo_img_overlay";
	idalgo_img_overlay.className='idalgo_opacity_75';
	idalgo_img_overlay.style.zindex=1000;
	idalgo_img_overlay.setAttribute('onclick', 'idalgo_jsf_hideBig();');
	
	var idalgo_img_big = document.createElement("div");
	idalgo_img_big.id = "div_idalgo_img_big";
	idalgo_img_big.className='idalgo_img_big_content';
	idalgo_img_big.style.zindex=1001;
	idalgo_img_big.innerHTML="<img src='"+img+"' onclick='idalgo_jsf_hideBig(); 'border='0' style='cursor:pointer;' alt=\"Cliquez pour revenir &agrave; l'album\" title=\"Cliquez pour revenir &agrave; l'album\" />";
	var b = document.getElementsByTagName("body")[0];
	b.appendChild(idalgo_img_overlay);
	b.appendChild(idalgo_img_big);
}