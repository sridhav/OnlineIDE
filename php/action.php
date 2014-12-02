<?php
/**
 * Created by PhpStorm.
 * User: Sridhar
 * Date: 11/27/2014
 * Time: 8:42 PM
 */

class GlobalParams{

    public static function getDocumentRoot(){
        return $_SERVER['DOCUMENT_ROOT'];
    }

    public static function getServerName(){
        return $_SERVER['SERVER_NAME'];
    }

    public static function getServerAddress(){
        return $_SERVER['SERVER_ADDR'];
    }
    public static function getPortNo(){
        return $_SERVER['SERVER_PORT'];
    }

    public static function getProfileSecret(){

    }
    public static function getUploadDirectory(){
        $dir=GlobalParams::getDocumentRoot()."programs/";
        if(!file_exists($dir)){
            mkdir($dir);
        }
        if(!is_dir($dir)){
            unlink($dir);
            mkdir($dir);
        }
        return $dir;
    }

}


class FileParams{

    private $fileName;
    private $fileType;
    private $codeData;
    private $fileMD5;

    public function __construct($name,$type,$data){
        $this->fileName=$name;
        $this->fileType=$type;
        $this->codeData=$data;
        $this->fileMD5=FileParams::getMD5($name.$type);
    }

    protected function setFileName($name){
       $this->fileName=$name;
    }

    protected function setFileType($type){
        $this->fileName=$type;
    }

    protected function setData($data){
        $this->$codeData=$data;
    }

    protected function getData(){
        return $this->codeData;
    }
    protected function getFileType(){
        return $this->fileType;
    }
    protected function getFileName(){
        return $this->fileType;
    }
    protected function getMD5Name(){
        return $this->fileMD5;
    }
    public static function getMD5($name){
       return md5($name);
    }

}

class SaveFile{

    private $fp=null;

    public function __construct($name,$type,$data){
        $fp=new FileParams($name,$type,$data);
        save();
    }

    function save(){

    }

}