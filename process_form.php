<?php
require 'vendor/autoload.php';

use PHPExcel;
use PHPExcel_IOFactory;

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $apellido = $_POST['apellido'];
    $telefono = $_POST['Telefono'];
    $email = $_POST['email'];
    $especialidad = $_POST['especialidad'];
    $estado = $_POST['estado'];

    $file = 'datos.xlsx';

    if (file_exists($file)) {
        $spreadsheet = PHPExcel_IOFactory::load($file);
    } else {
        $spreadsheet = new PHPExcel();
        $spreadsheet->setActiveSheetIndex(0)
                    ->setCellValue('A1', 'Nombre')
                    ->setCellValue('B1', 'Apellido')
                    ->setCellValue('C1', 'Teléfono')
                    ->setCellValue('D1', 'Email')
                    ->setCellValue('E1', 'Especialidad')
                    ->setCellValue('F1', 'Estado');
    }

    $sheet = $spreadsheet->getActiveSheet();
    $row = $sheet->getHighestRow() + 1;

    $sheet->setCellValue('A' . $row, $name)
          ->setCellValue('B' . $row, $apellido)
          ->setCellValue('C' . $row, $telefono)
          ->setCellValue('D' . $row, $email)
          ->setCellValue('E' . $row, $especialidad)
          ->setCellValue('F' . $row, $estado);

    $writer = PHPExcel_IOFactory::createWriter($spreadsheet, 'Excel2007');
    $writer->save($file);

    echo "Datos guardados exitosamente.";
}
?>
