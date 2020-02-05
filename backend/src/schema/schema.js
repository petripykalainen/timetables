const graphql = require('graphql');
const axios = require('axios');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLFloat,
  GraphQLSchema
} = graphql;

const locations = [
  {name: 'Mankkaantie 17', lon: 3.3, lat: 4.4},
  {name: 'Pohjoinen Rautatienkatu 25', lon: 60.3, lat: 24.4}  
]

const LocationType = new GraphQLObjectType({
  name: 'Location',
  fields: {
    name: {type: GraphQLString},
    lon: {type: GraphQLFloat},
    lat: {type: GraphQLFloat}
  }
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    location: {
      type: LocationType,
      args: {name: {type: GraphQLString}},
      resolve(parentValue, args) {
        // Pls remember to return to not have null values...
        return axios.get
        (`https://api.digitransit.fi/geocoding/v1/search?text=${args.name}&size=1`)
          .then((res) => {
            return {
            name: res.data.features[0].properties.name,
            lon: res.data.features[0].geometry.coordinates[0],
            lat: res.data.features[0].geometry.coordinates[1]  
            }
          })
        
        // let result =  await axios.get
        // (`https://api.digitransit.fi/geocoding/v1/search?text=${args.name}&size=1`)
        // return {
        // name: result.data.features[0].properties.name,
        // lon: result.data.features[0].geometry.coordinates[0],
        // lat: result.data.features[0].geometry.coordinates[1]  
        // }
        
        
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
})
