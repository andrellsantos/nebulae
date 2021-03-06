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
# import json5 as json
import json
import re
import control
import requests

def fopen(path, mode="r"):
    """returns a file handler"""
    try:
        f = open(path, encoding='utf-8', mode=mode)
        if mode == "r":
            f.readline(0)
    except UnicodeDecodeError as err:
        f = open(path, encoding='iso-8859-1', mode='r')
        # control.warn(path+"\n\treading utf-8 failed. trying iso-8859-1")
        f.readline(0)
    except Exception as err:
        control.error("unable to load " + path + ":" + str(err))
    return f

def fjson(path):
    """load json into dictionary"""
    try:
        f = open(path, 'r')
        data = json.load(f)
        f.close()
        return data
    except Exception as err:
        control.error("Unable to load json - " + str(err))

def dump(content, file):
    """output json to file"""
    try:
        json.dump(content, file, indent = 4, ensure_ascii=False)
    except IOError as err:
        control.error("writting to file " + str(err))

def post(data, url, append=""):
    """post company summary to url"""
    post_url = _trim(url) + '/' + append
    res = requests.post(post_url, json=data)
    if res.status_code != 201:
        control.debug('HTTP post FAILED. '+ post_url + " " + str(res.status_code))
    else:
        control.debug("HTTP post SUCCESS: " + post_url)

def _trim(string):
    """docstring for _trim"""
    if string[-1] == '/':
        return string[:-1]
    return string

