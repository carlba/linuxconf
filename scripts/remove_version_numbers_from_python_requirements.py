import sys

with open('requirements.txt') as requirements_file:
    for item in requirements_file.readlines():
        if item.startswith("M2Crypto"):
            continue
        else:
            sys.stdout.write(item.split("==")[0]+"\n")

testinf
