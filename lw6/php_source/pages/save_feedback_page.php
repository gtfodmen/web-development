<?php
include '../common.inc.php';

function checkParameter(array $fields, array &$errors): bool
{
    if ( empty($fields['name'] ) )
    {
        $errors['name_error_msg'] = 'Укажите имя';
    }
    if ( empty($fields['email']) )
    {
        $errors['email_error_msg'] = 'Укажите email';
    }
    if ( empty($fields['sms']) )
    {
        $errors['sms_error_msg'] = 'Напишите мне что-нибудь';
    }
    return ( !empty($fields['name']) && !empty($fields['email']) && !empty($fields['sms']) );
}

function getForm()
{
    $fields = [
        'name' => getParameter('name'),
        'email' => getParameter('email'),
        'country' => getParameter('country'),
        'sms' => getParameter('sms'),
        'sex' => getParameter('sex')
    ];
    $fieldsInfo = [];
    if ($fields['sex'] === 'male') {
        $fields['sex'] = 'Мужской';
    } elseif ($fields['sex'] === 'female') {
        $fields['sex'] = 'Женский';
    } else {
        $fields['sex'] = null;
    }

    if ( !checkParameter($fields, $fieldsInfo) ) {
        renderTemplate('main.tpl.php', array_merge($fields, $fieldsInfo) );
    } else {
        $data = json_encode([
            'Имя' => $fields['name'],
            'Почта' => $fields['email'],
            'Страна' => $fields['country'],
            'Пол' => isset($fields['sex']) ? $fields['sex'] : 'Незисвестно',
            'Сообщение' => $fields['sms']
        ], JSON_UNESCAPED_UNICODE);
        $form = [
            "data" => $data,
            "email" => $fields['email'],
        ];
        return $form;
    }
}

function saveData()
{
    $form = getForm();
    if (!empty($form))
    {
        $data = $form['data'];
        $email = $form['email'];
        $file = '../data/' . mb_strtolower($email) . '.txt';
        file_put_contents($file, $data);
        renderTemplate('main.tpl.php', [
            'all_right' => 'Сообщение успешно отправлено'
        ]);
    }
}