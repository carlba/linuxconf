#!/usr/bin/env python2.7

# coding=utf-8

import click
from click.testing import CliRunner
from scandir import walk
from sh import rsync, wget
from pathlib2 import Path
import dropbox


# http://click.pocoo.org/5/commands/
# https://pathlib.readthedocs.io/en/pep428/
# Coloring output http://click.pocoo.org/5/utils/

root_sync_path = "/home/cada/Dropbox/transfer"
excludes = {'/media/Windows/Users/genzo/Dropbox/transfer', '.cache', 'VirtualBox VMs',
            'Downloads', '.vagrant.d', '.dropbox', 'venv', 'Videos'}

@click.group()
def cli():
    pass


def _sync(sync_mappings):
    for from_path, to_path in sync_mappings:
        to_path.mkdir(parents=True, exist_ok=True)

        exclude_params = zip(len(excludes) * ['--exclude'], excludes)

        rsync('-ad', from_path.as_posix() + '/', to_path.as_posix() + '/',
              delete=True, *exclude_params)


def _print_sync_mappings(sync_mappings):
    for from_path, to_path in sync_mappings:
        click.echo('{} -> {}'.format(from_path, to_path))


def _get_sync_paths(path, excludes):
    for root, dirs, files in walk(path):
        if '.sync' in files and not any(x in root for x in excludes):
            yield Path(root)


@cli.command()
def store():
    """
    Stores all directories in the filesystem that contains a .sync file to the configured
    ``root_sync_path``

    """
    wget('-O', 'dropbox.py', 'https://www.dropbox.com/download?dl=packages/dropbox.py')
    dropbox.start_dropbox()
    sync_paths = _get_sync_paths('/home/cada', excludes | {root_sync_path})
    sync_mappings = [(path, Path(root_sync_path) / path.relative_to('/'))
                     for path in sync_paths]
    _print_sync_mappings(sync_mappings)
    _sync(sync_mappings)
    dropbox.start_dropbox()




@cli.command()
def load():
    """
    Loads all directories in the ``root_sync_path`` that contains a .sync file to their
    matching path in the filesystem
    """

    sync_paths = _get_sync_paths(root_sync_path,excludes)
    sync_mappings = [(path, Path('/') / path.relative_to(root_sync_path))
                     for path in sync_paths]
    _print_sync_mappings(sync_mappings)
    _sync(sync_mappings)


if __name__ == '__main__':
    cli()
    runner = CliRunner()
