## ResourcePart
The ResourcePart is a part provided by the portal framework for the purpose of pinning resources to dashboards.  Using the resource part to represent pinned resources improves the load times for customer dashboards as the extension which owns the resource is not loaded. Extensions can use this part for pinning their resource blades and parts with very little investment. 

![alt-text](../media/top-extensions-parts-resourcepart/resourcePart.png "Resource Part")

### Pinning resources from browse
The browse experience can use this part for pinning resources.   This simply requires that the PartName in PDL be "{ResourcePart}"
