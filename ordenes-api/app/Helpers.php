<?php

    function clean_data($data){
        $fila = [];
		foreach ($data as $key => $value) {
			$fila[$key] = utf8_encode($value);
		}
		return $fila;
    }

    