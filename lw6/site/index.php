<?php
include '../php_source/common.inc.php';
if (getRequestMethod() === 'POST')
{
    saveData();
}
else
{
    mainPage();
}
