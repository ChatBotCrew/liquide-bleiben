from __future__ import annotations
from pathlib import Path
import sys
import re
import requests
import argparse


class Response:
    url: str = ""
    code: int = 0

    def __init__(self, url: str, code: int) -> Response:
        self.url = url
        self.code = code

def main():

    parser = argparse.ArgumentParser(description='Check status codes of all links found in a given file.')
    parser.add_argument('file_path', type=Path, metavar='file', help='Path to the file to be checked')

    args =parser.parse_args()

    try:
        with open(args.file_path, 'r') as data_js_file:
            regex = re.compile(r'\b(?:https?|http):[\w/#~:.?+=&%@!\-.:?\\-]+?(?=[.:?\-]*(?:[^\w/#~:.?+=&%@!\-.:?\-]|$))')
            urls = regex.findall(data_js_file.read())

            responses = [Response(url, requests.get(url, timeout=10).status_code) for url in urls]

            erroneous_responses = filter(lambda response: str(response.code)[0] != '2', responses)

            print("The following links in `data.js` are not returning success status codes (2**):")
            for  response in erroneous_responses:
                print("    {0}: {1}".format(response.url, response.code))
    except FileNotFoundError as e:
        print("Error: The given path does not point to a valid file.")
        sys.exit(1)

if __name__ == "__main__":
    main()
