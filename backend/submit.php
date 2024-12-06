<?php
header("Content-Type: application/json");

include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$id = $data['id'];
$dob = $data['dob'];
$address = $data['address'];
$occupation = $data['occupation'];

if (empty($name) || empty($id) || empty($dob) || empty($occupation)) {
    echo json_encode(["success" => false, "message" => "Semua bidang wajib diisi!"]);
    exit;
}

$age = date_diff(date_create($dob), date_create('today'))->y;

$stmt = $conn->prepare("INSERT INTO employees (name, id_number, dob, address, occupation, age) VALUES (?, ?, ?, ?, ?, ?)");
$stmt->bind_param("sssssi", $name, $id, $dob, $address, $occupation, $age);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "message" => "Gagal menyimpan data."]);
}

$stmt->close();
$conn->close();
?>
