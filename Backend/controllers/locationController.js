import Location from '../models/locationModel.js'

let locationController = {
    async getLocation(req, res) {
        let AllData = await Location.find().populate("totalProperties");
        res.json(AllData)
    },

    async getLocationById(req, res) {
        let Data = await Location.findById(req.params.id).populate("totalProperties");
        res.json(Data);
    },

    async postLocation(req, res) {
        let { cityPoster, cityName, streetName, totalProperties } = req.body;
        // console.log("Request body:", req.body);

        try {
            let newLocation = new Location({
                cityPoster,
                cityName,
                streetName,
                totalProperties
            });

            let savedLocation = await newLocation.save();
            res.status(201).json(savedLocation);
        } catch (err) {
            if (err.code === 11000) {
                res.status(409).json({ error: "City with this name already exists." });
            } else {
                res.status(500).json({ error: "Failed to create location." });
            }
        }
    },

    async updateLocation(req, res) {
        try {
            const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
                new: true
            });
            if (!updatedItem) return res.status(404).json({ message: 'Item not found' });
            res.json(updatedItem);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }

    },


    async deleteLocation(req, res) {
        try {
            const deletedItem = await Item.findByIdAndDelete(req.params.id);
            if (!deletedItem) return res.status(404).json({ message: 'Item not found' });
            res.json({ message: 'Item deleted', id: deletedItem._id });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
}

export default locationController;