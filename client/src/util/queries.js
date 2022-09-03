import { gql } from "@apollo/client";

export const ME = gql`
  query Me {
    me {
      _id
      username
      email
      lastLogin
      savedRestrooms {
        _id
        areaDescription
        location {
          type
          coordinates
        }
        changingStation
        keyRequired
        adaAccessible
        reviews {
          reviewText
          rating
          createdAt
          username
          userId
        }
      }
    }
  }
`;

export const ALL_RESTROOMS = gql`
query AllRestrooms {
  allRestrooms {
    _id
    areaDescription
    location {
      type
      coordinates
    }
    changingStation
    keyRequired
    adaAccessible
    reviews {
      reviewText
      rating
      createdAt
      username
      userId
    }
    avgRating
  }
}
`

export const NEARBY_RESTROOMS = gql`
query NearbyRestrooms($lat: Float, $lon: Float) {
  nearbyRestrooms(lat: $lat, lon: $lon) {
    areaDescription
    location {
      type
      coordinates
    }
    changingStation
    keyRequired
    adaAccessible
    _id
    reviews {
      reviewText
      rating
    }
  }
}
`

export const SINGLERESTROOM = gql`
  query SingleRestroom($restroomId: ID!) {
    singleRestroom(restroomId: $restroomId) {
      _id
      areaDescription
      location {
        type
        coordinates
      }
      changingStation
      keyRequired
      adaAccessible
      reviews {
        reviewText
        rating
        createdAt
        username
        userId
      }
    }
  }
`;
