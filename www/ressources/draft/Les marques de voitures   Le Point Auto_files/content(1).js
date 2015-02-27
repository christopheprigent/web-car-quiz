/**
 * iDalgo - Gestion des filtres de types de commentaires. 
 */
function iDalgo_Motor_FilterComment(listRefCommentType) {
	if (listRefCommentType) {	
		listRefCommentType = listRefCommentType.split(',');
	}
	
	var list_comment = document.getElementById("idalgo_list_comment");
	list_comment = list_comment.childNodes;
    for(var i=0; i < list_comment.length; i++) {
    	var node = list_comment[i];
    	if (node.tagName=='DIV') {
	    	var comment = list_comment[i];

	    	if (listRefCommentType) {	
	    		var isRefComment = false;
	    		var refcommentType = comment.getAttribute('ref_comment_type');
	    		for (var key in listRefCommentType) {
	    			if(listRefCommentType[key] == refcommentType) {
	    				isRefComment = true;
	    				break;
	    			}
	    		}
	    		if (isRefComment) {
	    			comment.style.display="block";
	    		} else {
	    			comment.style.display="none";
	    		}
	    	} else {
	    		comment.style.display="block";
	    	}
    	}
    }
}

/**
 * iDalgo - Fonction de rafraichissement en live des resultats de F1. 
 * Initialisation de l'objet.
 */
function iDalgo_Motor_InitLive()
{
	if (!this.iDalgo) {
		iDalgo = {};	
	}
	if (!iDalgo.motor) {
		iDalgo.motor = {};	
	}
	if (!iDalgo.motor.live) {
		iDalgo.motor.live = {};	
	}
	if (!iDalgo.motor.live.isRefresh) {
		iDalgo.motor.live.isRefresh = false;	
	}
	if (!iDalgo.motor.live.isLive) {
		iDalgo.motor.live.isLive = false;	
	}
	if (!iDalgo.motor.live.isLive) {
		iDalgo.motor.live.isLive = null;	
	}
	if (!iDalgo.motor.live.dateLive) {
		iDalgo.motor.live.dateLive = null;	
	}
	if (!iDalgo.motor.live.dateOffset) {
		iDalgo.motor.live.dateOffset = null;	
	}
	if (!iDalgo.motor.live.numRefresh) {
		iDalgo.motor.live.numRefresh = 60;	
	}
	if (!iDalgo.motor.live.numRefreshCurrent) {
		iDalgo.motor.live.numRefreshCurrent = 0;	
	}
	if (!iDalgo.motor.live.objInterval) {
		iDalgo.motor.live.objInterval = null;	
	}
}
iDalgo_Motor_InitLive();

/**
 * iDalgo - Fonction de rafraichissement en live des resultats de F1 
 * Fonction d'initialisation.
 */	
function iDalgo_Motor_InitRefresh()
{
	if (iDalgo) {
		if (iDalgo.motor) {
			if (iDalgo.motor.live) {
				if (iDalgo.motor.live.objInterval == null) {
					if (iDalgo.motor.live.isRefresh == true) {
						iDalgo.motor.live.numRefreshCurrent = iDalgo.motor.live.numRefresh;
						iDalgo.motor.live.objInterval = window.setTimeout('iDalgo_Motor_RefreshTime()', 1000);
					}
				}
			}	
		}
	}
}
	
/**
 * iDalgo - Fonction de rafraichissement en live des resultats de F1 
 * Fonction de gestion du temps.
 */	
function iDalgo_Motor_RefreshTime()
{
	if (iDalgo) {
		if (iDalgo.motor) {
			if (iDalgo.motor.live) {
				if (iDalgo.motor.live.isRefresh) {
					if (iDalgo.motor.live.numRefreshCurrent > 0) {
						// Decrementation du temps.
						iDalgo.motor.live.numRefreshCurrent --;
						iDalgo.motor.live.objInterval = window.setTimeout('iDalgo_Motor_RefreshTime()', 1000);
						iDalgo_Motor_RefreshStopWatch();
					} else {
						// Lancement des Mises à jours.
						iDalgo_Motor_RefreshContent();
						iDalgo.motor.live.numRefreshCurrent = iDalgo.motor.live.numRefresh;
						iDalgo.motor.live.objInterval = window.setTimeout('iDalgo_Motor_RefreshTime()', 1000);
					}				
				} else {
					// Desactivation du raffraichissement.
					iDalgo.motor.live.objInterval = null;
				}				
			}
		}
	}
}


/**
 * iDalgo - Fonction de rafraichissement en live des resultats de F1 
 * Fonction de mise à jour des chronomètres.
 */	
