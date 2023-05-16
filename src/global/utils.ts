interface NestedObject {
   [key: string]: any | NestedObject | NestedObject[];
}

export function findDataArray(obj: NestedObject): any[] | null {
   try {
      if (
         Array.isArray(obj) &&
         Object.prototype.hasOwnProperty.call(obj, "data")
      ) {
         return (obj as unknown as { data: any[] }).data;
      }

      if (
         typeof obj === "object" &&
         obj !== null &&
         Object.prototype.hasOwnProperty.call(obj, "data")
      ) {
         return obj.data;
      }

      for (const prop in obj) {
         if (Object.prototype.hasOwnProperty.call(obj, prop)) {
            const nestedObj = obj[prop];
            const dataArr = findDataArray(nestedObj);
            if (dataArr) {
               return dataArr;
            }
         }
      }

      return null;
   } catch (error) {
      console.log(error);
      return null;
   }
}
