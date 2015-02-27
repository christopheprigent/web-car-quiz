<?php
require_once(dirname(__FILE__).'/../config/config.php');
abstract class CQ_Mongo{
	private $_cnx; 
	private $_db;
	private $max_id = 0;
   
    protected function __construct() {  
		try{
			$this->_cnx = new Mongo(MONGO_CNX);
			$this->_db 	= $this->_cnx->cpr;
		} catch(Exception $e) {
			echo 'Exception reçue : ',  $e->getMessage(), "\n";
		}
   }
 
   protected function carGet($id=false)
   {
		if ($id)
			return $this->_db->cars->findOne(array('_id'=>$id));
		else
			return $this->_db->cars->find();
   }
  
   protected function carIdxGetNext() {
	$idx = $this->_db->cars_inc_idx->findOne();  
	if($idx && $idx['current_idx'])
	{
		return ($idx['current_idx'] + 1);
	}
	return 1;
	}
	
	protected function carInsert($AR_car)
	{
		print_r($AR_car);
		$this->_db->cars->insert($AR_car);
	}
	protected function wipeAll()
	{
		$this->_db->cars->remove();
		$this->_db->cars_inc_idx->remove();
	}
	protected function carIdxUpdate()
	{	
		return $this->_db->cars_inc_idx->update(array(),array('$inc' => array("current_idx" => 1)), array("upsert" => true));
	}
	
}