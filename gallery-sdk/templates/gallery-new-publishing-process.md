<properties title="" pageTitle="Updated Azure Package Publishing Process (May 2019 Onwards)" description="" authors="ansud" />

{"gitdown": "include-file", "file": "./includes/gallery-header.md"}

## New Process 

Starting <b>1st May 2019</b>, Gallery is switching the process of publishing to Azure Production. Packages would only be received via ICM for making updates to Azure Production Clouds. If you publish a product to Microsoft Azure directly without going through Cloud Partner Portal, these changes impact you.

### Package Update SLAs
The following SLAs would be provided for these incidents:

* Regular Package Update	- 48 business hours
* Urgent Package Updates	- 24 business hours
* Live Site - Case by Case basis, please email 1storehot after opening ICM.

### Steps to Update
-  Go through the gallery documentation here to create your package: https://aka.ms/GalleryDocs 
-  Log onto ICM and use the template here to create an incident: https://aka.ms/UpdateGalleryPackage 
-  Create an incident for each cloud and ensure the correct package is attached to each incident.
-  You may attach multiple packages to 1 incident as long as you are updating the same cloud (Public/Fairfax/Blackforest/Mooncake)
-  Ensure the right cloud instance is selected and environment is PROD.
-  Select deployment priority and submit the incident. No need to fill the fields for ‘service category azure’
-  Once your update is processed, the incident will be updated with confirmation of the changes and closed. You may reactivate the incident with information if you see any issues.

### Other Important Points

-	Business justifications must be provided for expedited requests and will be tracked at SHR level. Enter N/A for normal priority. 
-	For events such as Build, Inspire etc. , the SLAs may be suspended due to package volume. Hence we recommend pushing your packages much in advance.
-	The process to update packages in dogfood is fully self service and remains the same.
