## Banks API
The application aims to download data from 3 banks, display them and convert them to the scheme of the main transaction

### Starting The App Locally
In order to use the app locally on your machine the following has to be done:

1. Install all npm dependencies - Run `npm i`
3. Start the Server - `npm run start`


### General commands
All commands are run from the `server` folder also install all packages with `npm i` before starting

`npm run start` - starts the server
`npm run lint` - checks the appearance of the code
`npm run test` - run all tests inside `server` structure

The server started under `localhost:5000`

## URL

- `http://localhost:5000/transactions/bank?source=[BANK NAME]` - retrieves data from a given bank and shows transactions according to the scheme (BANK NAME = revolut || monzo || sterling)
- `http://localhost:5000/transactions` - retrieves data from all banks and displays them in the transactions schema
- `http://localhost:5000/api/[BANK NAME]` - displays data from specific banks (BANK NAME = revolut || monzo || sterling)
