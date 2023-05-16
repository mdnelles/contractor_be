export const sum = async (req: any, res: any): Promise<any> => {
   let { num1, num2 } = req.body;
   //    num1 = parseInt(num1);
   //    num2 = parseInt(num2);

   try {
      !isNaN(num1) && !isNaN(num2)
         ? res.json({
              status: 200,
              err: false,
              msg: "added",
              result: num1 + num2,
           })
         : res.json({
              status: 200,
              err: true,
              msg: "you must supply two numbers",
           });
   } catch (error) {
      console.log(error);
      res.json({
         status: 200,
         err: true,
         msg: "you must supply two numbers",
      });
   }
};

export const countStringOccurrances = async (
   req: any,
   res: any
): Promise<any> => {
   const { str, strArr } = req.body;

   try {
      const count = strArr.filter((s: string) => s === str).length;
      res.json({
         status: 200,
         err: false,
         msg: "counted",
         result: count,
      });
   } catch (error) {
      console.log(error);
      res.json({ status: 200, err: true, error });
   }
};
