import app from "./config/app.js";
import "./config/dotenvConfig.js";

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Servidor funcionando na porta ${port}`);
});
