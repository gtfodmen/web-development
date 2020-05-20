<?php
function getParameter($name)
{
    return $_POST[$name] ?? null;
}

function getRequestMethod()
{
    return $_SERVER['REQUEST_METHOD'];
}