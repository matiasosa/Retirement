from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options as ChromeOptions
import time

#AUX
def inputWrite(x, content):
    x.clear
    x.send_keys(content)
    x.send_keys(Keys.RETURN)

def endDate():
    button = driver.find_element('xpath', '//button[@id="companytButton"]')
    button.click()

def endClient():
    button = driver.find_element('xpath','//button[normalize-space()="Finalizar"]')
    button.click()

#PROGRAM
def inputName(clientName):
    client = driver.find_element("xpath", '//input[@id="clientName"]')
    inputWrite(client, clientName)
    driver.maximize_window() # For maximizing window
    driver.implicitly_wait(20)

    button = driver.find_element('xpath', '//button[@id="clientButton"]')
    button.click()

def inputCompany(companyName):
    company = driver.find_element('xpath', '//input[@id="companyName"]')
    inputWrite(company, companyName)

def inputDates(start, end, done):
    dateStart = driver.find_element('xpath', '//input[@id="dateStart"]')
    dateEnd = driver.find_element('xpath', '//input[@id="dateEnd"]')

    inputWrite(dateStart, start)
    inputWrite(dateEnd, end)

    endDate()

    if done:
        endClient()


chrome_options = ChromeOptions()
chrome_options.add_experimental_option("detach", True)

driver = webdriver.Chrome(executable_path="chromedriver", options=chrome_options)
driver.get("file:///Users/matiassosa/Desktop/macbookPro/Programacion/retirement/index.html")
#https://matiasosa.github.io/Retirement/

#nombre | char de la empresa | arr de fechas
def execute(clientName, compName, dates):
    inputName(clientName)
    cant = int(len(dates)/2)
    end = False

    for i in range(cant):    
        inputCompany(compName + str(i))
        if i == cant-1:
            end = True
        inputDates(dates[i+i], dates[i+i+1], end)

dates1 = ["08/04/1990", "21/11/1995", "19/11/1997", "04/08/2000", "12/02/2001", "17/01/2006"]
execute("Client A", "A", dates1)

dates2 = ["23/10/1996", "14/05/1998", "19/06/1998", "30/03/2000"]
execute("Client B", "B", dates2)

dates3 = ["25/03/1996", "05/11/2000", "08/2001", "01/2004", "30/06/2004", "01/12/2008"]
execute("Client C", "C", dates3)

dates4 = ["23/10/2000", "12/06/2002", "29/02/2020", "10/06/2022"]
execute("Client D", "D", dates4)
