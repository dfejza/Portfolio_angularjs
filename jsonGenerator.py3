import os   # parse through directories
import json # read json
import requests # RESTful

## Generate the information required for the manga reader
baseDir = './public/assets/manga'
jsonDir = './public/assets/data/data.json'
gitUserInfo = 'https://api.github.com/users/dfejza'
gitUserRepos = 'https://api.github.com/users/dfejza/repos'

mangaList = [];

##########################################################
## STEP 1
## MANGA RELATED STUFF
#lets read the directory, for manga information generatio
mangaListRaw = os.listdir(baseDir)
for manga in mangaListRaw:
	mangaData = {}
	mangaData["name"] = manga
	mangaData["coverPage"] = baseDir + "/" + manga + "/" + manga + ".jpg"
	mangaData["volumeCount"] =  len(os.listdir(baseDir + "/" +manga))-1 
	mangaData["volumePageCountList"] = []
	#crawl each volume folder for the page count
	for x in range(0, mangaData["volumeCount"]):
		mangaData["volumePageCountList"].append(len(os.listdir(baseDir + "/" + manga + "/" + "volume" + str(x+1))))

	mangaList.append(mangaData)

##########################################################
## STEP 2
## PORTFOLIO (GITHUB) RELATED
# Get the GitUser
resp = requests.get(gitUserInfo)
if resp.status_code != 200:
    # This means something went wrong.
    raise ApiError('GET /tasks/ {}'.format(resp.status_code))

git = {}
git["icon"] = resp.json()["avatar_url"]
git["followers"] = resp.json()["followers"]
git["following"] = resp.json()["following"]
git["username"] = resp.json()["login"]
git["usernameLink"] = resp.json()["html_url"]
git["repoCount"] = resp.json()["public_repos"]
git["repos"] = []

# Get the Git repos
resp = requests.get(gitUserRepos)
if resp.status_code != 200:
    # This means something went wrong.
    raise ApiError('GET /tasks/ {}'.format(resp.status_code))
for x in resp.json():
	repodata = {}
	repodata["name"] = x["name"]
	repodata["link"] = x["html_url"]
	repodata["image"] = "https://raw.githubusercontent.com/dfejza/" + x["name"] + "/master/demo.gif"
	repodata["fullname"] = x["full_name"]
	repodata["description"] = x["description"]
	git["repos"].append(repodata)

##########################################################
## STEP 3
## INDEX MARKDOWN TO HTML STUFF


##########################################################
## STEP 4
## Write to the json file used by the website
## Database modify
d = []
# Read the db
with open(jsonDir, 'r',encoding='utf8') as json_data:
    d = json.load(json_data)
# Append the Manga info to the db
d["mangaDb"] = mangaList;
d["page1"]["git"] = git    
# Write to the db
os.remove(jsonDir)
with open(jsonDir, 'w') as json_data:
    json.dump(d, json_data, indent=4)
