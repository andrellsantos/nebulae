# File: Makefile
# Author: Breno Leonhardt Pacheco
# Email: brenoleonhardt@gmail.com
# Last Modified: February 24, 2021

# Check for executables in path
EXECUTABLES = python3 virtualenv test

K := $(foreach exec,$(EXECUTABLES),\
	$(if $(shell which $(exec)),,$(error "No $(exec) in PATH")))

# Setup flags for portability
MAKEFGLAGS     += --no-builtin-rules
MAKEFGLAGS     += --print-directory
.SHELL         := /bin/sh
.SHELLFLAGS    := -eu -o pipefail -o posix -c
.DEFAULT_GOAL  := help
.ONESHELL:
.PHONY:        all help clean install python summary reports

export PATH := $(PATH):$(PWD)/b3scan

PORT ?= 3002
URL  := http://localhost:$(PORT)/api/assets/br/stocks

help: ## Prints help for targets with comments
	@echo "make summary"
	@echo "	get company details and post post to localhost:{PORT:3002}"
	@echo "make reports"
	@echo "	get company report data and post to localhost:{PORT:3002}"
	@echo "make python"
	@echo "	run python shell from venv"
	@echo "make activate"
	@echo "	run new shell w/ venv activated"
	@echo "make install"
	@echo "	setup venv & install requirements"

summary: install
	@echo "Sending company summary"
	source ./venv/bin/activate
	b3scan  -d -o $(URL) summary

reports: install
	@echo "Sending company reports"
	source ./venv/bin/activate
	b3scan  -d -o $(URL) report

activate: install
	@echo Launch new shell with python activated
	source ./venv/bin/activate
	$(SHELL)

python: venv
	@echo Launching python shell
	source ./venv/bin/activate
	python

install: venv requirements.txt
	@echo Checking requirements
	source ./venv/bin/activate
	pip -q install -r requirements.txt

venv:
	@echo Setting up virtual env
	virtualenv venv
	source ./venv/bin/activate
	python -m pip install --upgrade pip

clean:
	rm -rf venv

requirements.txt:
	$(error missing requirements.txt file)
