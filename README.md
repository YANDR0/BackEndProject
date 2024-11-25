# Proyecto Tecnologías de Desarrollo en el Servidor

Para poder ejecutar el proyecto se debe realizar lo siguiente:
- Clonar el repositorio: https://github.com/YANDR0/BackEndProject.git 
- Dirigirse a cd BackEndProject
- Abrir la consola y ejecutar lo siguiente:
    - Ejecute el comando npm i
    - Ejecutar el comando npm run dev
- Entrar en el navegador a la ruta http://localhost:3000/

Además, agregue un arhcivo .env con lo siguiente:

DB_URL = mongodb+srv://tareas_user:Tareas123@myproject.pm7bdcc.mongodb.net/MyApp?retryWrites=true&w=majority&appName=MyProject
JWT_SECRET = s3cureP@ssw0rd!12345LongerKey
S3_SECRET_KEY=T6bDIzg9FKBUlwh0+OeOHoW4gDIuqPbZbf+xAD8z
S3_REGION=us-east-1
S3_BUCKET_NAME=backend-class-s3-bucket
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=migueltorrespvr2@gmail.com
EMAIL_PASSWORD=nchxjkgatyfcsaxj
GOOGLE_CALLBACK_URL = https://backendproject-43du.onrender.com/session/verify
GOOGLE_ID = 1067117755589-8sqrfmpllqli2limck08hhsu60960jit.apps.googleusercontent.com
GOOGLE_SECRET = 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
SECRET_KEY = secretPassword
Y una S3_ACCESS_KEY que no podemos poner aquí

Para realizar las pruebas basta con, además de ejecutar lo ya mencionado, ejecutar el comando npm run test-api, además de que funcionan de manera local

Una vez hecho esto puede proceder a hacer las cosas comentadas en el documento de entrega
