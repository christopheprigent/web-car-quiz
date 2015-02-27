<?php
require_once(dirname(__FILE__).'/../../config/config.php');
require_once(dirname(__FILE__).'/../../classes/CQ_car.class.php');
header('Content-Type: application/json');

$objCar = CQ_Car::getInstance();
echo $objCar->wipeAll();
