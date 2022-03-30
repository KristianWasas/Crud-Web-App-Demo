# VitecDBTest
Vitec työhaastattelu tehtävä

Joo elikkäs tässä on nyt dynamic database webappi, osa vaadituista kriteereistä/toiminnallisuuksista puuttuu kiireen seurauksena

Perus rakenne on siis React.js frontend, node.js backend, Express, Axios ja cors linkkaamaan frontend ja backend ja server 

Database mySQL 

Pyörittämiseen en osaa tarkkaan sanoa mitä tarvii, luulen että tässä on kaikki tarvittava ladattu mukana paitsi XAMPP (voi varmaankin olla jokin muu työkalu) joka oli
mySQL varten jotta pysty selaimella vilkuileen databasea yms.

Eka XAMPP pystyyn, start Apache ja MySQL, sittennpm start komennolla saa front endin ja backendin pystyyn, täytyy myös erikseen luoda database ennenkun lähtee pyörimään, eli selaimeen vaan "localhost:3001/createdb" joka luo automaattisesti "nodemysql" nimisen database
Sitten vaan "localhost:3000" ja pitäisi pyöriä, jos ei, niin en osaa suoraa sanoa mitä tarvii ladata/korjata, itellä toimii fine

Mitä toiminnalisuuksia on:

-dynaaminen database table joka luodaan template.js olevasse schema stringistä (json muotoa)

    -tukee string, integer, boolean, date vaihtoehtoja, HUOM! databasessa ei ole rajoituksia kuten min ja max pituuksia yms
    
-dynaaminen lomake joka riippuu myös schemasta

    -Tässä on nyt rajoitukset mitä lomake hyväksyy, minimum ja maximum
    
    -Myös drop down lista mahdollisuus 
    
    -Tukee string, integer, boolean ja date vaihto ehtoja
    
    -Lisäämisen kohdalla lomake tarkistaa tarvittavat ehdot, jos ei täyty niin lomake ei ikinä kutsu backendiä
    
-dynaaminen database table joka ladataan databasessa olevasta tablesta

    -Luodaan dynaamisesti jostain databasen tablesta
    
    -Voi poistaa
    
    -Voi editoida
    
        -Editoinnissa on placeHolder editFormData muuttuja joka on aluksi sama kuin alkuperäisen elementin data
        
        -Inputfieldi kutsuu onChange tapauksessa handleFormChange, jolloin sen inputfieldin arvo muutetaan editFormDatassa
        
        -Eli data joka ollaan saveemassa muuttuu vain inputfieldien onChange aikana, ja se päivitty inputField.value:ksi
        
        -Eli elementData=editFormData => editFormData[inputfield] = inputfield.value tapahtuu onChange triggeristä
        
        -Input fieldeissä EI ole mitään min tai max rajoteitta, vain tyyppi rajoitteet, eli string, integer, date ja bool
    

Mitä toiminnalisuuksia EI ole:

-Ei ole mahdollisuutta useampaa eri json templatee tarkastella samaa aikaa/poistaa tai lisätä muutenkuin manuaalisesti

    -Toteutus toimii kyllä eri templateillä, kunhan muoto on sama, mutta ne täytyy manuaalisesti vaihtaa
    
-Ei ole mahdoillista spesifioida sql tablen visuaalista representaatiota, eli esim firstname+lastname=fullname

-Ei toimi ellei ole database valmiina olemassa

Mitä itse koodattu:

-/client/src/*

    -Itse
    
-/server/index.js

    -Itse
    
-Loput on ladattui dependancei ja frameworkkei
