import xlrd
from collections import OrderedDict
import simplejson as json
 
# Open the workbook and select the first worksheet
wb = xlrd.open_workbook('Base Data File.xlsx')
sh = wb.sheet_by_index(0)
 
# List to hold dictionaries
data_list = []
 
# Iterate through each row in worksheet and fetch values into dict
for rownum in range(1, sh.nrows):
    temp = OrderedDict()
    row_values = sh.row_values(rownum)
    temp['StudentID'] = row_values[0]
    temp['AssessmentItemId'] = row_values[1]
    temp['Correct'] = int(row_values[2])
    temp['Difficulty'] = int(row_values[3])
    temp['TimeStarted'] = int(row_values[4])
    temp['TimeTaken'] = int(row_values[5])
 
    data_list.append(temp)
 
# Serialize the list of dicts to JSON
j = json.dumps(data_list)
 
# Write to file
with open('data.json', 'w') as f:
    f.write(j)