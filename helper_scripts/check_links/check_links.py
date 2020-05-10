from __future__ import annotations
from pathlib import Path
from re import compile
from argparse import ArgumentParser
from http import HTTPStatus

import requests 
from urllib3.exceptions import InsecureRequestWarning

class Response:
    url: str = ""
    code: int = 0

    def __init__(self, url: str, code: int) -> Response:
        self.url = url
        self.code = code

def main():

    parser = ArgumentParser(description='Check status codes of all links found in a given file.')
    parser.add_argument('file_path', type=Path, metavar='file', help='Path to the file to be checked')

    args =parser.parse_args()

    # This prevents the script from spamming warnings when disabling SSL verification later.
    requests.packages.urllib3.disable_warnings(category=InsecureRequestWarning)

    try:
        with open(args.file_path, 'r') as data_js_file:
            regex = compile(r'\b(?:https?|http):[\w/#~:.?+=&%@!\-.:?\\-]+?(?=[.:?\-]*(?:[^\w/#~:.?+=&%@!\-.:?\-]|$))')
            urls = regex.findall(data_js_file.read())
    except FileNotFoundError as e:
        print("Error: \`{0}\` does not point to a valid file.".format(args.file_path))
        exit(1)

    # Disabling SSL verification (`verify=False`) because this scripts purpose is to check if
    # the page is still available not if certificates or ssl versions are valid.
    responses = [Response(url, requests.get(url, timeout=10, verify=False).status_code) for url in urls]

    erroneous_responses = filter(lambda response: str(response.code)[0] != '2', responses)

    print("The links found in `{0}` could not be accessed successfully (no success status code (2**) returned):\n".format(args.file_path))
    for  response in erroneous_responses:
        print("    {0}:\n    {1} - {2}\n".format(response.url, response.code, HTTPStatus(response.code).phrase))

if __name__ == "__main__":
    main()
