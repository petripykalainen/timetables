import gql from 'graphql-tag';

let ROUTE_QUERY = gql`
query GET_ROUTE($from: String, $to: String){
  plan(
    fromPlace: $from,
    toPlace: $to
  ) {
    itineraries{
      startTime
      legs {
        mode
        route{
          longName
          shortName
        }
        startTime
        endTime
        from {
          name
          stop {
            code
            name
            vehicleMode
          }
        }
        to {
          name
          stop{
            name
            code
          }
        }
      }
    }
  }
}
`;

export default ROUTE_QUERY;
