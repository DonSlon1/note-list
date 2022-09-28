<?php
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


if($method==="POST"){

    $i=file_get_contents('php://input');

    $json=json_decode($i,true);
    $name=
        $json["name"];
    echo $name;
    $data=json_encode($json["data"]);




    $sql1="UPDATE users_node SET data='$data' WHERE username='$name'";

    if(mysqli_query($conn,$sql1)){
        echo "successful uploaded";
    }
    else{
        echo "nefacha to";
    }
}
if ($method==="GET"){

    $i=file_get_contents('php://input');
    $json=json_decode($i,true);
    $name=$_GET['name'];


    $sql1="SELECT data FROM users_node WHERE username='$name'";
    $myArray = array();
    if($resoult=mysqli_query($conn,$sql1)){
        while($row = $resoult->fetch_assoc()) {
            $myArray[] = $row;
        }
        print_r(json_encode($myArray));

    }
    else{
        echo "nefacha to";
    }
}
