title Fullstack 0.5


Selain->Palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa
Palvelin -> Selain: HTML-koodi

Selain->Palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
Palvelin -> Selain: main.css
note left of Selain: 
Selain Lähettää GET-metodin saadakseen
HTML- ja CSS-koodit
end note
Selain->Palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/spa.js
Palvelin -> Selain: spa.js
note left of Selain: 
Selain alkaa pyörittää JS koodia ja lähettää
GET pyynnön palvelimelle saadakseen data.JSON:nin
end note
Selain->Palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
Palvelin -> Selain: [{"content":"HTML is easy","date":"2019-05-23T17:30:31.098Z"},...]

note left of Selain: 
Selain näyttää datan näytöllä
end note
