<?php

function listFolderFiles($dir)
{
    
    foreach (new DirectoryIterator($dir) as $file) {
        if (!$file->isDot()) {
        
            echo $file->getPathname();
            echo "\r\n";

            if ($file->isDir()) {
                listFolderFiles($file->getPathname());
            }         
        
        }
    }
    
}


listFolderFiles('.');

?>