<?php

	include('countries.php');

	$search = $_GET['s'];
	$data = array();
	foreach ($countries as $key => $name)
	{
		if (stristr($name, $search))
		{
			$data[] = array(
				'label' =>  $name,
				'id'	=>	$key,
				'email'	=>	$name.'@country.com',
				'photo'	=>	'img/about-01.jpg',
			);
		}
	}
	
	echo json_encode($data);
