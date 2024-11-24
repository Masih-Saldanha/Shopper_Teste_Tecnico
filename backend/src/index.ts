import app from "./config/app.js";
import "./config/dotenvConfig.js";

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`${process.env.POSTGRES_USER}`);
    console.log(`${process.env.POSTGRES_PASSWORD}`);
    console.log(`${process.env.POSTGRES_HOST}`);
    console.log(`${process.env.POSTGRES_PORT}`);
    console.log(`${process.env.POSTGRES_DB}`);
    console.log(`${process.env.DATABASE_URL}`);
    console.log(`${process.env.GOOGLE_API_KEY}`);
    console.log(`Servidor funcionando na porta ${port}`);
});
