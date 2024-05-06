"""
Get structured data via Gemini.
"""

import os
import google.generativeai as genai
import argparse
from PIL import Image


def main(image_path: str, output_json: str):
    """Main function entry point."""
    # Load API key from environment variable
    api_key = os.getenv("GEMINI_KEY")
    genai.configure(api_key=api_key)

    # Set up the model
    generation_config = {
        "temperature": 1,
        "top_p": 0.95,
        "top_k": 0,
        "max_output_tokens": 8192,
    }

    model = genai.GenerativeModel(
        model_name="gemini-1.5-pro-latest",
        generation_config=generation_config
    )

    image = Image.open(image_path)
    instruction = "\nConvert this table to JSON format. Output only the JSON. The JSON consists of a dictionary mapping year to a dictionary with class:number pairs."
    response = model.generate_content([image, instruction])
    actual_json = response.text[7:-3]
    with open(output_json, "w") as f:
        f.write(actual_json)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert an image to JSON using Gemini AI")
    parser.add_argument("image_path", help="Path to the image file")
    parser.add_argument("output_json", help="Path to the output JSON file")
    args = parser.parse_args()
    
    main(args.image_path, args.output_json)
