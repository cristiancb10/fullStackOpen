# Exercise 0.6: New note in single-page application diagram

```mermaid
sequenceDiagram
    box lightcyan
    participant browser
    participant server
    end

    note right of browser: User writes a new note {content: "exercise 0.6", date: "2025-07-15T00:45:24.242Z"}

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: Status 201 created, Note stored successfully
    deactivate server

    note right of browser: The browser executes the JavaScript code, adding the new note and rendering the list again without reloading the page. 
```