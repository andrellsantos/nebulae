# File: Makefile
# Author: Breno Leonhardt Pacheco
# Email: brenoleonhardt@gmail.com
# Last Modified: February 24, 2021

# Check for executables in path
EXECUTABLES = python3 virtualenv wget unzip test

K := $(foreach exec,$(EXECUTABLES),\
	$(if $(shell which $(exec)),,$(error "No $(exec) in PATH")))

# Setup flags for portability
MAKEFGLAGS     += --no-builtin-rules
MAKEFGLAGS     += --print-directory
.SHELL         := /bin/sh
.SHELLFLAGS    := -eu -o pipefail -o posix -c
.DEFAULT_GOAL  := help
.ONESHELL:
.PHONY:        all help clean install python

CSV_DIR   := csv
ZIP_DIR   := zip
OUT       := data.json

export PATH := $(PATH):$(PWD)/b3scan

help: ## Prints help for targets with comments
	@echo "make scan"
	@echo "	scans files in csv/ and generates output data.json"
	@echo "make fetch"
	@echo "	pulls and extracts csv report data files"
	@echo "make python"
	@echo "	run python shell from venv"
	@echo "make activate"
	@echo "	run new shell w/ venv activated"
	@echo "make install"
	@echo "	setup venv & install requirements"

scan: install configs.json
	@echo Running scanner script
	source ./venv/bin/activate
	b3scan -o $(OUT) -c configs.json $(CSV_DIR)/*
	@echo File output to data.json

fetch: resources.sh
	@echo Pullings csv resources
	test -x ./resources.sh || chmod +x ./resources.sh
	./resources.sh

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
