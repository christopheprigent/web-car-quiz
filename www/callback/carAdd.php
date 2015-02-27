<?php
require_once(dirname(__FILE__).'/../../config/config.php');
require_once(dirname(__FILE__).'/../../classes/CQ_car.class.php');

$objCar = CQ_Car::getInstance();
$car = createCar($_REQUEST);
echo $objCar->add($car);




function createCar($req)
{
	if (empty($req['brand']))
		$brand = myrand(array("RENAULT", "MCLAREN", "MERCEDES", "CITROEN"));
	else
		$brand = $req['brand'];

	if (empty($req['name']))
		$name = myrand(array("Clio", "kangoo", "AMG GT", "Berlingo", "DS3"));
	else
		$name = $req['name'];

	if (empty($req['model']))
		$model = myrand(array("C1", "C6", "eco", "Luxe"));
	else
		$model = $req['model'];

	if (empty($req['year']))
		$year = myrand(array(1942,1918,1874,2000,2015));
	else
		$year = $req['year'];

	if (empty($req['detail']))
		$detail = 'no detail';
	else
		$detail = $req['detail'];


	$car = array(
		"brand" 	=> $brand
		,"name"		=> $name
		,"model" 	=> $model
		,"year"		=> $year
		,"detail"	=> $detail);

	return $car;
}

function myrand($ar)
{
	$tmp = array_rand($ar, 1);

	return $ar[$tmp];
}
