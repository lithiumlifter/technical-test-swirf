<?php

include 'db.php';

$sql = "SELECT * FROM employees";
$result = $conn->query($sql);

$employees = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $employees[] = $row;
    }
}

$conn->close();

echo json_encode($employees);
?>
