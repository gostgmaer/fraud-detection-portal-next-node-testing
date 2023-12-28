import { baseurl } from "@/config/setting";
import axios from "axios";
import useSWR from "swr";
import Cookies from 'js-cookie';



export function leftFillNum(num, targetLength) {
    return num.toString().padStart(targetLength, "0");
  }
  
  export const initialValue = 0;
  // export const sumWithInitial = array1.reduce(
  //   (accumulator, currentValue) => accumulator + currentValue,
  //   initialValue
  // );
  
  export const sumWithInitial = (array1) => {
   return array1.reduce( ( sum, { subtotal } ) => sum + subtotal , 0)
  
  };
  
  export const cleanQueryparam = (query) => {
    return Object.keys(query).forEach(
      (key) =>
        (query[key] === "" || query[key] == null || query[key] === undefined) &&
        delete query[key]
    );
  };
  
  
  export function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }
  
  export function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }
  
  // Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
  // stableSort() brings sort stability to non-modern browsers (notably IE11). If you
  // only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
  // with exampleArray.slice().sort(exampleComparator)
  
  export function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }



const AUTH_TOKEN = "asdjkashdjkashdjashduiasgdhiuasdijahsdiuhasuidhauisdhiauhdiuhaid"
export const getToken = () => {
  window.localStorage.getItem(AUTH_TOKEN);
};

// export const setToken = (token) => {
//   if (token) {
//     window.localStorage.setItem(AUTH_TOKEN, token);
//   }
// };

export const removeToken = () => {
  window.localStorage.removeItem(AUTH_TOKEN);
};

// @ts-ignore
export const fetcher = (...args) => axios(...args).then((res) => res.data);

export function useFetcher(endpoint) {
  const { data, error, isLoading } = useSWR(
    `${baseurl}${endpoint}?populate=*`,
    fetcher
  );

  return {
    data: data,
    isLoading,
    isError: error,
  };
}

export function useGetFetcher(endpoint,fetcherData) {
  const { data, error, isLoading } = useSWR(
    `${baseurl}${endpoint}?populate=*`,
    fetcherData
  );

  return {
    data: data,
    isLoading,
    isError: error,
  };
}




export function storeCookiesOfObject(data) {
  if (data) {
    const userKeys = Object.keys(data);

    userKeys.forEach(key => {
      const value = data[key];
      Cookies.set(key, value);
    });
  }
}

export function convertToNestedObject(flatObject) {
  const result = {};

  // Object.keys(flatObject).forEach((key) => {
  //   const keys = key.split('.');
  //   let currentObj = result;

  //   keys.forEach((nestedKey, index) => {
  //     if (index === keys.length - 1) {
  //       currentObj[nestedKey] = flatObject[key];
  //     } else {
  //       currentObj[nestedKey] = currentObj[nestedKey] || {};
  //       currentObj = currentObj[nestedKey];
  //     }
  //   });
  // });
  Object.keys(flatObject).forEach((key) => {
    const keys = key.split('.');
    let currentObj = result;

    keys.forEach((nestedKey, index) => {
      // Check if the current nestedKey is numeric
      const isNumericKey = /^\d+$/.test(nestedKey);

      if (index === keys.length - 1) {
        if (isNumericKey) {
          currentObj = currentObj[nestedKey] || [];
          currentObj.push(flatObject[key]);
        } else {
          currentObj[nestedKey] = flatObject[key];
        }
      } else {
        currentObj[nestedKey] = currentObj[nestedKey] || {};
        currentObj = currentObj[nestedKey];
      }
    });
  });

  return result;
}

export function transformKeysToObject(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      // Check if the key starts with a numeric character or becomes numeric
      if (/^\d/.test(key) || !isNaN(key)) {
        // Convert the value to an array with particular values
        obj[key] = [Number(key)];
      }

      // If the value is an object, recursively call the function
      if (typeof obj[key] === 'object') {
        transformKeysToObject(obj[key]);
      }
    }
  }

  return obj;
}


// export function convertNumericKeysToObject(obj) {
//   for (const key in obj.filter) {
//     const value = obj.filter[key];

//     if (typeof value === 'object' && !Array.isArray(value) && /^\d/.test(Object.keys(value)[0])) {
//       // If the key's value is an object, not an array, and starts with a numeric value
//       const numericKey = Object.keys(value)[0];
//       const numericValue = value[numericKey];

//       // Convert the numeric key to an array with the original value
//       obj.filter[key] = { [numericKey.split(":")[0]]: [numericValue] };
//     }
//   }
//   return obj;
 
// }

export  function convertNumericKeysToObject(obj) {
  // function processObject(obj) {
  //   for (const key in obj) {
  //     const value = obj[key];

  //     if (typeof value === 'object' && !Array.isArray(value) && /^\d/.test(Object.keys(value)[0])) {
  //       // If the key's value is an object, not an array, and starts with a numeric value
  //       const numericKey = Object.keys(value)[0];
  //       const numericValue = value[numericKey];

  //       // Convert the numeric key to an array with the original value
  //       obj[key] = { [numericKey.split(":")[0]]: [numericValue] };
  //     } else if (typeof value === 'object') {
  //       // Recursively process nested objects
  //       processObject(value);
  //     }
  //   }
  // }

  // processObject(obj.filter);
  // return obj;
  function processObject(obj) {
    for (const key in obj) {
      if (/^\d/.test(key)) {
        // If the key starts with a numeric value
        const value = obj[key];

        // Convert the numeric key to an array with the original value
        obj[key.split(":")[0]] = [value];
        delete obj[key]; // Remove the original key-value pair
      } else if (typeof obj[key] === 'object') {
        // Recursively process nested objects
        processObject(obj[key]);
      }
    }
  }

  processObject(obj.filter);
  return obj; // Explicitly return the modified object
}


