<?php
require_once(dirname(__FILE__).'/../config/config.php');
require_once(dirname(__FILE__).'/CQ_mongo.abstract.class.php');

class CQ_Car extends CQ_Mongo {
	private static   $_instance = null;
	
	public static function getInstance() {
     if(is_null(self::$_instance)) {
       self::$_instance = new CQ_Car();  
     }
     return self::$_instance;
    }
    protected function __construct() { 
	 parent::__construct();
	}
	
	public function get($json=false, $id=false) {
		$ret = array();
		if ($id)
		{
			$car = $this->carGet($id);
			$car['brand_low'] = strtolower($car['brand']);
			$ret[] = $this->carGet($id);
		}else
		{
			foreach ($this->carGet() as $car) {
				
				$car['brand_low'] = strtolower($car['brand']);
				$ret[] = $car;
			}
		}
		if ($json)
			$ret = json_encode($ret);
		
		return $ret;
	}
	
   public function wipeAll()
   {
	   parent::wipeAll();
   }
   public function add($AR_car)
   {
	   if (empty($AR_car['_id']))
	   {
		   $AR_car['_id'] = $this->carIdxGetNext();
	   }
	   
	   $this->carInsert($AR_car);
	   
	   $this->carIdxUpdate($AR_car['_id']);
	}
}