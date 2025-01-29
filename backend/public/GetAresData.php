<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

set_include_path(__DIR__ . "/..");
require 'vendor/autoload.php';

use GuzzleHttp\Client;

class GetAresData {
    private $client;

    public function __construct() {
        $this->client = new Client();
    }

    public function getData($inputData) {
        $postData = $this->preparePostData($inputData);
        $response = $this->sendPostRequest($postData);
        if ($response) {
            return $this->processResponse($response);
        }
        return ['error' => 'No data found from ARES'];
    }

    private function preparePostData($inputData) {
        $start = isset($inputData['start']) ? $inputData['start'] : 0;
        if (isset($inputData['ico']) && !empty($inputData['ico'])) {
            return ['ico' => $inputData['ico'], 'pocet' => 10, 'start' => $start, 'razeni' => []];
        }
        if (isset($inputData['obchodniJmeno']) && !empty($inputData['obchodniJmeno'])) {
            return ['obchodniJmeno' => $inputData['obchodniJmeno'], 'pocet' => 10, 'start' => $start, 'razeni' => []];
        }
        return null;
    }

    private function sendPostRequest($postData) {
        try {
            $response = $this->client->post('https://ares.gov.cz/ekonomicke-subjekty-v-be/rest/ekonomicke-subjekty/vyhledat', ['json' => $postData]);
            return json_decode($response->getBody()->getContents(), true);
        } catch (Exception $e) {
            echo "Ошибка при запросе к API: " . $e->getMessage();
            return null;
        }
    }

    private function processResponse($response) {
        if (isset($response['ekonomickeSubjekty']) && !empty($response['ekonomickeSubjekty'])) {
            return [
                'ico' => $response['ico'] ?? [],
                'pocet' => 10,
                'start' => 0,
                'razeni' => [],
                'pocetCelkem' => $response['pocetCelkem'] ?? 0,
                'ekonomickeSubjekty' => $response['ekonomickeSubjekty']
            ];
        }
        return ['error' => 'No economic entities found'];
    }
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $inputData = json_decode(file_get_contents('php://input'), true);
    $ares = new GetAresData();
    $data = $ares->getData($inputData);
    header('Content-Type: application/json');
    echo json_encode($data);
}
?>
