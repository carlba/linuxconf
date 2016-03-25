import argparse
from sys import stdout

parser = argparse.ArgumentParser(description='Remove duplicates from a file')
parser.add_argument('files', nargs='+', help='One or more files')
parser.add_argument("-o", "--output-file", help="Write output to file")

args = parser.parse_args()

for item in args.files:
    with open(item, "r") as in_file:
        lines = [line if line[0] is not "#" else line for line in in_file]

    new_lines = []

    for line in lines:
        if line not in new_lines:
            new_lines.append(line)

    if args.output_file:
        with open(args.output_file, "wb") as out_file:
            out_file.write("".join(new_lines))
    else:
        stdout.write("".join(new_lines))
