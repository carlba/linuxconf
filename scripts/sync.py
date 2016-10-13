#!/usr/bin/env python2.7

# coding=utf-8
import os

import click
from click.testing import CliRunner
# noinspection PyUnresolvedReferences
from sh import locate, rsync, updatedb
from pathlib2 import Path


# http://click.pocoo.org/5/commands/
# https://pathlib.readthedocs.io/en/pep428/
# Coloring output http://click.pocoo.org/5/utils/

root_sync_path = "/home/cada/Dropbox/transfer"
rsync_command = "rsync -adn --delete"

if not os.geteuid() == 0:
    click.echo(click.style('The mlocate database will not be updated since the script is not '
                           'running as root.', blink=True, bold=True))
else:
    updatedb()


@click.group()
def cli():
    pass


def _sync(sync_mappings):
    for from_path, to_path in sync_mappings:
        to_path.mkdir(parents=True, exist_ok=True)
        rsync('-ad', from_path.as_posix() + '/', to_path.as_posix() + '/',
              delete=True, exclude='venv')


def _print_sync_mappings(sync_mappings):
    for from_path, to_path in sync_mappings:
        click.echo('{} -> {}'.format(from_path, to_path))


@cli.command()
def store():
    """
    Stores all directories in the filesystem that contains a .sync file to the configured
    ``root_sync_path``

    """
    sync_paths = [Path(item).parent for item in locate('*.sync').rstrip('\n').split('\n')
                  if not item.startswith(root_sync_path)]

    sync_mappings = [(path, Path(root_sync_path) / path.relative_to('/'))
                     for path in sync_paths]

    _print_sync_mappings(sync_mappings)

    _sync(sync_mappings)


@cli.command()
def load():
    """
    Loads all directories in the ``root_sync_path`` that contains a .sync file to their
    matching path in the filesystem
    """
    sync_paths = [Path(item).parent for item in locate('*.sync').rstrip('\n').split('\n')
                  if item.startswith(root_sync_path)]

    sync_mappings = [(path, Path('/') / path.relative_to(root_sync_path))
                     for path in sync_paths]

    _print_sync_mappings(sync_mappings)

    _sync(sync_mappings)

if __name__ == '__main__':
    cli()
    runner = CliRunner()





