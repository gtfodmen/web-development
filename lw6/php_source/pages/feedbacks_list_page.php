<?php
include '../common.inc.php';

function displayData(): void
{
    $email = mb_strtolower( getParameter('email') );
    $filePath = "../data/${email}.txt";
    $answer = [];
    if ( file_exists($filePath) )
    {
        $answer = json_decode( file_get_contents($filePath), true);
    }
    else
    {
        $answer['Error'] = 'Отправитель с данным e\'mail не найден';
    }
    feedbackPage(['answers' => $answer]);
}

function feedbackPage(array $args = []): void
{
    renderTemplate('feedback.tpl.php', $args);
}