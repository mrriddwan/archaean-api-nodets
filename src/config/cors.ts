import cors from "cors";

export const corsOptions: cors.CorsOptions = {
 origin: (origin, callback) => {
   const allowedOrigins = [
     "http://localhost:5173",
     "http://localhost:3000",
   ];
   if (!origin || allowedOrigins.includes(origin)) {
     callback(null, origin);
   } else {
     callback(new Error(`CORS blocked for origin: ${origin}`));
   }
 },
 credentials: true,
 methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
 allowedHeaders: [
   "Content-Type",
   "Authorization",
   "X-Request-ID",
   "X-Client",
   "X-Client-Version",
   "X-Shop-ID",
 ],
};