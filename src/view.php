<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="src/resources/main.css">
</head>

<body>
   <main>
    <?php
    $files = scandir(__DIR__ .'/img/thumbnails');

    foreach ($files as $file) {
        # code...
        if(strlen($file)>2){
            echo "<div class='item'><a href='src/img/original/{$file}'><img src='src/img/thumbnails/{$file}' alt=''></a></div>";
        }
    }
    ?>
   </main>
</body>

</html>