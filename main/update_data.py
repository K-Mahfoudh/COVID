import requests
from bs4 import BeautifulSoup as bs
from collections import OrderedDict
import json
import sys

url='https://www.worldometers.info/coronavirus/'

def request_treat_url(url):
    response = requests.get(url)
    data = response.text
    soup = bs(data, 'html.parser')
    return soup

def find_country_table_data(soup,country):
    elements = OrderedDict()
    td_tag = soup.find('a',text='Algeria').find_parent('tr').findChildren('td')
    return td_tag

def find_world_data(soup):
    elements = OrderedDict()
    content_tr_tag = soup.find_all('div',{'id':'maincounter-wrap'})
    for index in range(len(content_tr_tag)):
        elements[content_tr_tag[index].findChild('h1').text[:-1]] = content_tr_tag[index].findChild('div').findChild('span').text
    return elements

def main():
    dz_values = find_country_table_data(request_treat_url(url),'Algeria')
    world_values = find_world_data(soup=request_treat_url(url))
    for value_index in range(len(dz_values)):
        world_values['column_{}'.format(value_index)] = dz_values[value_index].text
    world_values['World Active'] = "{:,}".format(int(world_values['Coronavirus Cases'].replace(',','')) - (int((world_values['Recovered'].replace(',',''))) + int(world_values['Deaths'].replace(',',''))))
    
    return world_values

