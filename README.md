# Generating visualizations with Gen AI and D3.js

This repo contains an example of structured data extraction using a multimodal LLM, and its visualization with a simple D3.js code.

## Clone the repo
`git clone git@github.com:recursiveai/sust_hackathon_2024.git`

## Setup

Install all of the dependencies

`npm install`

Setup a python `venv` and install the requirements, load your GEMINI_KEY from the .env file and run

```
pip install -r requirements.txt
source .venv/bin/activate
source .env
```

## Extract data

`python process_data.py data/table.png data/forest.json`

## Visualize data

Start a simple server and see the result in `localhost:5713`

`npm run dev`

## Running tests

`npm run test`

This will start a watch on all of your files and rerun tests that on the affected
codepath.

