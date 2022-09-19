<?php
session_start();
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");


$server = 'localhost';
$dbname = 'user_info';
$user = 'root';
$pass = 'root';


$conn = mysqli_connect($server,$user,$pass,$dbname);

$method = $_SERVER['REQUEST_METHOD'];

$i=file_get_contents('php://input');
$json=json_decode($i,true);


if($method==="POST"){

    $i=file_get_contents('php://input');

    $json=json_decode($i,true);

    $name=$json['user']['name'];
    $password=$json['user']['password'];

    if ($password!=""){


        $sql1 = "INSERT INTO users_node(username, password, data) VALUES ('$name','$password','[]')";
        $sql = "SELECT * FROM users_node WHERE 'username'";
        $sql_u = "SELECT * FROM users_node WHERE username='$name'";
        $res_u = mysqli_query($conn, $sql_u);

        if (mysqli_num_rows($res_u) <= 0) {
            if (mysqli_query($conn, $sql1)) {
                echo "successful uploaded";
            } else {
                echo "nefacha to";
            }
        }
        else{
            echo 'taken';

        }
    }
}
