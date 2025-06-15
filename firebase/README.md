# Firebase

A simple web application using Firebase Auth, Storage and Firestore with a functions backend
to interact with backend services not available in the browser, for example Vertex AI.

## Emulator

The Firebase emulator can be used to run the application locally. The emulator will run the
frontend, backend and database locally. The emulator can be started with the following command:

```shell
firebase emulators:start --import=./data/export --export-on-exit --project some-project-id
```

Prior to this you will need to create a `data` directory at the root of the project for the data export
to work correctly. The `--import` flag will import the data from the `data/export` directory,
and the `--export-on-exit` flag will export the data to the `data/export` directory when the emulator is stopped.