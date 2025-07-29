# Exercise 0.5: Single-page application diagram

```mermaid
sequenceDiagram
    box lightcyan
    participant browser
    participant server
    end

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: The JavaScript file
    deactivate server

    note right of browser: The browser starts executing JavaScript code and fetches the JSON data

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content": "Basil from Tamil Nadu,INDIA.","date": "2025-07-14T13:34:50.713Z"}, ...]
    deactivate server

    note right of browser: The browser executes the callback function that renders the notes
```