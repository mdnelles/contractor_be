interface NestedObject {
   [key: string]: any | NestedObject | NestedObject[];
}

export function findDataArray(obj: NestedObject): any[] | null {
   // check to see if obj is am array and if it is return it
   try {
      if (Array.isArray(obj) && obj.hasOwnProperty("data")) {
         return (obj as unknown as { data: any[] }).data; // type assertion
      }

      // Check if obj is an object with a "data" property
      if (
         typeof obj === "object" &&
         obj !== null &&
         obj.hasOwnProperty("data")
      ) {
         return obj.data;
      }
      for (let prop in obj) {
         if (obj.hasOwnProperty(prop)) {
            const nestedObj = obj[prop];
            const dataArr = findDataArray(nestedObj); // recursively search nested objects and arrays
            if (dataArr) {
               return dataArr;
            }
         }
      }

      // If "data" array was not found, return null
      return null;
   } catch (error) {
      console.log(error);
      return null;
   }
}
