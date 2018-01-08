#!/bin/sh

# set vars
jarFile=selenium-server-standalone-2.53.1.jar
#jarFile=selenium-server-standalone-3.0.0-beta3.jar
jarDir=$PWD/node_modules/.bin/

# get selenium-server-standalone
wget -O $jarDir$jarFile http://selenium-release.storage.googleapis.com/2.53/$jarFile
#wget -O $jarDir$jarFile http://selenium-release.storage.googleapis.com/3.0-beta3/$jarFile
