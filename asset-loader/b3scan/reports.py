#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
File: reports.py
Author: Breno Leonhardt Pacheco
Email: brenoleonhardt@gmail.com
Last Modified: February 24, 2021
Description: loads report data
"""

import requests
from bs4 import BeautifulSoup
import control
import cache
import scanner
import sys
import fio

BASE_URL = "http://dados.cvm.gov.br/dados/CIA_ABERTA/DOC/ITR/DADOS/"


def _get_urls():
    """get urls for zip files"""
    page = requests.get(BASE_URL)
    urls = []
    if page.status_code == 200:
        soup = BeautifulSoup(page.text, 'html.parser')
        links = soup.find_all('a')
        for tag in links:
            link = tag.get('href', None)
            if link is not None and link.endswith('.zip'):
                urls.append(BASE_URL + link)
        return urls
    control.error('Unable to fetch files. ' + str(page.status_code))


FIELDS = [
    "CD_CVM",
    "ORDEM_EXERC",
    "DT_REFER",
    "CD_CONTA",
    "VL_CONTA",
    "CNPJ_CIA",
    # "DENOM_CIA",
    # "DS_CONTA",
    # "DT_FIM_EXERC",
    # "DT_INI_EXERC",
    # "ESCALA_MOEDA",
    # "GRUPO_DFP",
    # "MOEDA",
    # "ST_CONTA_FIXA",
    # "VERSAO",
]

CODES = {
    "1": "totalAssets",
    "1.01": "currentAssets",
    "1.02": "nonCurrentAssets",
    "2": "totalLiabilities",
    "2.01": "curretLiabilities",
    "2.02": "nonCurrentLiabilities",
    "2.03": "equity",
    "3.01": "revenue",
    "3.02": "costRevenue",
    "3.03": "grossIncome",
    "3.04": "operatingExpenses",
    "3.05": "ebit",
    "3.06": "financialResult",
    "3.07": "ebt",
    "3.08": "taxes",
    "3.09": "netIncomeContinuingOperations",
    "3.10": "netIncomeDiscontinuedOperations",
    "3.11": "netIncome",
    "6.01": "cashFlowOperatingActivities",
    "6.02": "cashFlowInvestingActivities",
    "6.03": "cashFlowFinancingActivities"
}


def _quarter(date):
    """docstring for quarter"""
    segments = date.split('-')
    return str(int(segments[1]) // 3) + 'T' + segments[0][2:4]


def _filter(data, args={}):
    """docstring for filter"""
    company = False if "company" not in args else args["company"]
    quarter = False if "quarter" not in args else args["quarter"]
    filtered = []
    for entry in data:
        if company and entry['CD_CVM'] != company:
            continue
        if quarter and _quarter(entry['DT_REFER']) != quarter:
            continue
        if entry['ORDEM_EXERC'] == "ÚLTIMO":
            if entry['CD_CONTA'] in CODES.keys():
                filtered.append(entry)
    return filtered


def _format(data):
    """format the data"""
    g = {}
    for e in data:  # group data
        if e['CD_CVM'] not in g:
            g[e['CD_CVM']] = {}
        if e['DT_REFER'] not in g[e['CD_CVM']]:
            g[e['CD_CVM']][e['DT_REFER']] = {'cnpj': e['CNPJ_CIA']}
        g[e['CD_CVM']][e['DT_REFER']][CODES[e['CD_CONTA']]] = e['VL_CONTA']
        for key in CODES.values():
            if key not in g[e['CD_CVM']][e['DT_REFER']]:
                g[e['CD_CVM']][e['DT_REFER']][key] = "-"
    reports = []
    for cod_cvm in g:
        for date in g[cod_cvm]:
            report = g[cod_cvm][date]
            formatted_report = {
                "date": date,
                "quarter": _quarter(date),
                "registryNumber": report['cnpj'],
                "assets": {
                    "totalAssets": report["totalAssets"],
                    "currentAssets": report["currentAssets"],
                    "nonCurrentAssets": report["nonCurrentAssets"]
                },
                "liabilities": {
                    "totalLiabilities": report["totalLiabilities"],
                    "curretLiabilities": report["curretLiabilities"],
                    "nonCurrentLiabilities": report["nonCurrentLiabilities"],
                    "equity": report["equity"],
                },
                "income": {
                    "revenue":
                    report["revenue"],
                    "costRevenue":
                    report["costRevenue"],
                    "grossIncome":
                    report["grossIncome"],
                    "operatingExpenses":
                    report["operatingExpenses"],
                    "ebit":
                    report["ebit"],
                    "financialResult":
                    report["financialResult"],
                    "ebt":
                    report["ebt"],
                    "taxes":
                    report["taxes"],
                    "netIncomeContinuingOperations":
                    report["netIncomeContinuingOperations"],
                    "netIncomeDiscontinuedOperations":
                    report["netIncomeDiscontinuedOperations"],
                    "netIncome":
                    report["netIncome"]
                },
                "cashFlow": {
                    "cashFlowOperatingActivities":
                    report["cashFlowOperatingActivities"],
                    "cashFlowInvestingActivities":
                    report["cashFlowInvestingActivities"],
                    "cashFlowFinancingActivities":
                    report["cashFlowFinancingActivities"]
                }
            }
            reports.append(formatted_report)
    return reports


list = [
    "itr_cia_aberta_BPA_con_\d{4}.csv", "itr_cia_aberta_BPP_con_\d{4}.csv",
    "itr_cia_aberta_DFC_MI_con_\d{4}.csv", "itr_cia_aberta_DRE_con_\d{4}.csv"
]


def load(args={}):
    """loads report data from all companies"""
    urls = _get_urls()
    reports = []
    # for url in urls[8:9]:
    for url in urls:
        data = []
        zip = cache.load(url)
        files = cache.extract(zip, list)
        for file in files:
            raw_data = scanner.read(file, FIELDS)
            if raw_data:
                filtered_data = _filter(raw_data, args)
                for line in filtered_data:
                    data.append(line)
            file.close()
        zip.close()
        report = _format(data)
        for line in report:
            reports.append(line)
    return reports


if __name__ == "__main__":
    print(load({"company": "006173", "quarter": "3T19"}))
