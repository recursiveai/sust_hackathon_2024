# Generating visualizations with Gen AI and D3.js

This repo contains an example of structured data extraction using a multimodal LLM, and its visualization with a simple D3.js code.

## Extract data

Setup a python `venv` and install the requirements, load your GEMINI_KEY from the .env file and run

```
pip install -r requirements.txt
source .venv/bin/activate
source .env
python process_data.py data/table.png data/forest.json
```

## Visualize data

Start a simple server and see the result in `localhost:8000`

```
python -m http.server
```