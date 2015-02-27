function cre_cook0(nom,contenu) {
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + 600);
    document.cookie = nom + "=" + escape(contenu)+"; expires="+exdate.toUTCString()+"; path=/";
}
   
function lit_cook(nom) {
    var deb,fin
    deb = document.cookie.indexOf(nom + "=")
    if (deb >= 0) {
       deb += nom.length + 1
       fin = document.cookie.indexOf(";",deb)
       if (fin < 0) fin = document.cookie.length
       return unescape(document.cookie.substring(deb,fin))
       }
    return ""
}
    
function vote(id_question){
  form = "#form_" + id_question;
  div_reponses = "#reponses_" + id_question;
  div_resultats = "#resultats_" + id_question;
  div_nb_votant = "#nb_votant_" + id_question;
  
  id_reponse = jQuery(".radio_"+ id_question +":checked").val();
  div_nb_votant_reponse = "#nb_votant_rep_" + id_reponse;

  a_masquer = "#masquer_" + id_question;
  
  jQuery.get("/sondages/reponse.php", jQuery(form).serialize() );
  jQuery(div_reponses).fadeOut(
    'slow',
    function(){
                jQuery(a_masquer).hide();
                jQuery(div_resultats).fadeIn('slow');
              }
  );
    
  cre_cook0("question_id_"+id_question,"1");  
  
  votants = parseInt(jQuery(div_nb_votant).html()) + 1
  
  if(votants < 2)
    votants = votants + " votant"; 
  else
    votants = votants + " votants";
  
  jQuery(div_nb_votant).html(votants);

  
  votants_reponse = parseInt(jQuery(div_nb_votant_reponse).html()) + 1
  
  if(votants_reponse < 2)
    votants_reponse = votants_reponse + " votant"; 
  else
    votants_reponse = votants_reponse + " votants";
  
  jQuery(div_nb_votant_reponse).html(votants_reponse);
  
  
  
  
}

function vote_bin(id){

  vote(id);
  var node_oui = jQuery('.reponse_' + id + ' .pourcent_oui');
  var node_non = jQuery('.reponse_' + id + ' .pourcent_non');
  var node_total = jQuery('#form_' + id + ' .total_votes');
  var total = parseInt(node_total.text());

  var id_reponse = jQuery(".radio_"+ id +":checked").val();
  var vote_oui = jQuery('input#oui_' + id).attr('value') == id_reponse;
  var vote_non = jQuery('input#non_' + id).attr('value') == id_reponse;
  

  node_oui.text((node_oui.text()*total/(total+1) + vote_oui*100/(total + 1)).toFixed(1));
  node_non.text((node_non.text()*total/(total+1) + vote_non*100/(total + 1)).toFixed(1));
  node_total.text(node_total.text() +1);

  
  jQuery('.reponse_' + id).siblings().hide();
  jQuery('.reponse_' + id).show();
  jQuery('#form_' + id + ' .partage').show();
  jQuery('.tous_' + id).show();
}

var voir_reponse = 0

function voir(id_question){

  if (voir_reponse == 0){
  div_reponses = "#reponses_" + id_question;
  div_resultats = "#resultats_" + id_question;

  jQuery(div_reponses).fadeOut(
    'slow',
    function(){
                jQuery(div_resultats).fadeIn('slow');
              }
  );  
  

  
  voir_reponse = 1
  }else{
  div_reponses = "#reponses_" + id_question;
  div_resultats = "#resultats_" + id_question;
  a_voir = "#voir_" + id_question;

  jQuery(div_resultats).fadeOut(
    'slow',
    function(){ 
                jQuery(div_reponses).fadeIn('slow');
              }
  ); 
  
  

  
  voir_reponse = 0
  }
  
}

function verifVote(id_question){
//   if( lit_cook("question_id_"+id_question) == "1"){
//     div_reponses = "#reponses_" + id_question;
//     div_resultats = "#resultats_" + id_question;  
//     jQuery(div_reponses).hide(); 
//     jQuery(div_resultats).show();
//   }
}      
