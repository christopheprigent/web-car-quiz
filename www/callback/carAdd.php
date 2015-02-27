<?php
require_once(dirname(__FILE__).'/../config/config.php');
require_once(dirname(__FILE__).'/../classes/CQ_car.class.php');

if (empty($_REQUEST['brand']))
	$brand = myrand(array("RENAULT", "MCLAREN", "MERCEDES", "CITROEN"));
else
	$brand = $_REQUEST['brand'];

if (empty($_REQUEST['name']))
	$name = myrand(array("Clio", "kangoo", "AMG GT", "Berlingo", "DS3"));
else
	$name = $_REQUEST['name'];

if (empty($_REQUEST['model']))
	$model = myrand(array("C1", "C6", "eco", "Luxe"));
else
	$model = $_REQUEST['model'];

if (empty($_REQUEST['year']))
	$year = myrand(array(1942,1918,1874,2000,2015));
else
	$year = $_REQUEST['year'];

if (empty($_REQUEST['detail']))
	$detail = 'no detail';
else
	$detail = $_REQUEST['detail'];


$car = array(
	 "brand" 	=> $brand
	,"name"		=> $name
	,"model" 	=> $model
	,"year"		=> $year 
	,"detail"	=> $detail);
	
$objCar = CQ_Car::getInstance();

echo $objCar->add($car);


function myrand($ar)
{
	$tmp = array_rand($ar, 1);

	return $ar[$tmp];
}