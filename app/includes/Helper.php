<?php


class Helper
{
	private function random_color_part() {
		return str_pad( dechex( mt_rand( 0, 255 ) ), 2, '0', STR_PAD_LEFT);
	}
	
	function randomColor() {
		return $this->random_color_part() .  $this->random_color_part() . $this->random_color_part();
	}

	private function getPath() {
        return !empty($_GET['path']) ? $_GET['path'] : 'homepage';
    }

	public function tmpl() {
        $fileName = __DIR__ . "\\..\\" . $this->getPath() . ".php";
        if (file_exists($fileName)) {
            include($fileName);
        } else {
            echo "<h1>404</h1>";
        }
    }

    public function pageClassName() {
         switch($this->getPath()) {
             default:
                 return "page-index";
             break;
             case "list":
                 return "page-list";
             break;
             case "item":
                 return "page-item page-list";
             break;
             case "world":
                 return "page-world";
             break;
             case "company":
                 return "page-company";
             break;
              case "delivery":
                 return "page-delivery";
             break;
             case "bonus":
                 return "page-bonus";
             break;
         };
    }
}