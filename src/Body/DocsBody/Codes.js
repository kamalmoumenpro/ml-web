const code_1 = `import numpy as np
import pandas as pd

// read the csv file using pandas
df = pd.read_csv('./inputs/CarPrice_Assignment.csv')

//Let have a look to first lines of the data
df.head()

//General and Statistics for data
df.info()
df.describe()`


export {code_1}