export function convertObject(inputObject) {
  const outputObject = {};

  for (const key in inputObject) {
    if (inputObject.hasOwnProperty(key)) {
      const value = inputObject[key];

      if (typeof value === 'object' && !Array.isArray(value)) {
        const subKey = Object.keys(value)[0];
        const subValue = value[subKey];

        const numericSubKey = Number(subKey);

        if (!isNaN(numericSubKey)) {
          outputObject[key] = [subValue];
        } else {
          outputObject[key] = { [subKey]: subValue };
        }
      } else {
        outputObject[key] = value;
      }
    }
  }

  return outputObject;

}

// Export the calculateTimeGap function with maxGap parameter
export function calculateTimeGap(date1, date2, maxGap) {
  const momentDate1 = moment(date1, "YYYY-MM-DD HH:mm:ss");
  const momentDate2 = date2 ? moment(date2, "YYYY-MM-DD HH:mm:ss") : moment();

  // Calculate the time gap duration
  const duration = moment.duration(momentDate2.diff(momentDate1));

  // Calculate the years and months in the duration
  const years = duration.years();
  const months = duration.months();

  // Check if the duration exceeds the maximum allowable time gap in months
  if (duration.asMonths() > maxGap) {
    return `Time Gap exceeds the maximum allowable (${maxGap} months)`;
  }

  // Format the duration based on the maxGap value
  let formattedDuration = "";
  if (years > 0) {
    formattedDuration += `${years} year${years > 1 ? "s" : ""}`;
  }
  if (months > 0) {
    if (formattedDuration) {
      formattedDuration += " ";
    }
    formattedDuration += `${months} month${months > 1 ? "s" : ""}`;
  }

  return `${formattedDuration}`;
}

export const formatFileSize = (bytes) => {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
};

export const findIndex = (array, index) => {
  const found = array.find(function (element, ind) {
    return index === ind;
  });
  return found;
};

// export const arrayGroupbykey = (array, key) => {
//   const uniqueCategories = [...new Set(array.map((item) => item[key]))];
//   function filterByCategory(array, key) {
//     return array.filter((item) => item.category === key);
//   }
//   const filteredArrays = [];
//   uniqueCategories.forEach((key) => {
//     const filteredArray = filterByCategory(array, key);
//     filteredArrays.push(filteredArray);
//   });

//   return filteredArrays;
// };

export const setToken = (name, value, days, type) => {
  if (type === "ACCESS_TOKEN") {
    const token = value.split(".");
    setClientCookie("headerPayload", `${token[0]}.${token[1]}`, days);
    setClientCookie("signature", `${token[2]}`, days);
  } else {
    setClientCookie(name, value, days);
  }
};


export const setClientCookie = (name, value, timestamp) => {
  const expirationDate = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
  Cookies.set(name, value, { expires: expirationDate });
};


 
export function objectToQueryString(obj, parentKey = '') {
  const params = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Recursively handle nested objects
        params.push(objectToQueryString(value, fullKey));
      } else if (value !== undefined && value !== null && value !== '') {
        params.push(`${encodeURIComponent(fullKey)}=${encodeURIComponent(value)}`);
      }
    }
  }

  return params.join('&');
}

export function generateUrlFromNestedObject(nestedObject) {
  const queryParams = [];

  const processNestedObject = (obj, prefix = '') => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        if (typeof value === 'object' && value !== null) {
          processNestedObject(value, prefix + key + '.');
        } else {
          queryParams.push(`${encodeURIComponent(prefix + key)}=${encodeURIComponent(value)}`);
        }
      }
    }
  };

  processNestedObject(nestedObject);

  if (queryParams.length > 0) {
    return '?' + queryParams.join('&');
  } else {
    return '';
  }
}

export function deleteEmptyKeys(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      if (typeof obj[prop] === 'object') {
        // Recursively call deleteEmptyKeys for nested objects
        deleteEmptyKeys(obj[prop]);

        // If the nested object has no keys left, delete it
        if (Object.keys(obj[prop]).length === 0) {
          delete obj[prop];
        }
      } else if (obj[prop] === null || obj[prop] === undefined || obj[prop] === '') {
        // Delete key if the value is null, undefined, or an empty string
        delete obj[prop];
      }
    }
  }
}

export function parseUrlWithQueryParams(url) {
  const queryString = url.split('?')[1];
  if (!queryString) {
    return {};
  }

  const params = new URLSearchParams(queryString);
  const nestedObject = {};

  params.forEach((value, key) => {
    const keys = key.split('.');
    let currentLevel = nestedObject;

    for (let i = 0; i < keys.length - 1; i++) {
      currentLevel[keys[i]] = currentLevel[keys[i]] || {};
      currentLevel = currentLevel[keys[i]];
    }

    // Check for empty or undefined values before decoding
    const decodedValue = value === 'undefined' ? undefined : decodeURIComponent(value);
    currentLevel[keys[keys.length - 1]] = decodedValue;
  });

  return nestedObject;
}
