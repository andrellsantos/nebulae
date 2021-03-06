#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
File: cache.py
Author: Breno Leonhardt Pacheco
Email: brenoleonhardt@gmail.com
Last Modified: February 24, 2021
Description:
"""

import json5 as json
import re
import zipfile
import os
import io
import shutil
import urllib.request as request
from contextlib import closing
from appdirs import user_cache_dir
import fio
import control
import ssl #  TODO: fix this
ctx = ssl._create_unverified_context()

CACHE_DIR = user_cache_dir("b3scan")

def load(url, name=False):
    fname = name if name else url.rsplit('/', 1)[-1]
    """pulls and caches a file given url. returns file handler"""
    path = CACHE_DIR + '/' + fname
    control.debug('Caching ' + path)
    if not os.path.exists(CACHE_DIR):
        os.mkdir(CACHE_DIR, 0o755)
    if not os.path.exists(path):
        try:
            with closing(request.urlopen(url, context=ctx)) as response:
                bytes = _progress(response)
                with open(path, 'wb') as f: ## Excel File
                    f.write(bytes.getbuffer())
        except Exception as err: # pylint: disable=broad-except
            control.error("Unable cache file " + fname + ': ' + str(err))
    try:
        return get(fname)
    except Exception as err:
        control.warn('file ' + fname + ' - ' + str(err))
        control.warn('cleaning file and trying to cache...')
        sys.exit(1)
        os.remove(path)
        return load(url)

def get(fname):
    """returns a handler for a cached file"""
    fpath = user_cache_dir("b3scan") + '/' + fname
    if not os.path.exists(fpath):
        return False
    if fpath.endswith('.csv') or fpath.endswith('.txt'):
        return fio.fopen(fpath, 'r')
    elif fpath.endswith('.json'):
        return fio.fjson(fpath)
    elif fpath.endswith('.zip'):
        try:
            return zipfile.ZipFile(fpath, 'r')
        except Exception as err:
            raise err

def extract(zip, patterns):
    files = []
    for name in zip.namelist():
        for pat in patterns:
            if re.match(pat, name):
                fpath = CACHE_DIR+'/'+name
                if not os.path.exists(fpath):
                    control.debug('Extracting ' + name)
                    try:
                        zip.extract(name, CACHE_DIR)
                    except Exception as err:
                        control.error("extract error - " + str(err))
                files.append(fio.fopen(fpath))
                break
    return files

def store(data, name):
    """store data with in cache file with name"""
    path = CACHE_DIR + '/' + name
    with open(path, 'w') as f:
        for item in data:
            f.write("%s\n" % item)

def _progress(resp):
    """print download progress"""
    length = resp.getheader('content-length')
    blocksize = 1000000000
    if length:
        length = int(length)
        blocksize = max(4096, length//100)
    buf = io.BytesIO()
    size = 0
    while True:
        buf1 = resp.read(blocksize)
        if not buf1:
            break
        buf.write(buf1)
        size += len(buf1)
        if length:
            control.debug('{:.0f}%'.format(100*size/length)+'\r', end='')
    return buf

#  TODO: error handling. empty file
