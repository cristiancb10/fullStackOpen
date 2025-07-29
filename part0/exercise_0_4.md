# Exercise 0.4: New note diagram

```mermaid
sequenceDiagram
    box LightCyan
    participant browser
    participant server
    end

    note right of browser: Send new note: "content: excercise_0_4"
    note left of server: Receive the new note

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server-->>browser: Status 302 Found, redirect to /notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: JavaScript file
    deactivate server

    note right of browser: The browser starts executing the JavaScript code
    
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: JSON data [...,{"content": "exercise 0.4","date": "2025-07-14T23:01:36.731Z"}]
    deactivate server

    note right of browser: The browser executes the callback function that renders the notes and adds the new note "exercise_0_4". 
```
