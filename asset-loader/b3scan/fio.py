#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
File: fio.py
Author: Breno Leonhardt Pacheco
Email: brenoleonhardt@gmail.com
Last Modified: February 24, 2021
Description: functions for file io
"""

import sys
import json5 as json
import re
import control

def fopen(path, mode="r"):
    """returns a file handler"""
    try:
        f = open(path, encoding='utf-8', mode=mode)
        if mode == "r":
            f.readline(0)
    except UnicodeDecodeError as err:
        f = open(path, encoding='iso-8859-1', mode='r')
        control.debug(path+"\n\treading utf-8 failed. trying iso-8859-1")
        f.readline(0)
    except Exception as err:
        control.error("unable to load " + path + ":" + str(err))
    return f

def dump(content, file):
    """docstring for dump"""
    try:
        json.dump(content, file, indent = 4, ensure_ascii=False)
        file.close()
    except IOError as err:
        control.error("writting to file " + str(err))


def configure(file):
    """return dict from file. file must be a json array with strings"""
    try:
        conf = json.load(file)
        assert type(conf) == type([])
        for item in conf:
            assert type(item) == type("")
        return conf
    except json.decoder.JSONDecodeError as err:
        control.error("configuration file could not be loaded: " + str(err))
    except AssertionError as err:
        control.error("configuration has invalid content: " + str(err))

