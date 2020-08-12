title Fullstack 0.4

Selain->Palvelin: HTTP POST https://fullstack-exampleapp.herokuapp.com/new_note
Palvelin -> Selain: 302 found
note left of Selain: 
Selain lähettää uuden noten palvelimelle
HTTP Postilla
end note
note right of Palvelin:
Palvelin lähettää 302 found koodin
end note
Selain->Palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/notes
Palvelin -> Selain: HTML-koodi

Selain->Palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.css
Palvelin -> Selain: main.css
note left of Selain: 
Selain Lähettää GET-metodin saadakseen
HTML- ja CSS-koodit
end note
Selain->Palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/main.js
Palvelin -> Selain: main.js
note left of Selain: 
Selain alkaa pyörittää JS koodia ja lähettää
GET pyynnön palvelimelle saadakseen data.JSON:nin
end note
Selain->Palvelin: HTTP GET https://fullstack-exampleapp.herokuapp.com/data.json
Palvelin -> Selain: [{"content":"HTML is easy","date":"2019-05-23T17:30:31.098Z"},...]

note left of Selain: 
Selain näyttää datan näytöllä
end note
