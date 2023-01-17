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


||count|mean|std|min|25%|50%|75%|max|
|---|---|---|---|---|---|---|---|---|
|car_ID|205.0|103.0|59.3|1.0|52.0|103.0|154.0|205.0|
|symboling|205.0|0.83|1.3|-2.0|0.0|1.0|2.0|3.0|
|wheelbase|205.0|98.8|6.0|86.6|94.5|97.0|102.4|120.9|
|carlength|205.0|174.1|12.3|141.1|166.3|173.2|183.1|208.1|
|carwidth|205.0|65.9|2.2|60.3|64.1|65.5|66.9|72.3|
|carheight|205.0|53.7|2.4|47.8|52.0|54.1|55.5|59.8|
|curbweight|205.0|2555.6|520.7|1488.0|2145.0|2414.0|2935.0|4066.0|
|enginesize|205.0|126.9|41.6|61.0|97.0|120.0|141.0|326.0|
|boreratio|205.0|3.3|0.3|2.54|3.15|3.31|3.58|3.94|
|stroke|205.0|3.3|0.3|2.07|3.11|3.29|3.41|4.17|
|compressionratio|205.0|10.1|4.0|7.0|8.6|9.0|9.4|23.0|
|horsepower|205.0|104.1|39.6|48.0|70.0|95.0|116.0|288.0|
|peakrpm|205.0|5125.1|477.0|4150.0|4800.0|5200.0|5500.0|6600.0|
|citympg|205.0|25.2|6.5|13.0|19.0|24.0|30.0|49.0|
|highwaympg|205.0|30.8|6.9|16.0|25.0|30.0|34.0|54.0|
|price|205.0|13276.7|7988.9|5118.0|7788.0|10295.0|16503.0|45400.0|


En observant de plus près la première description des données (en termes de répartition), on remarque que la plages features sont très variable. Le **boreratio** varie en 2.54 et 3.94, alors que le **peakrpm** varie entre 477.0 et 6600.0.

regardons de plus près l'histogramme des ces deux features

```python
f, ax = plt.subplots(6,5,figsize=(25, 20))
# ax.set_xscale("log")

col_nmbrs = len(df.columns)
for i in np.arange(0, col_nmbrs):
    n = int(i/5)
    m = i%5
    # print(n, m)

    sns.histplot(data=df, y=df.columns[i], ax=ax[n,m])
```

Dans le cas d'une proglématique de régression, il est nécessaire et crucial de prendre en compte le les poids relatifs de chaques features. sans travail préalable de pré-traitement des ces données, les algorithms de régression finiront par donner plus de poids au plus gros chiffre. Dans notre example, l'algorithme considéreras que le **peakrpm** est plus inflant que le **boreratio**. c'est injuste !

Première étape de notre chemin est donc de mettre tout les faetures sur le même pied d'égalité et ramener toutes les valeurs à une seule plage. Dans notre cas et dans la pluspart des cas, ça sera entre 0 et 1.

## Mise à l'échelle des données - Scaling
Le scaling est une opération mathématique qui consiste à créer 