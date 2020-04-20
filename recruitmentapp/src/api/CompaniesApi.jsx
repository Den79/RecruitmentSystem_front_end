import { config } from "./config.json";
import axios from "axios";

export const getCompanyInfo = ({ TOKEN , PROF_ID}) => {
  const options = {
    url: config.BASE_API_URL + "companies/" + PROF_ID,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`
    }
  };

  console.log("TOKEN " + TOKEN)
  console.log(PROF_ID)
  return axios(options);
};

export const postCompanyProfile = ({  
  TOKEN,
  NAME,
  CITY,
  PROVINCE,
  COUNTRY,
  ADDRESS, 
  PHONE,
  EMAIL,
  IS_ACTIVE
 }) => {
  const options = {
    url: config.BASE_API_URL + "companies",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`
    },
    data: {
      name: NAME,
      city: CITY,
      PROVINCE: PROVINCE,
      country : COUNTRY,
      address : ADDRESS,
      phone : PHONE,
      email : EMAIL,
      isActive: IS_ACTIVE
    }
  };
  console.log(NAME + " " + EMAIL + " " + CITY + " " + PROVINCE + " " + COUNTRY +
  " "+ ADDRESS + PHONE + IS_ACTIVE )
  return axios(options);
};

export const putCompanies = ({
    TOKEN,
    PROF_ID,
    NAME,
    CITY,
    PROVINCE,
    COUNTRY,
    ADDRESS, 
    PHONE,
    EMAIL,
    IS_ACTIVE
  }) => {
    const options = {
      url: config.BASE_API_URL + "companies/" + PROF_ID,
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`
     },
      data: {
        id: PROF_ID,
        name: NAME,
        city: CITY,
        PROVINCE: PROVINCE,
        country : COUNTRY,
        address : ADDRESS,
        phone : PHONE,
        email : EMAIL,
        isActive: IS_ACTIVE
      }
    };
    console.log(NAME + " " + EMAIL + " " + CITY + " " + PROVINCE + " " + COUNTRY +
    " "+ ADDRESS + PHONE + IS_ACTIVE )
    return axios(options);
  };
  