function iDalgo_Motor_RefreshStopWatch()
{
	if (iDalgo) {
		if (iDalgo.motor) {
			if (iDalgo.motor.live) {
				if(document.getElementById('idalgo_list_comment_counter')) {
					var txtRefreshCurrent = '';
					if (iDalgo.motor.live.isRefresh && iDalgo.motor.live.numRefreshCurrent>0) {
						txtRefreshCurrent = iDalgo.motor.live.numRefreshCurrent+"'";					
					}
					document.getElementById('idalgo_list_comment_counter').innerHTML = txtRefreshCurrent;
				}

				var divTimeSpend = document.getElementById('idalgo_time_spent');
				if(divTimeSpend) {
					iDalgo.motor.live.isLive = divTimeSpend.getAttribute('is_live') == '1';
					var txtTimeCurrent = '';
					if (iDalgo.motor.live.isLive && iDalgo.motor.live.dateLive && iDalgo.motor.live.dateServer) {
						if(iDalgo.motor.live.dateStop){
							var dateStopWatch = new Date();
							var dateStop = new Date(iDalgo.motor.live.dateStop);
							var dateStart = new Date(iDalgo.motor.live.dateLive);
							
							var time = dateStop.getTime() - dateStart.getTime() - 3600000;
							dateStopWatch.setTime(time);
							
							txtTimeCurrent = iDalgo_Motor_TimeFormat(dateStopWatch);							
						} else {
							var dateStopWatch = new Date();
							var dateCurrent = new Date();
							var dateServer = new Date(iDalgo.motor.live.dateServer);
							var dateStart = new Date(iDalgo.motor.live.dateLive);
							
							var time = dateCurrent.getTime() - dateStart.getTime() - 3600000 - iDalgo.motor.live.dateOffset;
							dateStopWatch.setTime(time);
							
							txtTimeCurrent = iDalgo_Motor_TimeFormat(dateStopWatch);
						}						
					}
					document.getElementById('idalgo_time_spent').innerHTML = txtTimeCurrent;
				}
			}
		}
	}
}

/**
 * iDalgo - Fonction de rafraichissement en live des resultats de F1 
 * Formatage du chrnonmètre.
 */
function iDalgo_Motor_TimeFormat(date)
{
	var txtReturn='';
	if (date.getHours() > 0) {		
		txtReturn = txtReturn + date.getHours();
	}
	if (txtReturn.length > 0) {
		txtReturn += ':';
	}
	txtReturn += iDalgo_Motor_TimeDouble(date.getMinutes());
	txtReturn += ':'+iDalgo_Motor_TimeDouble(date.getSeconds());
	
	return txtReturn;
}

/**
 * iDalgo - Fonction de rafraichissement en live des resultats de F1 
 * Formatage du double zéro des dates.
 */
function iDalgo_Motor_TimeDouble(number)
{
	if (parseInt(number)<10) {
		return '0'+number;
	} else {
		return number;
	}
}

/**
 * iDalgo - Fonction de rafraichissement en live des resultats de F1 
 * Calcul de l'offset de date.
 */
function iDalgo_Motor_TimeOffset(dateServer)
{
	var dateCurrent = new Date();
	var dateServer = new Date(iDalgo.motor.live.dateServer);
	return dateCurrent.getTime() - dateServer.getTime();
}

/**
 * iDalgo - Fonction de rafraichissement en live des resultats de F1 
 * Mise à jour des contenus.
 */
function iDalgo_Motor_RefreshContent()
{
	iDalgo_Motor_RefreshContent_Result();
	iDalgo_Motor_RefreshContent_ResultLive();
	iDalgo_Motor_RefreshContent_ResultNavigation();	
	iDalgo_Motor_RefreshContent_BlockResult();
}
function iDalgo_Motor_RefreshContent_ResultNavigation()
{
	var div_main = document.getElementById("idalgo_content_result_navigation");
	if(div_main) {
		var time_spent      = document.getElementById("idalgo_time_spent");
		if (time_spent) {
			var txt_competition = time_spent.getAttribute("txt_competition");
	        var ref_race        = time_spent.getAttribute("ref_race");
	        var txt_stage       = time_spent.getAttribute("txt_stage");
	        var txt_section     = time_spent.getAttribute("txt_section");
	        var ref_language 	= time_spent.getAttribute("ref_language");
			
			loadModuleTarget("idalgo_content_01","content_result_navigation","txt_competition="+txt_competition+"&ref_race="+ref_race+"&txt_stage="+txt_stage+"&txt_section="+txt_section+"&is_live=true&ref_language="+ref_language);
		}
	}
}
function iDalgo_Motor_RefreshContent_ResultLive()
{
	var div_main = document.getElementById("idalgo_content_result_live");
	if(div_main) {
		var time_spent 		= document.getElementById("idalgo_time_spent");
		if (time_spent) {
			var txt_competition = time_spent.getAttribute("txt_competition");
	        var ref_race        = time_spent.getAttribute("ref_race");
			
		    loadModuleTarget("idalgo_content_02","content_result_live","txt_competition="+txt_competition+"&ref_race="+ref_race+"&is_live=false&ref_language=2");
		}
    }
}
function iDalgo_Motor_RefreshContent_Result()
{
	var div_main = document.getElementById("idalgo_content_result");
	if(div_main) {
		var time_spent      = document.getElementById("idalgo_time_spent");
		if (time_spent) {
			var txt_competition = time_spent.getAttribute("txt_competition");
			var ref_race        = time_spent.getAttribute("ref_race");
			var txt_stage       = time_spent.getAttribute("txt_stage");
			var txt_section     = time_spent.getAttribute("txt_section");
			var ref_language 	= time_spent.getAttribute("ref_language");
			
			loadModuleTarget("idalgo_content_02","content_result","txt_competition="+txt_competition+"&ref_race="+ref_race+"&txt_stage="+txt_stage+"&txt_section="+txt_section+"&is_live=true&ref_language="+ref_language);		
		}
	}
}
function iDalgo_Motor_RefreshContent_BlockResult()
{
	var div_main = document.getElementById("idalgo_block_result_content");
	if(div_main) {
		var txt_competition = div_main.getAttribute("txt_competition");
		var ref_language 	= div_main.getAttribute("ref_language");
		
	    loadModuleTarget("idalgo_block_01","block_result","txt_competition="+txt_competition+"&ref_language="+ref_language);
    }
}