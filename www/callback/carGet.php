<?php
require_once(dirname(__FILE__).'/../../config/config.php');
require_once(dirname(__FILE__).'/../../classes/CQ_car.class.php');

header('Content-Type: application/json');

try {
	$objCar = CQ_Car::getInstance();
	$json 	= true;
	echo $objCar->get($json);

} catch (Exception $e) {
    echo 'Exception reçue : ',  $e->getMessage(), "\n";
}
