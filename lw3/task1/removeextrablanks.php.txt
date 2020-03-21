<?php
	function getGETParameter(string $name): ?string
	{
		return isset($_GET[$name]) ?(string) $_GET[$name] : null;
	};
	$text = getGETParameter('text');
	if ($text !== null) 
	{
		header("Content-Type: text/plain");
		$text = preg_replace('/ +/', ' ' , $text);
		$text = trim($text, ' ');	
		echo $text;
	};