# Crud App

Kyseessä on dynaaminen CRUD applikaatio, joka ottaa rakenteen JSON objektista, eli mitään tietorakenteista/input formeista ei ole kova koodattu

Perus rakenne on React.js frontend, node.js backend, Express, Axios ja cors linkkaamaan frontend ja backend ja server 

Database mySQL 

Tarvittavat packaget voi ladata joko suoraan tästä gitistä, tai itse koneelle. Itse käytin XAMPP:ia linkkaamaan mySQL ja node.js:n, mutta voi käyttää mitä haluaa  

Eka XAMPP pystyyn, start Apache ja MySQL, sittennpm start komennolla saa front endin ja backendin pystyyn, täytyy myös erikseen luoda database ennenkun lähtee pyörimään, eli selaimeen vaan "localhost:3001/createdb" joka luo automaattisesti "nodemysql" nimisen database
Sitten vaan "localhost:3000" ja pitäisi pyöriä, jos ei, niin en osaa suoraa sanoa mitä tarvii ladata/korjata, itellä toimii fine

Mitä toiminnalisuuksia on:

    -dynaaminen database table joka luodaan template.js olevasse schema stringistä kutsumalla JSON.parse(schema), joka luo itse json objektin

        -tukee string, integer, boolean, date vaihtoehtoja, HUOM! databasessa ei ole rajoituksia kuten min ja max pituuksia yms. vain tyypit
    
    -dynaaminen lomake joka riippuu myös schemasta

        -Tässä on nyt rajoitukset mitä lomake hyväksyy, minimum ja maximum yms.
    
        -Myös drop down lista mahdollisuus 
    
        -Tukee string, integer, boolean ja date vaihto ehtoja
    
        -Lisäämisen kohdalla lomake tarkistaa tarvittavat ehdot, jos ei täyty niin lomake ei ikinä kutsu backendiä
    
    -dynaaminen database table representaatio joka ladataan databasessa olevasta tablesta

        -Luodaan dynaamisesti jostain databasen tablesta
    
    -Voi poistaa
    
    -Voi editoida
    
        -Editoinnissa on placeHolder editFormData muuttuja joka on aluksi sama kuin alkuperäisen elementin data
        
        -Inputfieldi kutsuu onChange tapauksessa handleFormChange, jolloin sen inputfieldin arvo muutetaan editFormDatassa
        
        -Eli elementData=editFormData => editFormData[inputfield] = inputfield.value tapahtuu onChange triggeristä
        
        -Input fieldeissä EI ole mitään min tai max rajoteitta, vain tyyppi rajoitteet, eli string, integer, date ja bool
    

Mitä itse koodattu:

    -/client/src/*

    
    -/server/index.js

    
Loput on ladattui dependancei ja frameworkkei yms.
