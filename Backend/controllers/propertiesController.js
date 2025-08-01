import Property from '../models/propertiesModel.js'
import Location from '../models/locationModel.js' 


let PropertyController = {
    async getProperties(req, res) {
        let AllData = await Property.find().populate("totalLocation");
        res.json(AllData)
    },

    async getPropertiesById(req, res) {
        let Data = await Property.findById(req.params.id);
        res.json(Data);
    },

    async postProperties(req, res) {
        let { propertyPoster, propertyName, propertyType, propertyPrice, totalLocation } = req.body;
    
        try {
            let newproperty = new Property({
                propertyPoster,
                propertyName,
                propertyType,
                propertyPrice,
                totalLocation
            }); 
    
            let savedproperty = await newproperty.save();
            await Location.findByIdAndUpdate(
                totalLocation,
               { $push: {totalProperties: newproperty._id}}
            )

            res.status(201).json(savedproperty);

        } catch (err) {
            console.error("Error saving property:", err);
            res.status(500).json({ error: err.message });
        }
    },
    

    async putProperties(req, res) {
        let putProperties = await Property.findByIdAndUpdate(req.params.id, req.body);
        res.json(putProperties) 
    },

    async deleteproperties(req, res) {
        let deleteproperties = await Property.findByIdAndDelete(req.params.id);
        res.json(deleteproperties); 
    }

}

export default PropertyController;