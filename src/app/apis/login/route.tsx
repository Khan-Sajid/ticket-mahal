
import {type NextRequest} from "next/server";

export async function POST(request:Request) {
    //  await new Promise(resolve => setTimeout(resolve, 1000));
  const {email,password}=await request.json();
  console.log("email,password",email,password)
  return Response.json({
    token:"dfdsfds",
    user:{
      id:11,
      name:"bilal",
      email
    }
  },
      {
          headers:{
              "content-type":"application/json"
          },
          status:200
      }
  )
}