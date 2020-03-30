# Der "wir-bleiben-liqui.de" Förderfinder - #liquidebleiben

Das Projekt [wir-bleiben-liqui.de](https://wir-bleiben-liqui.de) schließt diese Lücke und gibt professionelle Hilfe – einfach, schnell und auf das konkrete Unternehmen bezogen.
Zusammen mit einem kurzen Fragebogen aus acht Fragen, der von unserem Partner taxy.io, entwickelt wurde, werden relevante Hilfen und Maßnahmen identifiziert.
wir-bleiben-liqui.de bietet eine einfach zu handhabende Schritt-für-Schritt Anleitung zur Antragsstellung von Coronoa Hilfsmitteln an.
Parallel werden die jeweils nötigen Unterlagen angezeigt und welche Fördergelder entsprechend der individuellen Unternehmenssituation abgerufen werden können.
Dadurch werden auch Beratungsstellen wie Wirtschaftsförderungen und IHKs entlastet.

Diese App kann unter [finder.wir-bleiben-liqui.de](https://finder.wir-bleiben-liqui.de) genutzt werden.

## Get in development

Install the dependencies...

```bash
npm install
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Navigate to [localhost:8080](http://localhost:8080). You should see the app running.
This startup does not include starting the backend and therefore will not allow you to load any data.
Edit a component file in `src`, save it, and reload the page to see your changes.

To start the application with the backend expressjs-Server, run:

```bash
npm run dev:server
```

Navigate to [localhost:8080](http://localhost:8080). You should see the app running.
Now the frontend will **not** reload on changes, but the backend is used for providing data.
The backend reloads on changes to the `server.js`-file.

To be able to include data, you will have to configure a Codebeamer connection.
You will need to provide following environment variable to accomplish this:

| Variable Name | Description |
|-|-|
| CB_BASIC_AUTH | Your base64 encoded credentials |

Run the start command as follows to include those:

```bash
CB_BASIC_AUTH=YOUR_AUTH_HERE npm run dev:server
```

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```

You can run the newly built app with `npm run start`.
This startup does not include starting the backend and therefore will not allow you to load any data.

To start the application with the backend expressjs-Server, run:

```bash
npm run start:server
```

This command automatically includes the `npm run build` command to ensure your app is up-to-date.
Navigate to [localhost:8080](http://localhost:8080). You should see the app running.

To be able to include data, you will have to configure a Google Sheets connection.
You will need to provide following environment variable to accomplish this:

| Variable Name | Description |
|-|-|
| CB_BASIC_AUTH | Your base64 encoded credentials |

Run the start command as follows to include those:

```bash
CB_BASIC_AUTH=YOUR_AUTH_HERE npm run start:server
```
