Introduction
====================

the OpenAI Avant d'approcher la Régression Linéaire, Commençant d'abord par ce que signifie une régression. La régression est méthode qui permet
d'approcher une variable inconnue à partir d'un ensemble de variables connues et qui lui sont corrélées.

Example :
* Peut on predire le nombre de glaces vendues, si on connaissait la température extereure
* Le prix de l'immobilier en fonction, du revenu moyen des habitant, de la densité des habitant, nombre d'écoles, nombre de théatre

Imaginon la situation suivante : Un fabricant automobile décide d'investir un nouveau marché. ML Auto, un fabricant français décide de lancer sa première ligne de production au US. Il est confronté à la problématique suivante **Comment définir son offre de prix ?**

Les prix des voitures sur ce nouveaux marché ne dépendent pas des mêmes paramètres que les prix en France par example. On peut imaginer que du fait des des differences culturelles, les acheteurs n'accorderaient pas de le même interet aux même choses
Ils décident alors d'engager des experts en ML afin de déterminer les facteurs influant le prix, comment utiliser ces facteur de déterminer le prix d'un modèle.

**Les données de départ**

Pour commencer nous allons partir de la base de données suivante. Elle concerne 203 voitures vendues au US dans les 6 derniers mois.
Pour chaque vente, nous avons réportorier les information suivante.

| Syntax      | Description |
| ----------- | ----------- |
|Car_ID         | Unique id of each observation (Interger)| 
|Symboling      | Its assigned insurance risk rating, A value of +3 indicates that the auto is risky, -3 that it is probably pretty safe.(Categorical)| 
|carCompany     | Name of car company (Categorical)| 
|fueltype       | Car fuel type i.e gas or diesel (Categorical)| 
|aspiration	    | Aspiration used in a car (Categorical)| 
|doornumber	    | Number of doors in a car (Categorical)| 
|carbody	    | body of car (Categorical)| 
|drivewheel	    | type of drive wheel (Categorical)| 
|enginelocation	| Location of car engine (Categorical)| 
|wheelbase	    | Weelbase of car (Numeric)| 
|carlength	    | Length of car (Numeric)| 
|carwidth	    | Width of car (Numeric)| 
|carheight	    | height of car (Numeric)| 
|curbweight	    | The weight of a car without occupants or baggage. (Numeric)| 
|enginetype	    | Type of engine. (Categorical)| 
|cylindernumber	| cylinder placed in the car (Categorical)| 
|enginesize	    | Size of car (Numeric)|

[source] : https://archive.ics.uci.edu/ml/datasets/Automobile

La première étape et qui est une étape primordiale est d'explorer la base de données pour se familiariser avec les données que l'on a à traiter.

Commençant par regarder les premières lignes des données

```python
-
import numpy as np
import pandas as pd

# read data using pandas 
df = pd.read_csv('./inputs/CarPrice_Assignment.csv')

# Discover the firls lines of the DataFrame
df.head()

# General information and Statistics on the DataFrame
df.info()
df.describe()
```


```python
titanic.info()
OUT:
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 205 entries, 0 to 204
Data columns (total 26 columns):
 #   Column            Non-Null Count  Dtype  
---  ------            --------------  -----  
 0   car_ID            205 non-null    int64  
 1   symboling         205 non-null    int64  
 2   CarName           205 non-null    object 
 3   fueltype          205 non-null    object 
 4   aspiration        205 non-null    object 
 5   doornumber        205 non-null    object 
 6   carbody           205 non-null    object 
 7   drivewheel        205 non-null    object 
 8   enginelocation    205 non-null    object 
 9   wheelbase         205 non-null    float64
 10  carlength         205 non-null    float64
 11  carwidth          205 non-null    float64
 12  carheight         205 non-null    float64
 13  curbweight        205 non-null    int64  
 14  enginetype        205 non-null    object 
 15  cylindernumber    205 non-null    object 
 16  enginesize        205 non-null    int64  
 17  fuelsystem        205 non-null    object 
 18  boreratio         205 non-null    float64
 19  stroke            205 non-null    float64
 20  compressionratio  205 non-null    float64
 21  horsepower        205 non-null    int64  
 22  peakrpm           205 non-null    int64  
 23  citympg           205 non-null    int64  
 24  highwaympg        205 non-null    int64  
 25  price             205 non-null    float64
dtypes: float64(8), int64(8), object(10)
memory usage: 41.8+ KB
```

Dans notre cas, nous comptons 205 observation pour chaque *features*. Toutes les observations non -non-Null-.
Ceci signifie que, à priori, nous n'avons pas de perte de données ou des données qui manquent. 

